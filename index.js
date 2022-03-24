const express = require("express");
const cors = require("cors");
const app = express();

// use cors middleware to solve the cors problem
app.use(cors());
// use built-in middleware from express to parse json data in request body
app.use(express.json());

// routes for running auto-scripts
app.use("/api/scripts/create-accounts", require("./scripts/Accounts"));
app.use("/api/scripts/others", require("./scripts/Others"));

// define different routes in different components
// authentication
app.use("/api/login", require("./routes/auth/Login"));
app.use("/api/signup", require("./routes/auth/Signup"));
app.use("/api/logout", require("./routes/auth/Logout"));
// use profile
app.use("/api/profilestudent", require("./routes/function/GetStudentProfile"));
app.use("/api/profileteacher", require("./routes/function/GetTeacherProfile"));
app.use("/api/teacherprofileedit", require("./routes/function/TeacherProfileEdit"));
app.use("/api/studentprofileedit", require("./routes/function/StudentProfileEdit"));
app.use("/api/profile/edit/password", require("./routes/function/ProfileEditPassword"));
// class management
app.use("/api/classes", require("./routes/class/ClassInfo"));
app.use("/api/class/admin", require("./routes/class/ClassAdmin"));
app.use("/api/createClass", require("./routes/class/CreateClass"));
app.use("/api/editClass", require("./routes/class/EditClass"));
app.use("/api/deleteClass", require("./routes/class/DeleteClass"));

app.use("/api/joinClass", require("./routes/function/JoinClass"));
app.use("/api/classGet", require("./routes/function/GetClass"));

// feedback management
app.use("/api/editAnswer", require("./routes/feedback/EditAnswer"));
app.use("/api/editFeedback", require("./routes/feedback/EditFeedback"));

// notification management
app.use("/api/getNotification", require("./routes/notification/GetNotification"));

// access code generation
app.use("/api/access-code", require("./routes/code/GenerateAccessCode"));

// choose the port to be the OS assigned one, or 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is listening at port ${port}`)
});

module.exports = app;