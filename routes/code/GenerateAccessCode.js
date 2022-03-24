const firebase = require("../../firebase");
const client = firebase.client;
const db = client.firestore();
const uuid = require("uuid").v4;
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    let code;
    const activeCodeRef = db.collection("codes").doc("active-codes");
    const activeCodeDoc = await activeCodeRef.get();
    let activeCodes = activeCodeDoc.get("codes");
    const usedCodeRef = db.collection("codes").doc("used-codes");
    const usedCodeDoc = await usedCodeRef.get();
    let usedCodes = Object.values(usedCodeDoc.get("codes"));
    try {
        await db.runTransaction(async t => {
            while (true) {
                // get an uuid from the uuid package, remove all hyphen and truncate it to have length 16
                code = uuid().replace(/-/g, "").substring(16);
                if (!activeCodes.includes(code) && !usedCodes.includes(code)) {
                    activeCodes.push(code);
                    t.update(activeCodeRef, {codes: activeCodes});
                    break;
                }
            }
        });
        res.set("Content-Type", "text/plain");
        res.send(code);
    }
    catch (err) {
        res.status(404);
        res.json({message: `Failed to generated an access token, ` + err});
    }
});



module.exports = router;
