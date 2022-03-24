const firebase = require("../../firebase");
const client = firebase.client;
const admin = firebase.admin;
const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.post("/", async (req, res) => {
    if (!req.body.uid) {
        res.status(400).json({message: "uid is required!"});
        return;
    }
    if (!req.body.password) {
        res.status(400).json({message: "password is required!"});
        return;
    }
    // const schema = Joi.object({
    //     uid: Joi.string().required(),
    //     password: Joi.string().required()
    // });
    // const result = schema.validate(req.body);
    // if (result.error) {
    //     res.status(400).json({message: result.error.details[0].message});
    //     return;
    // }
    const newPassword = req.body.password;
    const user = req.body.uid;
    // invalid password provided
    if (newPassword.length === 0) {
        res.status(404).json({message: "password with 0 length is sent for update, please check again!"});
        return;
    }
    try {
        await admin.auth().updateUser(req.body.uid, { password: newPassword });
    }
    catch (err) {
        res.status(404).json({message: `failed to update password for user with uid ${user}, error: ${err}`});
        return;
    }
    res.json({message: `new password ${newPassword} updated successfully on the back-end`});
});

module.exports = router;
