const firebase = require("../firebase");
const client = firebase.client;
const admin = firebase.admin;
const auth = client.auth();
const firestore = client.firestore();
const express = require("express");
const router = express.Router();

// create example records for each collection
router.get("/", async (req, res) => {
    await firestore.collection("application").doc("example").set({
        student: null,
        schoolClass: null,
        status: "pending--accept--reject",
        createdAt: new Date()
    });

    await firestore.collection("class").doc("example").set({
        name: null,
        school: null,
        grade: null,
        description: null,
        teacher: null,
        students: [],
        applications: [],
        announcements: []
    });

    res.json({message: "success"});
})

router.get("/class", async (req, res) => {
    const names = [
        "class 3",
        "test",
        "class 1",
        "class 2",
        "Random class name here"
    ];
    const schools=  [
        "Victoria Primary School 1",
        "Victoria Primary School 1",
        "Victoria Primary School 2",
        "Victoria Primary School 8",
        "Victoria Primary School 1"
    ];
    const grades = [
        "Year 4",
        "Year 4",
        "Year 4",
        "Year 5",
        "Year 5"
    ];
    const descriptions = [
        "123",
        "test class",
        "School 1",
        "123",
        "Here is a long description"
    ];
    for (let i = 0; i < names.length; i++) {
        await firestore.collection("class").add({
            name: names[i],
            school: schools[i],
            grade: grades[i],
            description: descriptions[i],
            teacher: null,
            students: [],
            applications:[],
            announcements: []
        });
    }

    res.json({message: "success"});
});

module.exports = router;