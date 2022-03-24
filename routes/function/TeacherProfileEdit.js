const firebase = require("../../firebase");
const client = firebase.client;
const admin = firebase.admin;
const db = client.firestore();
const express = require("express");
const router = express.Router();
const Joi = require("joi");
let projectId = "educationdesign-5bce6";

const {Storage} = require('@google-cloud/storage')
const storage = new Storage({projectId,admin});
const Multer = require('multer');
const {format} = require('util');

const CLASS_NAME = "routes/function/TeacherProfileEdit";

const bucket = storage.bucket("educationdesign-5bce6.appspot.com/")

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

router.post("/editAvatarURL", multer.single('file'), (req, res, next) => {
    if (!req.file) {
        res.status(400).send("no file uploaded.");
        return;
    }

    if (req.headers.tid === undefined) {
        console.debug("tid is not defined!");
        res.status(400).json({message: "tid is not defined!"});
        return;
    }

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
        resumable: false,
    });

    blobStream.on('error', err => {
        next(err);
    });

    blobStream.on('finish', async () => {
        const publicURL = format(
            'https://storage.googleapis.com/'+ bucket.name + '/' + blob.name,
        );
        const docRef = db.collection('teacher').doc(req.headers.tid);
        try {
            await docRef.update({
                avatarURL: publicURL.toString()
            });
        } catch {
            res.status(404).json({message: `${req.headers.tid} update failed.`});
            return;
        }
        res.status(200).send(publicURL);
    });
    blobStream.end(req.file.buffer);

});

router.post("/", async (req, res) => {
    // input validation
    const schema = Joi.object({
        tid: Joi.string().required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        avatarURL: Joi.string(),
        school: Joi.string()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({message: result.error.details[0].message});
        return;
    }
    console.debug(`${CLASS_NAME} | post.'/' | input validation passed`);


    try {

        const docRef = db.collection('teacher').doc(req.body.tid);
        const doc = await docRef.get();

        if (!doc.exists) {
            res.status(404).json({message:`${req.body.tid} is not exist in database.`})
            return;
        }

        let firstName = req.body.firstName ? req.body.firstName : doc.get("firstName");
        let lastName = req.body.lastName ? req.body.lastName : doc.get("lastName");
        let avatarURL = req.body.avatarURL ? req.body.avatarURL : doc.get("avatarURL");
        let school = req.body.school ? req.body.school : doc.get("school");

        // console.log(firstName);
        // console.log(lastName);
        // console.log(avatarURL);
        // console.log(school);

        try{
            await docRef.update({
                firstName: firstName,
                lastName: lastName,
                avatarURL: avatarURL,
                school: school
            });
            res.json({tid: req.body.tid});
        } catch {
            res.status(404).json({message:`${req.body.tid} update failed.`});
            return;
        }
    }
    catch (error) {
        const err = {
            code: error.code,
            message: error.message
        };
        res.status(404).json(err);
        return;
    }
});

module.exports = router;

