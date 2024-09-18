const express = require("express");
const User = require("../Schema/auth");
const router = express.Router();

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

    const userCreated = await User.create({ name, email, password, tokken });
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
        await User.updateMany(
            { email: email },
            {
                $set: {
                    tokken: tokken
                },
            })
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




module.exports = router;