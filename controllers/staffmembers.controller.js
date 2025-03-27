const StaffMember = require("../models/StaffMember");
const { triggerSocket } = require("../utils/socket");
const { mongoose } = require("mongoose")


const getStaffMember = async (req, res) => {
    try {
        const user = await StaffMember.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}



// Creating the staff member
const addStaffMember = async (req, res) => {
    try{
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
        let userExists = await StaffMember.exists({"email": formData.email})
        if(!userExists){
            // Create the user with their details in MongoDB -- it automatically sends an error if some required information are missing
            await StaffMember.create(formData)

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

        
    }
    catch (err) {
        console.error(err)
        res.status(500).json({"message": err.message})
    }
}




// SUBSCRIBING TO THE LIVE STAFF MEMBER DATA
const staffMemberStreams = {}

const subscribeToStaffMember =  async (req, res) => {
    const userId = req.params.id;

    const getStaffMemberStream = async (userId) => {
        console.log("GETTING STAFF MEMBER STREAM")
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return;
        }
        
        // Ensure no double subscriptions
        if (staffMemberStreams[userId]) {
            console.log("USER STREAM ALREADY EXISTS")
            return res.status(200).json({message: "Subscribed to user", socket: `${socketIdentifier}`})
        }
        
        try {
            const staffMember = await StaffMember.findById(userId);
            
            if (!staffMember) {
                // If staff member is not found, return an error or throw an error
                console.log("FAILED TO GET USER STREAM: USER DOES NOT EXIST")
                return 404
            }
            const changeStream = StaffMember.watch([
                { $match: { "documentKey._id": new mongoose.Types.ObjectId(userId) } }
            ]);
            staffMemberStreams[userId] = changeStream;
            
            changeStream.on("change", (change) => {
                console.log("change", change);
                // Use socketUtils to trigger socket if needed
                triggerSocket(`staffMemberChanged${userId}`, change);
            });
            console.log("USER STREAM STARTED")
            return `staffMemberChanged${userId}`
    
        } catch (err) {
            console.error("Error setting up change stream:", err);
        }
    };

    let socketIdentifier = await getStaffMemberStream(userId);
    if(socketIdentifier === 404){
        return res.status(404).send({ message: `User ${userId} not found` });
    }
    res.status(200).json({message: "Subscribed to user", socket: `${socketIdentifier}`})
}

const getAllStaffMembersStream = async () => {
    console.log("GETTING ALL STAFF MEMBERS STREAM");

    try {
        // Ensure no double subscriptions
        if (allStaffStream) {
            console.log("ALL STAFF STREAM ALREADY EXISTS");
            return;
        }

        // Create a change stream for all staff members
        const changeStream = StaffMember.watch();

        // Store the change stream to avoid recreating it
        allStaffStream = changeStream;

        changeStream.on("change", (change) => {
            console.log("change", change);
            // Use socketUtils to trigger socket if needed
            triggerSocket("staffMemberChanged", change);
        });

        console.log("ALL STAFF STREAM STARTED");
        return "staffMemberChanged"; // A single identifier for all changes

    } catch (err) {
        console.error("Error setting up change stream:", err);
        return { status: 400, message: `Error setting up change stream: ${err.message}` };
    }
};

const subscribeToAllStaffMembers = (req, res) => {
    getAllStaffMembersStream();
    let socketIdentifier = getAllStaffMembersStream();
    if(socketIdentifier?.status === 400){
        return res.status(400).send({ message: socketIdentifier.message });
    }
    res.status(200).json({ message: `Subscribed to all staff members`, socket: `${socketIdentifier}` });
};

module.exports = {
    getStaffMember,
    addStaffMember,
    subscribeToStaffMember,
    subscribeToAllStaffMembers
}