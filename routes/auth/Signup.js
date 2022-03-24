const firebase = require("../../firebase");
const client = firebase.client;
const admin = firebase.admin;
const auth = client.auth();
const db = client.firestore();
const firestore = client.firestore();
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const CLASS_NAME = "routes/auth/signup";

router.post("/", async (req, res) => {
    // input validation
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        accessCode: Joi.string().required(),
        role: Joi.string().required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({message: result.error.details[0].message});
        return;
    }
    const role = req.body.role;
    // TODO parent account in the future ?
    // if (role !== "student" || role !== "teacher" || role !== "parent") {
    if (role !== "student" && role !== "teacher") {
        console.log(role);
        res.status(400).json({message: "Invalid role provided"});
        return;
    }
    console.debug(`${CLASS_NAME} | post.'/' | input validation passed`);

    const code = req.body.accessCode;

    const activeCodeRef = db.collection("codes").doc("active-codes");
    const activeCodeDoc = await activeCodeRef.get();
    let activeCodes = activeCodeDoc.get("codes");
    const usedCodeRef = db.collection("codes").doc("used-codes");
    const usedCodeDoc = await usedCodeRef.get();
    let usedCodesObj = usedCodeDoc.get("codes");
    let usedCodes = Object.values(usedCodesObj);

    let activeIndex;
    if ((activeIndex = activeCodes.indexOf(code)) >= 0) {
        try {
            await db.runTransaction(async t => {
                activeCodes.splice(activeIndex, 1);
                usedCodesObj[req.body.email] = code;
                t.update(activeCodeRef, {codes: activeCodes});
                t.update(usedCodeRef, {codes: usedCodesObj});
            });
        }
        catch (err) {
            res.status(404).json({message: "Failed to create an account!"});
            return;
        }
    }
    else if (usedCodes.includes(code)) {
        res.status(404).json({message: "Used access code"});
        return;
    }
    else {
        res.status(404).json({message: "Nonexistent access code"});
        return;
    }
    // firebase signup
    // create account in firebase auth
    let credential, token, uid;
    try {
        credential = await auth.createUserWithEmailAndPassword(req.body.email, req.body.password);
        uid = credential.user.uid;
    }
    catch (error) {
        const err = {
            code: error.code,
            message: error.message
        };
        res.status(404).json({message: error.message});
        return;
    }
    console.debug(`${CLASS_NAME} | post.'/' | user account created in firebase auth`);

    // auth.currentUser.sendEmailVerification()
    //     .then(() => {
    //         // Email verification sent!
    //     });

    /*while (auth.currentUser.emailVerified == false) {

    }
    console.debug(`Verify succeeded`);*/

    // create record in firestore
    const records = firestore.collection(role);
    let record;
    if (role === "student") {
        record = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            avatarURL: null,
            schoolClass: null,
            feedbacks: [],
            badges: [],
            notes: [],
            grade: null,
            loveActivity: null,
            bestFriend: null,
            role: role,
            activity: {}
        };
    }
    else {
        record = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            avatarURL: null,
            school: null,
            schoolClass: [],
            feedbacks: {},
            announcements: []
        };
    }
    try {
        // write new record to firestore
        await records.doc(uid).set(record);
    }
    catch (error) {
        res.status(404).json({message: "Failed to create an account!"});
        return;
    }
    console.debug(`${CLASS_NAME} | post.'/' | user record created in firestore`);
    res.json({
        uid: uid,
        idToken: "idToken"
    });
});

module.exports = router;
