const express = require("express");
const User = require("../Schema/auth");
const { oath2client } = require("../utils/googleConfig");
const router = express.Router();
const axios = require("axios");

// Add User
router.route("/create").get((req, res) => {
    res.send("Welcome to FakeApi Auth Route");
});

router.route("/create").post(async (req, res) => {
    const { name, email, password } = req.body;
    let tokken = ''
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({ message: "email already exists" });
    }

    const userCreated = await User.create({ name, email, password });
    res.status(201).json({
        msg: "registration successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
    });
});
// Auth User
router.route("/auth").post(async (req, res) => {
    try {
        const { email, password, tokken } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({
                status: "warn",
                message: "Invalid Credentials"
            });
        }

        const user = await userExist.comparePassword(password);

        if (user) {
            res.status(200).json({
                status: "success",
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        }
        else {
            res.status(400).json({
                status: "warn",
                message: "Invalid Credentials"
            });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get user
router.route("/me").post(async (req, res) => {
    try {
        const { token } = req.body;
        let user = await User.findOne({ token });
        // console.log(user);

        if (!user) {
            return res.status(400).json({
                message: "User Not Found",
            });
        } else {
            res.status(200).json({
                status: "success",
                user: {
                    name: user.name,
                    email: user.email,
                    userId: user._id.toString(),
                },
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// auth Google
router.route("/google").get(async (req, res) => {
    try {
        const { code } = req.query;
        const googleOath = await oath2client.getToken(code);
        oath2client.setCredentials(googleOath.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleOath.tokens.access_token}`
        )
        const { email, name } = userRes.data;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email, name, password: 'googleAuth' });
        }
        return res.status(200).json({
            status: "success",
            user,
            token: await user.generateToken()
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});


// auth Github
router.route("/github").get(async (req, res) => {
    try {
        const { code } = req.query;

        // Exchange code for access token
        const tokenResponse = await axios.post(`https://github.com/login/oauth/access_token`, {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_SECRET_ID,
            code,
        }, {
            headers: {
                accept: 'application/json',
            },
        });

        const accessToken = tokenResponse.data.access_token;

        // Fetch user data
        const userResponse = await axios.get(`https://api.github.com/user`, {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });

        const { email, name, login } = userResponse.data;
        let user;
        if (!email) {
            user = await User.findOne({ name: login });
        } else {
            user = await User.findOne({ email });
        }
        if (!user) {
            user = await User.create({ email, name, password: 'githubAuth' });
        }
        return res.status(200).json({
            status: "success",
            user,
            token: await user.generateToken()
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
})



module.exports = router;