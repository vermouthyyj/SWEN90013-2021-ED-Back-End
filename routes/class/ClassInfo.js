const firebase = require("../../firebase");
const client = firebase.client;
const admin = firebase.admin;
const firestore = client.firestore();
const express = require("express");
const router = express.Router();
const SchoolClass = require("../../models/SchoolClass");
const Student = require("../../models/Student");
const Application = require("../../models/Application");

// get all classes for the given teacher
router.get("/", async (req, res) => {
    const uid = req.headers.uid;
    // check uid
    if (!uid) {
        res.status(400).json({message: "the id of teacher account is required"});
        return;
    }
    // get record from DB
    const teacher = await firestore.collection("teacher").doc(uid).get();
    if (!teacher.exists) {
        res.status(404).json({message: `The uid maybe wrong as there is no record for the given id ${uid}`});
        return;
    }
    const classIDs = teacher.get("schoolClass");
    let classes = []
    for (let i = 0; i < classIDs.length; i++) {
        const record = await firestore.collection("class").doc(classIDs[i]).get();
        classes[i] = new SchoolClass(
            record.id,
            record.get("name"),
            record.get("school"),
            record.get("grade"),
            record.get("description"),
            record.id,
            record.get("teacher"),
            record.get("students"),
            record.get("applications"),
            record.get("announcements")
        );
    }
    const order = req.query.sorted;
    const sortedBy = req.query.by;
    const result = {
        classes: classes,
        message: "No sorting policy is provided, classes will be in random order"
    };
    // apply sorting if required
    if (order && sortedBy) {
        if (!["asc", "desc"].includes(order)) {
            result.message = `Unrecognised query param for sorted: ${order}, classes will be in random order. Valid query params include asc, desc`;
            res.json(result);
            return;
        }
        if (!["name", "school", "grade"].includes(sortedBy)) {
            result.message = `Unrecognised query param for by: ${sortedBy}, classes will be in random order. Valid query params include name, school, grade`;
            res.json(result);
            return;
        }
        classes.sort((a, b) => {
            if (sortedBy === "name") {
                return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
            else if (sortedBy === "school") {
                return order === "asc" ? a.school.localeCompare(b.school) : b.school.localeCompare(a.school);
            }
            else if (sortedBy === "grade") {
                return order === "asc" ? a.grade.localeCompare(b.grade) : b.grade.localeCompare(a.grade);
            }
        });
        result.message = `Classes are sorted in ${order} order by ${sortedBy}`;
        res.json(result);
        return;
    }
    res.json(result);
});

// get the detail information for the class with given id
router.get("/detail", async (req, res) => {
    const cid = req.headers.cid;
    if (!cid) {
        res.status(400).json({message: "the id of the class is required"});
        return;
    }
    const schoolClass = await firestore.collection("class").doc(cid).get();
    if (!schoolClass.exists) {
        res.status(404).json({message: `The cid maybe wrong as there is no record for the given id ${cid}`});
        return;
    }
    const result = new SchoolClass(
        schoolClass.id,
        schoolClass.get("name"),
        schoolClass.get("school"),
        schoolClass.get("grade"),
        schoolClass.get("description"),
        schoolClass.id,
        schoolClass.get("teacher"),
        schoolClass.get("students"),
        schoolClass.get("applications"),
        schoolClass.get("announcements")
    );
    res.json(result);
});

router.get("/students", async (req, res) => {
    const cid = req.headers.cid;
    if (!cid) {
        res.status(400).json({message: "The id of the class is required"});
        return;
    }
    const schoolClass = await firestore.collection("class").doc(cid).get();
    if (!schoolClass.exists) {
        res.status(404).json({message: `The cid maybe wrong as there is no record for the given id ${cid}`});
        return;
    }
    const studentIDs = schoolClass.get("students");
    const students = [];
    for (let i = 0; i < studentIDs.length; i++) {
        const student = await firestore.collection("student").doc(studentIDs[i]).get();
        // const temp = new Student(
        //     student.id,
        //     student.get("firstName"),
        //     student.get("lastName"),
        //     student.get("email"),
        //     student.get("avatarURL"),
        //     student.get("schoolClass"),
        //     student.get("feedbacks"),
        //     student.get("badges"),
        //     student.get("notes"),
        //     student.get("age"),
        //     student.get("loveActivity"),
        //     student.get("bestFriend")
        // ).toString();
        // console.debug(temp);
        // students[i] = JSON.parse(temp);
        students[i] = new Student(
            student.id,
            student.get("firstName"),
            student.get("lastName"),
            student.get("email"),
            student.get("avatarURL"),
            student.get("schoolClass"),
            student.get("feedbacks"),
            student.get("badges"),
            student.get("notes"),
            student.get("loveActivity"),
            student.get("grade"),
            student.get("bestFriend"),
            student.get("role"),
            Object.keys(student.get("activity"))
        )
    }
    res.json({students: students});
});

router.get("/applications", async (req, res) => {
    const tid = req.headers.uid;
    if (!tid) {
        res.status(400).json({message: "The id of the teacher is required"});
        return;
    }
    const teacher = await firestore.collection("teacher").doc(tid).get();
    if (!teacher.exists) {
        res.status(404).json({message: `The uid maybe wrong as there is no record for the given id ${tid}`});
        return;
    }
    let applicationStatus = req.query.status ? req.query.status : "pending";
    if (!["accept", "reject", "pending", "all"].includes(applicationStatus)) {
        applicationStatus = "pending";
    }
    const classes = teacher.get("schoolClass");
    let applications = [];
    // const queryResult = await firestore.collection("application").where('schoolClass', 'in', classes).get();
    let queryResult;
    if (applicationStatus === "all") {
        queryResult = await firestore.collection("application").where('schoolClass', 'in', classes).get();
    }
    else {
        queryResult = await firestore.collection("application").
                                        where('schoolClass', 'in', classes).
                                        where('status', '==', applicationStatus).
                                        get();
    }
    const applicationRecords = queryResult.docs;
    for (let i = 0; i < applicationRecords.length; i++) {
        const app = applicationRecords[i];
        const studentRec = await firestore.collection("student").doc(app.get("student")).get();
        const student = new Student(
            studentRec.id,
            studentRec.get("firstName"),
            studentRec.get("lastName"),
            studentRec.get("email"),
            studentRec.get("avatarURL"),
            studentRec.get("schoolClass"),
            studentRec.get("feedbacks"),
            studentRec.get("badges"),
            studentRec.get("notes"),
            studentRec.get("loveActivity"),
            studentRec.get("grade"),
            studentRec.get("bestFriend"),
            studentRec.get("role"),
            studentRec.get("activity")
        );
        const schoolClassRec = await firestore.collection("class").doc(app.get("schoolClass")).get();
        const schoolClass = new SchoolClass(
            schoolClassRec.id,
            schoolClassRec.get("name"),
            schoolClassRec.get("school"),
            schoolClassRec.get("grade"),
            schoolClassRec.get("description"),
            schoolClassRec.id,
            schoolClassRec.get("teacher"),
            schoolClassRec.get("students"),
            schoolClassRec.get("applications"),
            schoolClassRec.get("announcements")
        );
        applications.push(new Application(
            app.id,
            student,
            schoolClass,
            app.get("createdAt").toDate(),
            app.get("status")
        ));
    }
    // for (let i = 0; i < classes.length; i++) {
    //     const c = await firestore.collection("class").doc(classes[i]).get();
    //     const appIDs = c.get("applications");
    //     for (let j = 0; j < appIDs.length; j++) {
    //         const a = await firestore.collection("application").doc(appIDs[j]).get();
    //         const studentRec = await firestore.collection("student").doc(a.get("student")).get();
    //         const student = new Student(
    //             studentRec.id,
    //             studentRec.get("firstName"),
    //             studentRec.get("lastName"),
    //             studentRec.get("email"),
    //             studentRec.get("avatarURL"),
    //             studentRec.get("schoolClass"),
    //             studentRec.get("feedbacks"),
    //             studentRec.get("badges"),
    //             studentRec.get("notes"),
    //             studentRec.get("loveActivity"),
    //             studentRec.get("grade"),
    //             studentRec.get("bestFriend"),
    //             studentRec.get("role"),
    //             studentRec.get("activity")
    //         );
    //         const schoolClassRec = await firestore.collection("class").doc(a.get("schoolClass")).get();
    //         const schoolClass = new SchoolClass(
    //             schoolClassRec.id,
    //             schoolClassRec.get("name"),
    //             schoolClassRec.get("school"),
    //             schoolClassRec.get("grade"),
    //             schoolClassRec.get("description"),
    //             schoolClassRec.id,
    //             schoolClassRec.get("teacher"),
    //             schoolClassRec.get("students"),
    //             schoolClassRec.get("applications"),
    //             schoolClassRec.get("announcements")
    //         );
    //         applications.push(new Application(
    //             a.id,
    //             student,
    //             schoolClass,
    //             a.get("createdAt").toDate(),
    //             a.get("status")
    //         ));
    //     }
    // }
    // if (applicationStatus !== "all") {
    //     applications = applications.filter(item => item.status === applicationStatus);
    // }
    res.json(applications);
});

module.exports = router;
