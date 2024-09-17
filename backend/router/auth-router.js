const express = require("express");
const User = require("../Schema/auth");
const router = express.Router();

router.route("/create").get((req, res) => {
    res.send("Welcome to FakeApi Auth Route");
});

router.route("/create").post(async (req, res) => {
    const { name, email, password } = req.body;

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

module.exports = router;