/**
 * @file this file contains the student join a class
 */

const firebase = require("../../firebase");
const client = firebase.client;
const db = client.firestore();
const storage = client.storage();
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const CLASS_NAME = 'routes/function/class_join';

router.post("/", async (req, res) => {

    const studentClass = db.collection('student');
    const joinClass = db.collection('class');
    const applyClass = db.collection('application');

    const schema = Joi.object({
        sid: Joi.string().required(),
        accessToken: Joi.string().required()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({message: result.error.details[0].message});
        return;
    }
    console.debug(`${CLASS_NAME} |: | ${req.body.sid} | join a class | ${req.body.accessToken}`);

    const studentDocs = studentClass.doc(req.body.sid);
    const doc = await studentDocs.get();
    const classDocs = joinClass.doc(req.body.accessToken);
    const doc_class = await classDocs.get();
    if (!doc.exists) {
        console.debug(`student with id ${req.body.sid} is not found in the database`);
        res.status(404).json({message: "Possibly wrong student id provided!"});
        return;
    }
    if (!doc_class.exists) {
        console.debug(`class with id ${req.body.accessToken} is not found in the database`);
        res.status(404).json({message: "Possibly wrong access token provided!"});
        return;
    }
    const applicationsRef = db.collection("application");
    const queryResult = await applicationsRef.
                                where('student', '==', req.body.sid).
                                where('schoolClass', '==', req.body.accessToken).
                                get();
    if (!queryResult.empty) {
        console.debug(`student with id ${req.body.sid} has already applied to join class with id ${req.body.accessToken}`);
        res.status(404).json({message: "You have already applied to join this class!"});
        return;
    }
    else {
        console.debug('Document data:', doc.data());
        try {

            const docRef = await applyClass.add({
                student: req.body.sid,
                schoolClass: req.body.accessToken,
                status: "pending",
                createdAt: new Date()
            });
            console.debug('The student has applied the class: ', req.body.accessToken);

            const classRef = db.collection('class').doc(req.body.accessToken);
            const cla = await classRef.get();
            let newApplications = cla.get("applications");
            newApplications.push(docRef.id);

            try{
                await classRef.update({
                    applications: newApplications
                });
            } catch {
                console.debug(`failed to update the application list for class with id ${req.body.accessToken}`);
                res.status(404).json({message: "failed to update the information in database, please try again!"});
                return;
            }

            res.json({sid: req.body.sid});
            return;

        } catch (error) {
            const err = {
                code: error.code,
                message: error.message
            };
            console.debug(err);
            res.status(404).json({message: "failed to process the request, please try again!"});
            return;
        }
    }
});

module.exports = router;