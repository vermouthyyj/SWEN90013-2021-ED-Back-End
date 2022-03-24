/**
 * @file this file contains the student get the class info
 */

const firebase = require("../../firebase");
const client = firebase.client;
const db = client.firestore();
const express = require("express");
const router = express.Router();

const CLASS_NAME = 'routes/function/class_get';

router.get("/", async (req, res) => {

    const studentCollection = db.collection('student');

    if (req.headers.uid === undefined) {
        console.debug("sid is not defined!");
        res.status(400).json({message: "sid is not defined! The student id is not existed."});
        return;
    }

    const sid = req.headers.uid;
    console.debug(sid);
    const studentDocs = studentCollection.doc(sid);
    const doc = await studentDocs.get();
    const classCollection = db.collection('class');
    if (!doc.exists) {
        console.debug('No such document!');
        res.status(404).json({message: "No such uid, please check!"});
        return;
    } else {
        console.debug('Document data:', doc.data());
        const classID = doc.get('schoolClass');
        if (classID === null) {
            console.debug('The student has no class!');
            res.status(404).json({message: "The student has no class!"});
            return;
        }

        const classDocs = classCollection.doc(classID);
        const docClass = await classDocs.get();
        if (!docClass.exists) {
            console.debug('No such document!');
            res.status(404).json({message: "No such class, please check!"});
            return;
        } else {
            console.debug('Class data:', docClass.data());
            try {
                const classInfo = {
                    cid: docClass.get('cid'),
                    name: docClass.get('name'),
                    school: docClass.get('school'),
                    grade: docClass.get('grade'),
                    description: docClass.get('description'),
                    accessToken: docClass.get('accessToken'),
                    teacher: docClass.get('teacher'),
                    students: docClass.get('students'),
                    applications: docClass.get('applications'),
                    announcements: docClass.get('announcements')
                };
                console.debug(`${CLASS_NAME} | getClassInfo | finished pre-processing for sid ${sid}, data is ready to be returned`);

                res.json({
                    cid: classInfo.cid,
                    name: classInfo.name,
                    school: classInfo.school,
                    grade: classInfo.grade,
                    description: classInfo.description,
                    accessToken: classInfo.accessToken,
                    teacher: classInfo.teacher,
                    students: classInfo.students,
                    applications: classInfo.applications,
                    announcements: classInfo.announcements
                });
            } catch (err) {
                console.error(`${CLASS_NAME} | getClassInfo | failed to retrieve class record from firestore for sid ${sid}, err: ${err}`);
                return Promise.reject(err);
            }
        }
    }
});

module.exports = router;