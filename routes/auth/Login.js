const firebase = require("../../firebase");
const client = firebase.client;
const admin = firebase.admin;
const auth = client.auth();
const firestore = client.firestore();
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const CLASS_NAME = "routes/auth/login";

router.post("/", async (req, res) => {
    // input validation
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({message: result.error.details[0].message});
        return;
    }
    console.debug(`${CLASS_NAME} | post.'/' | input validation passed`);
    // firebase login
    let credential;
    try {
        credential = await auth.signInWithEmailAndPassword(req.body.email, req.body.password);
    }
    catch (error) {
        const err = {
            code: error.code,
            message: error.message
        };
        res.status(404).json({message: error.message});
        return;
    }
    console.debug(`${CLASS_NAME} | post.'/' | user credential retrieved from firebase`)
    let role = null, temp;
    try {
        temp = await firestore.collection("student").doc(credential.user.uid).get();
        if (temp.exists) {
            role = "student";
        }
        else {
            temp = await firestore.collection("teacher").doc(credential.user.uid).get();
            role = temp.exists ? "teacher" : null;
        }
    }
    catch (error) {
        console.debug(`failed to get user record from firestore for user with id ${credential.user.uid}`);
        res.status(404).json({message: `Failed to login ${req.body.email}`});
        return;
    }
    res.json({
        uid: credential.user.uid,
        idToken: "idToken",
        role: role
    });
});

module.exports = router;
