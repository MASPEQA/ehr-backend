const firebaseAdmin = require("../../firebase.js");
const { mongoose } = require("mongoose")


const addPatient = async (req, res) => {
    try {
        let formData = req.body.formData
        if(!formData.email || !formData.password){
            return res.status(400).json({"message":"Email or password missing"})
        }
        let mongoDbFormData = { ...formData }
        delete mongoDbFormData.password
        
        
        // FIREBASE
        try {
            await firebaseAdmin.auth().getUserByEmail(formData.email);
        } catch (error) {
            // Create the user if they don't already exist, and move on to MongoDB if they exist in Firebase
            if (error.code === 'auth/user-not-found') {
                let userRecord = await firebaseAdmin.auth().createUser({
                    email: formData.email,
                    password: formData.password,
                    displayName: formData.name,
                });
            }
        }

        // MongoDB
        let userExists = await Patient.exists({"email": formData.email})
        if(!userExists){
            // Create the user with their details in MongoDB -- it automatically sends an error if some required information are missing
            await Patient.create(formData)

            // Authenticate the user if successfully created
            // let authData = await authenticateNewUser(formData.email, formData.password)

            return res.status(201).json({
                message: "User created successfully",
                email: formData.email
            })
        } else {
            // If user either exists or got created in Firebase, and is already in MongoDB, return that it's not already registered
            return res.status(400).json({ message: `User ${formData.email} already exists`})
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({"message": err.message })
    }
}

const patientStreams = {}

const getPatientStream = (userId) => {
    console.log("GETTING STAFF MEMBER STREAM")
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return;
    }

    // Ensure no double subscriptions
    if (patientStreams[userId]) {
        return;
    }

    try {
        const changeStream = Patient.watch([
            { $match: { "documentKey._id": new mongoose.Types.ObjectId(userId) } }
        ]);
        patientStreams[userId] = changeStream;

        changeStream.on("change", (change) => {
            console.log("change", change);
            // Use socketUtils to trigger socket if needed
            triggerSocket(`patientChanged${userId}`, change);
        });
        return `patientChanged${userId}`

    } catch (err) {
        console.error("Error setting up change stream:", err);
    }
};

const subscribeToPatient =  (req, res) => {
    const userId = req.params.id;
    let socketIdentifier = getPatientStream(userId);
    res.status(200).send({ message: `Subscribed to changes for userId: ${userId} on ${socketIdentifier}` });
}

module.exports = {
    addPatient,
    getPatientStream,
    subscribeToPatient
}