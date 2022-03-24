/**
 * @file this file contains the definition for Class model
 */
class SchoolClass {

    /**
     * return a class with the defined structure
     * @param cid the class id in DB
     * @param name the name of the class
     * @param school the school the class is in
     * @param grade the grade of the class
     * @param description the description about the class
     * @param accessToken the access token used to join the class
     * @param teacher the teacher of the class
     * @param students all the students in the class
     * @param applications all applications for the class
     * @param announcements all announcements sent to the class
     */
    constructor(cid, name, school, grade, description, accessToken, teacher, students, applications, announcements) {
        this._cid = cid;
        this._name = name;
        this._school = school;
        this._grade = grade;
        this._description = description;
        this._accessToken = accessToken;
        this._teacher = teacher;
        this._students = students;
        this._applications = applications;
        this._announcements = announcements;
    }

    get cid() {
        return this._cid;
    }

    set cid(value) {
        this._cid = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get school() {
        return this._school;
    }

    set school(value) {
        this._school = value;
    }

    get grade() {
        return this._grade;
    }

    set grade(value) {
        this._grade = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get accessToken() {
        return this._accessToken;
    }

    set accessToken(value) {
        this._accessToken = value;
    }

    get teacher() {
        return this._teacher;
    }

    set teacher(value) {
        this._teacher = value;
    }

    get students() {
        return this._students;
    }

    set students(value) {
        this._students = value;
    }

    get applications() {
        return this._applications;
    }

    set applications(value) {
        this._applications = value;
    }

    get announcements() {
        return this._announcements;
    }

    set announcements(value) {
        this._announcements = value;
    }
}

module.exports = SchoolClass;
