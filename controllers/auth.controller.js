const mongoose = require("mongoose");
const StaffMember = require("../models/StaffMember");
const firebaseAdmin = require("../firebase.js");
const Patient = require("../models/Patient.js");


const signIn = async (req, res) => {
    try{

        console.log(req.body)
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
            method: "POST",
            body: JSON.stringify({
                email: req.body.email,
                password: req.body.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.error.message;
            return res.status(403).json({ message: errorMessage });
        }
        const data = await response.json();
        res.status(200).json(data);
        res.send("Got it")
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ "message": err.message });
    }
}

const refreshToken = async (req, res) => {
    try {
        const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
            method: "POST",
            body: JSON.stringify({
                grant_type: "refresh_token",
                refresh_token: req.body.refreshToken
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.error.message;
            return res.status(403).json({ message: errorMessage });
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

// Authenticate user after signing up -- Not an API endpoint function. Used by the below function for creating a staff member
// NOT IN USE
const authenticateNewUser = async (email, password) => {
    try {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.error.message;
            throw new Error(errorMessage); // Throw error to be caught by the caller
        }
    
        const data = await response.json();
        return data; // Return the authentication data
    } catch (err) {
        console.error('Authentication error:', err);
        throw err; // Re-throw the error for the caller to handle
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

module.exports = {
    signIn,
    refreshToken,
    addStaffMember
}