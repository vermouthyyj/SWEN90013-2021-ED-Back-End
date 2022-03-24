/**
 * @file this file contains the definition for Teacher model
 */
class Teacher {

    /**
     * return a teacher with the defined structure
     * @param tid the teacher id in DB
     * @param firstName the teacher's first name
     * @param lastName the teacher's last name
     * @param email the email address
     * @param avatarURL the URL of the avatar
     * @param school the school of the teacher
     * @param schoolClass all classes the teacher creates
     * @param feedbacks all the feedbacks the teacher has send
     * @param announcements all the announcements the teacher has published
     * @param role the role of the teacher
     */
    
    constructor(tid, firstName, lastName, email, avatarURL, school, schoolClass, feedbacks, announcements, role) {
        this._tid = tid;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._avatarURL = avatarURL;
        this._school = school;
        this._schoolClass = schoolClass;
        this._feedbacks = feedbacks;
        this._announcements = announcements;
        this._role = role;
    }

    get tid() {
        return this._tid;
    }

    set tid(value) {
        this._tid = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get avatarURL() {
        return this._avatarURL;
    }

    set avatarURL(value) {
        this._avatarURL = value;
    }

    get school() {
        return this._school;
    }

    set school(value) {
        this._school = value;
    }

    get schoolClass() {
        return this._schoolClass;
    }

    set schoolClass(value) {
        this._schoolClass = value;
    }

    get feedbacks() {
        return this._feedbacks;
    }

    set feedbacks(value) {
        this._feedbacks = value;
    }

    get announcements() {
        return this._announcements;
    }

    set announcements(value) {
        this._announcements = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }
}

module.exports = Teacher;