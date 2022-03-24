/**
 * @file this file contains the management of getting teacher profile
 */

const firebase = require("../../firebase");
const client = firebase.client;
const db = client.firestore();
const storage = client.storage();
const express = require("express");
const router = express.Router();

const CLASS_NAME = 'routes/function/profile_teacher';

router.get("/", async (req, res) => {

    const teacherCollection = db.collection('teacher');

    if (req.headers.uid === undefined) {
        console.debug("uid is not defined!");
        res.status(400).json({message: "uid is not defined!"});
        return;
    }

    const tid = req.headers.uid;
    console.debug(tid);
    const teacherDocs = teacherCollection.doc(tid);

    const doc = await teacherDocs.get();
    if (!doc.exists) {
        console.debug('No such document!');
        res.status(404).json({message: "No such uid, please check!"});
    } else {
        console.debug('Document data:', doc.data());
        try {
            const teacherProfile = {
                firstName: doc.get('firstName'),
                lastName: doc.get('lastName'),
                email: doc.get('email'),
                avatarURL: doc.get('avatarURL'),
                school: doc.get('school'),
                schoolClass: doc.get('schoolClass'),
                feedbacks: doc.get('feedbacks'),
                announcements: doc.get('announcements'),
                role: doc.get("role")
            };
            console.debug(`${CLASS_NAME} | getTeacherProfile | finished pre-processing for tid ${tid}, data is ready to be returned`);

            res.json({
                tid: tid,
                firstName: teacherProfile.firstName,
                lastName: teacherProfile.lastName,
                email: teacherProfile.email,
                avatarURL: teacherProfile.avatarURL,
                school: teacherProfile.school,
                schoolClass: teacherProfile.schoolClass,
                feedbacks: teacherProfile.feedbacks,
                announcements: teacherProfile.announcements,
                role: teacherProfile.role
            });
        } catch (err) {
            console.error(`${CLASS_NAME} | getTeacherProfile | failed to retrieve student record from firestore for tid ${tid}, err: ${err}`);
            return Promise.reject(err);
        }
    }
});

module.exports = router;
