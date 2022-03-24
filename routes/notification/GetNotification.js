const firebase = require("../../firebase");
const client = firebase.client;
const db = client.firestore();
const storage = client.storage();
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {

    const studentCollection = db.collection('student');

    if (req.headers.uid === undefined) {
        console.debug("uid is not defined!");
        res.status(400).json({message: "uid is not defined!"});
        return;
    }

    const sid = req.headers.uid;
    console.debug(sid);
    const studentDocs = studentCollection.doc(sid);

    const doc = await studentDocs.get();
    if (!doc.exists) {
        console.debug('No such document!');
        res.status(404).json({message: "No such uid, please check!"});
    } else {
        console.debug('Document data:', doc.data());
        try {

            let notifications = doc.get("notifications");
            res.json({
                notifications: notifications
            });

        } catch (err) {
            console.error(`${CLASS_NAME} | getStudentProfile | failed to retrieve student record from firestore for sid ${sid}, err: ${err}`);
            return Promise.reject(err);
        }
    }

});

module.exports = router;