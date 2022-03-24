/**
 * @file this file contains the management of editing the answer of activity
 */

const firebase = require("../../firebase");
const client = firebase.client;
const admin = firebase.admin;
const db = client.firestore();
const storage = client.storage();
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const CLASS_NAME = "routes/feedback/editFeedback";

router.post("/", async (req, res) => {
    const schema = Joi.object({
        feedback: Joi.string().required(),
        sid: Joi.string().required(),
        page: Joi.string().required(),
        tid: Joi.string().required()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({message: result.error.details[0].message});
        return;
    }
    console.debug(`${CLASS_NAME} | post.'/' | input validation passed`);

    try {

        const studentRef = db.collection('student').doc(req.body.sid);
        const stu = await studentRef.get();

        if (!stu.exists) {
            res.status(404).json({message:`${req.body.sid} is not exist in database.`})
            return;
        }

        const teacherRef = db.collection('teacher').doc(req.body.tid);
        const tea = await teacherRef.get();

        if (!tea.exists) {
            res.status(404).json({message:`${req.body.tid} is not exist in database.`})
            return;
        }

        let origin = stu.get('activity');
        let fid = null;
        if (!origin[req.body.page]) {
            const docRef = await db.collection('feedback').add({
                sid: req.body.sid,
                answer: null,
                page: req.body.page,
                tid: req.body.tid,
                feedback: req.body.feedback,
            });
            console.log('Set: ', docRef);
            fid = docRef.id;
            res.json({
                fid: docRef.id
            });
        } else {
            const docRef = db.collection('feedback').doc(origin[req.body.page]);
            const doc = await docRef.get();
            await docRef.update({
                feedback: req.body.feedback
            });
            console.log('Set: ', docRef);
            fid = docRef.id;
            res.json({
                fid: docRef.id
            });
        }

        let Activity = stu.get('activity');
        Activity[req.body.page] = fid;

        let notifications = stu.get('notifications');

        if (req.body.feedback.length > 0) {
            notifications.push(`You have received a feedback at page ${req.body.page}`);
        }

        try{
            await studentRef.update({
                activity: Activity,
                notifications: notifications
            });
            //res.json({tid: stu.get("sid")});
        } catch (error) {
            res.status(404).json({message:`${stu.get("sid")} update failed.`});
            return;
        }

        let newActivity = tea.get("feedbacks");
        if (!newActivity[req.body.page]) {
            newActivity[req.body.page] = [fid];
        } else {
            let length = newActivity[req.body.page].length;
            let i;
            let flag = 0;
            for (i = 0; i < length; i++) {
                if (newActivity[req.body.page][i] == fid) {
                    flag = 1;
                }
            }
            if (flag == 0) {
                newActivity[req.body.page].push(fid);
            }
        }

        try{
            await teacherRef.update({
                feedbacks: newActivity
            });
            //res.json({tid: tea.get("tid")});
        } catch (error) {
            res.status(404).json({message:`${tea.get("tid")} update failed.`});
            return;
        }
        return;

    }
    catch (error) {
        const err = {
            code: error.code,
            message: error.message
        };
        res.status(404).json({message: err});
        return;
    }
});

module.exports = router;