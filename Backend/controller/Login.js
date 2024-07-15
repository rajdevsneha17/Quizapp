const Login = require("../model/Login");
const signupSchema = require("../model/Signup");

exports.login = async (req, res) => {
    try {
        const { password, email } = req.body;

        // Check if user exists in Signup collection
        const user = await signupSchema.findOne({ email: email });
        if (user) {
            // User exists, now check password
            if (user.password === password) {
                // Password matches, create Login entry
                const respo = await Login.create({
                    email,
                    password
                });
                return res.status(200).json({
                    success: true,
                    data: respo,
                    message: 'Login successful'
                });
            } else {
                // Password does not match
                return res.status(401).json({
                    success: false,
                    message: 'Incorrect password'
                });
            }
        } else {
            // User does not exist
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send({ result: "Internal server error" });
    }
};
