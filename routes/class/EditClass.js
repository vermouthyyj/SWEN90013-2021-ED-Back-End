const firebase = require("../../firebase");
const client = firebase.client;
const admin = firebase.admin;
const db = client.firestore();
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const CLASS_NAME = "routes/firestore/editClass";

router.post("/", async (req, res) => {
    // input validation
    const schema = Joi.object({
        cid: Joi.string().required(),
        name: Joi.string(),
        school: Joi.string(),
        grade: Joi.string(),
        description: Joi.string(),
        teacher: Joi.string()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({message: result.error.details[0].message});
        return;
    }
    console.debug(`${CLASS_NAME} | post.'/' | input validation passed`);

    try {
        const docRef = db.collection('class').doc(req.body.cid);

        const doc = await docRef.get();

        if (!doc.exists) {
            res.status(404).json({message:`${req.body.cid} is not exist in database.`})
            return;
        }

        let name = req.body.name ? req.body.name : doc.get("name");
        let school = req.body.school ? req.body.school : doc.get("school");
        let grade = req.body.grade ? req.body.grade : doc.get("grade");
        let description = req.body.description ? req.body.description : doc.get("description");
        let teacher = req.body.teacher ? req.body.teacher : doc.get("teacher");

        try{
            await docRef.update({
                name: name,
                school: school,
                grade: grade,
                description: description,
                teacher: teacher
            });
            res.json({cid: req.body.cid});
        } catch {
            res.status(404).json({message:`${req.body.cid} update failed.`});
        }
    }
    catch (error) {
        const err = {
            code: error.code,
            message: error.message
        };
        res.status(404).json(err);
    }

});

module.exports = router;