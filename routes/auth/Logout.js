const firebase = require("../../firebase");
const client = firebase.client;
const admin = firebase.admin;
const auth = client.auth();
const express = require("express");
const router = express.Router();

const CLASS_NAME = "routes/auth/logout";

router.post("/", (req, res) => {
    // TODO end user session in firebase
    res.json({message: "succeed"});
});

module.exports = router;
