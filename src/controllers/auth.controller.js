require("dotenv").config();


const signIn = async (req, res) => {
    try{

        console.log(req.body)
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY_FIREBASE}`, {
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



module.exports = {
    signIn,
    refreshToken,
}