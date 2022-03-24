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

const CLASS_NAME = "routes/feedback/editAnswer";

router.get("/", async (req, res) => {

    const studentCollection = db.collection('student');

    if (req.headers.uid === undefined) {
        console.debug("uid is not defined!");
        res.status(400).json({message: "student id is required, but not given"});
        return;
    }

    if (req.headers.page === undefined) {
        console.debug("page is not defined!");
        res.status(400).json({message: "page number is required, but not given"});
        return;
    }

    const sid = req.headers.uid;
    console.debug(sid);
    const studentDocs = studentCollection.doc(sid);

    const doc = await studentDocs.get();
    if (!doc.exists) {
        console.debug(`no student record with id ${sid} in database`);
        res.status(404).json({message: "The given student doesn't exist in the database, please check again!"});
        return;
    } else {
        console.debug('Document data:', doc.data());
        try {
            let activity = doc.get('activity');
            let activity_page;
            if(!activity) {
                activity_page = null;
            } else {
                let feedbacks = await db.collection('feedback').doc(activity[req.headers.page]).get();
                activity_page = {
                    sid: feedbacks.get('sid'),
                    tid: feedbacks.get('tid'),
                    page: feedbacks.get('page'),
                    answer: feedbacks.get('answer'),
                    feedback: feedbacks.get('feedback')
                };
            }
            console.debug(`${CLASS_NAME} | getAnswer | finished pre-processing for sid ${sid}, data is ready to be returned`);

            res.json({
                sid: sid,
                page: req.headers.page,
                activity: activity_page,
            });
        } catch (err) {
            console.error(`${CLASS_NAME} | getAnswer | failed to retrieve student record from firestore for sid ${sid}, err: ${err}`);
            res.status(404).json({message: "Failed to load the content for this journal page"});
        }
    }
});

router.post("/edit", async (req,res) => {
    const schema = Joi.object({
        answer: Joi.string().required(),
        sid: Joi.string().required(),
        page: Joi.string().required(),
        tid: Joi.string().optional().allow("")
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({message: result.error.details[0].message});
        return;
    }
    console.debug(`${CLASS_NAME} | post.'/' | input validation passed`);

    let istid = 1;

    try {
        let fid;
        const studentRef = db.collection('student').doc(req.body.sid);
        const stu = await studentRef.get();

        if (!stu.exists) {
            res.status(404).json({message:`${req.body.sid} is not exist in database.`})
            return;
        }

        if (req.body.tid === undefined) {
            istid = 0;
        }

        if (req.body.tid === "") {
            istid = 0;
        }

        if (istid !== 0) {
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
                    answer: req.body.answer,
                    page: req.body.page,
                    tid: req.body.tid,
                    feedback: null,
                });
                console.log('Set: ', docRef);
                fid = docRef.id;
                // res.json({
                //     fid: docRef.id
                // });

            } else {
                const docRef = db.collection('feedback').doc(origin[req.body.page]);
                const doc = await docRef.get();
                await docRef.update({
                    answer: req.body.answer
                });
                console.log('Set: ', docRef);
                fid = docRef.id;
                // res.json({
                //     fid: docRef.id
                // });
            }

            let Activity = stu.get('activity');
            Activity[req.body.page] = fid;

            try{
                await studentRef.update({
                    activity: Activity
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
        } else {
            let origin = stu.get('activity');
            let fid = null;
            if (!origin[req.body.page]) {
                const docRef = await db.collection('feedback').add({
                    sid: req.body.sid,
                    answer: req.body.answer,
                    page: req.body.page,
                    tid: null,
                    feedback: null,
                });
                console.log('Set: ', docRef);
                fid = docRef.id;
                // res.json({
                //     fid: docRef.id
                // });

            } else {
                const docRef = db.collection('feedback').doc(origin[req.body.page]);
                const doc = await docRef.get();
                await docRef.update({
                    answer: req.body.answer
                });
                console.log('Set: ', docRef);
                fid = docRef.id;
                // res.json({
                //     fid: docRef.id
                // });
            }

            let Activity = stu.get('activity');
            Activity[req.body.page] = fid;

            try{
                await studentRef.update({
                    activity: Activity
                });
                //res.json({tid: stu.get("sid")});
            } catch (error) {
                console.log("~~~ 3" + error)
                res.status(404).json({message:`${stu.get("sid")} update failed.`});
                return;
            }
        }
        // assigning badges to students based on their activity progress
        console.debug(`Start assigning badges to student with id ${req.body.sid}`);
        const allActivities = stu.get("activity");
        let badges = stu.get("badges")
        const numOfAct = Object.keys(allActivities).length;
        console.debug(`student with id ${req.body.sid} has finished ${numOfAct} activities`);
        if (numOfAct >= 15) {
            if (!badges.includes("researcher")) {
                badges.push("researcher");
                console.debug("researcher badge assigned");
            }
            else {
                console.debug(`student with id ${req.body.sid} already has badge researcher`);
            }
        }
        if (numOfAct >= 30) {
            if (!badges.includes("investigator")) {
                badges.push("investigator");
                console.debug("investigator badge assigned");
            }
            else {
                console.debug(`student with id ${req.body.sid} already has badge investigator`);
            }
        }
        if (numOfAct >= 45) {
            if (!badges.includes("captain")) {
                badges.push("captain");
                console.debug("captain badge assigned");
            }
            else {
                console.debug(`student with id ${req.body.sid} already has badge captain`);
            }
        }
        if (numOfAct >= 60) {
            if (!badges.includes("master")) {
                badges.push("master");
                console.debug("master badge assigned");
            }
            else {
                console.debug(`student with id ${req.body.sid} already has badge master`);
            }
        }
        await studentRef.update({
            badges: badges
        });
        console.debug(`Finish assigning badges to student with id ${req.body.sid}`);
        res.json({
            fid: fid
        });
    }
    catch (error) {
        const err = {
            code: error.code,
            message: error.message
        };
        res.status(404).json({message: err});
    }
});

module.exports = router;