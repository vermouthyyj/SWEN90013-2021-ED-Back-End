const firebase = require("../firebase");
const client = firebase.client;
const admin = firebase.admin;
const auth = client.auth();
const firestore = client.firestore();
const express = require("express");
const router = express.Router();

const CLASS_NAME = "scripts/accounts";

// auto create student accounts
router.get("/student", async (req, res) => {
    const emails = [
        "411869773@qq.com",
        "yigite4136@cfcjy.com",
        "zhouqingyi1104@gmail.com",
        "ndinata@student.unimelb.edu.au",
        "zmmin@student.unimelb.edu.au",
        "siil1@student.unimelb.edu.au",
        "chutongw@student.unimelb.edu.au",
        "william@gmail.com",
        "yujuny@student.unimelb.edu.au",
        "student@gmail.com"];
    const passwords = [
        "19951104",
        "123456",
        "123456",
        "Password",
        "testtest",
        "123456",
        "123456",
        "123456",
        "111111",
        "123456"];
    const firstNames=  [
        "Qingyi",
        "Zian",
        "Qingyi",
        "Nico",
        "Zian",
        "Sii Kim",
        "Chutong",
        "William",
        "Yujun",
        "Lily"];
    const lastNames = [
        "Zhou",
        "Min",
        "Zhou",
        "Dinata",
        "Min",
        "Lau",
        "Wang",
        "He",
        "Yan",
        "Smith"];
    // const accessCodes = [
    //     "123456",
    //     "123456",
    //     "123456",
    //     "123456",
    //     "123456",
    //     "123456",
    //     "123456"];
    for (let i = 0; i < emails.length; i++) {
        const email = emails[i];
        const password = passwords[i];
        const firstName = firstNames[i];
        const lastName = lastNames[i];
        // const accessCOde = accessCodes[i];
        let credential = null;
        try {
            credential = await auth.createUserWithEmailAndPassword(email, password);
        }
        catch (error) {
            res.status(404).json({
                code: error.code,
                message: error.message
            });
            return;
        }
        try {
            await firestore.collection("student").doc(credential.user.uid).set({
                firstName: firstName,
                lastName: lastName,
                email: email,
                avatarURL: null,
                schoolClass: null,
                feedbacks: [],
                badges: [],
                notes: [],
                grade: null,
                loveActivity: null,
                bestFriend: null,
                role: "student"
            });
        }
        catch (error) {
            res.status(404).json({message: `failed to create record in firestore, for account with email ${email}`});
            return;
        }
        console.debug(`${CLASS_NAME} | get./student | finished creating accounts for ${email}`);
    }
    res.json({message: "success"});
});

// auto create teacher accounts
router.get("/teacher", async (req, res) => {
    const emails = [
        "teacher@gmail.com"
    ];
    const passwords = [
        "123456"
    ];
    const firstNames=  [
        "Anna"
    ];
    const lastNames = [
        "Jones"
    ];
    // const accessCodes = [];
    for (let i = 0; i < emails.length; i++) {
        const email = emails[i];
        const password = passwords[i];
        const firstName = firstNames[i];
        const lastName = lastNames[i];
        // const accessCOde = accessCodes[i];
        let credential = null;
        try {
            credential = await auth.createUserWithEmailAndPassword(email, password);
        }
        catch (error) {
            res.status(404).json({
                code: error.code,
                message: error.message
            });
            return;
        }
        try {
            await firestore.collection("teacher").doc(credential.user.uid).set({
                firstName: firstName,
                lastName: lastName,
                email: email,
                avatarURL: null,
                school: null,
                schoolClass: [],
                feedbacks: [],
                announcements: [],
                role: "teacher"
            });
        }
        catch (error) {
            res.status(404).json({message: `failed to create record in firestore, for account with email ${email}`});
            return;
        }
        console.debug(`${CLASS_NAME} | get./teacher | finished creating accounts for ${email}`);
    }
    res.json({message: "success"});
});

module.exports = router;
