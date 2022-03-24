const firebase = require("../../firebase");
const client = firebase.client;
const admin = firebase.admin;
const firestore = client.firestore();
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const CLASS_NAME = "routes/class/classAdmin";

// approve an application
router.post("/accept", async (req, res) => {
    const schema = Joi.object({
        aids: Joi.array().items(Joi.string()).required()
    })
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({message: result.error.details[0].message});
        return;
    }
    let out = [];
    try {
        const batch = firestore.batch();
        for (let i = 0; i < req.body.aids.length; i++) {
            const id = req.body.aids[i];

            const applicationRef = firestore.collection("application").doc(id);
            const application = await applicationRef.get();
            const classRef = firestore.collection("class").doc(application.get("schoolClass"));
            const c = await classRef.get();
            const students = c.get("students");
            const studentRef = firestore.collection("student").doc(application.get("student"));

            batch.update(applicationRef, {status: "accept"});
            students.push(application.get("student"));
            batch.update(classRef, {students: students})
            batch.update(studentRef, {schoolClass: c.id});

            out.push(id);
        }
        await batch.commit();
        res.json({processedItems: out});
    }
    catch (error) {
        res.status(404).json({message: `There is at least one application in the input list that does not exist on the database, error message: ${error}`});
    }
});

// reject an application
router.post("/reject", async (req, res) => {
    const schema = Joi.object({
        aids: Joi.array().items(Joi.string()).required()
    })
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({message: result.error.details[0].message});
        return;
    }
    let out = [];
    try {
        const batch = firestore.batch();
        for (let i = 0; i < req.body.aids.length; i++) {
            const id = req.body.aids[i];
            const applicationRef = firestore.collection("application").doc(id);
            batch.update(applicationRef, {status: "reject"});
            out.push(id);
        }
        await batch.commit();
        res.json({processedItems: out});
    }
    catch (error) {
        res.status(404).json({message: `There is at least one application in the input list that does not exist on the database, error message: ${error}`});
    }
});

// remove a student from a class
router.post("/remove", async (req, res) => {
    const schema = Joi.object({
        uid: Joi.string().required(),
        cid: Joi.string().required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({message: result.error.details[0].message});
        return;
    }

    const studentID = req.body.uid;
    const studentRef = firestore.collection("student").doc(studentID);
    const classID = req.body.cid;
    const classRef = firestore.collection("class").doc(classID);

    try {
        // operation for updating student record and operation for updating class record are packed into a transaction to make DB state consistent
        await firestore.runTransaction(async (transaction) => {
            const student = await transaction.get(studentRef);
            const schoolClass = await transaction.get(classRef);
            // use the following line if a student can be in more than one classes
            //let studentClass = student.get("class").filter(elem => elem !== classID);
            let students = schoolClass.get("students").filter(elem => elem !== studentID);
            transaction.update(studentRef, {class: null});
            transaction.update(classRef, {students: students});
        })
        res.json({cid: classID, uid: studentID});
    }
    catch (error) {
        res.status(404).json({message: `Failed to remove student with id ${studentID} from class with id ${classID}, error message: ${error}`});
    }
});

module.exports = router;
