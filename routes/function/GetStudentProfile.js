/**
 * @file this file contains the management of getting student profile
 */

const firebase = require("../../firebase");
const client = firebase.client;
const db = client.firestore();
const storage = client.storage();
const express = require("express");
const router = express.Router();

const CLASS_NAME = 'routes/function/profile_student';

router.get("/", async (req, res) => {

    const studentCollection = db.collection('student');

    if (req.headers.uid === undefined) {
        console.debug("uid is not defined!");
        res.status(400).json({message: "uid is not defined!"});
        return;
    }

    const sid = req.headers.uid;
    console.debug(`received id in the request: ${sid}`);
    const studentDocs = studentCollection.doc(sid);

    const doc = await studentDocs.get();
    if (!doc.exists) {
        console.debug(`No student record with id ${sid} in the database!`);
        res.status(404).json({message: "No such student in the system, please check!"});
        return;
    }
    console.debug('Document data:', doc.data());
    console.debug(`${CLASS_NAME} | getStudentProfile | finished pre-processing for sid ${sid}, data is ready to be returned`);

    res.json({
        sid: sid,
        firstName: doc.get('firstName'),
        lastName: doc.get('lastName'),
        grade: doc.get('grade'),
        avatarURL: doc.get('avatarURL'),
        class: doc.get('schoolClass'),
        bestFriend: doc.get('bestFriend'),
        badges: doc.get('badges'),
        loveActivity: doc.get('loveActivity'),
        role: doc.get("role"),
        activity: Object.keys(doc.get("activity"))
    });
});

module.exports = router;
