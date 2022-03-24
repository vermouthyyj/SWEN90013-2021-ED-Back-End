const firebase = require("../../firebase");
const client = firebase.client;
const admin = firebase.admin;
const db = client.firestore();
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const CLASS_NAME = "routes/firestore/deleteClass";

router.post("/", async (req, res) => {
    // input validation
    const schema = Joi.object({
        cid: Joi.string().required(),
        teacher: Joi.string().required()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({message: result.error.details[0].message});
        return;
    }
    console.debug(`${CLASS_NAME} | post.'/' | input validation passed`);

    try {
        await db.collection('class').doc(req.body.cid).delete();
        res.json({cid: req.body.cid});

        const teaRef = db.collection('teacher').doc(req.body.teacher);
        const tea = await teaRef.get();

        if (!tea.exists) {
            res.status(404).json({message:`${req.body.teacher} is not exist in database.`})
            return;
        }

        let newClass = tea.get("schoolClass");

        const index = newClass.indexOf(req.body.cid);
        if (index > -1) {
            newClass.splice(index, 1);
        }

        try{
            await teaRef.update({
                schoolClass: newClass
            });
            res.json({tid: tea.get("tid")});
        } catch (error) {
            res.status(404).json({message:`${tea.get("tid")} update failed.`});
            return;
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