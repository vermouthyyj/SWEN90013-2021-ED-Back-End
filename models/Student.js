/**
 * @file this file contains the definition for Student model
 */
class Student {

    /**
     * return a student with the defined structure
     * @param sid the student id in DB
     * @param firstName the first name of the student
     * @param lastName the last name of the student
     * @param email the email address of the student
     * @param avatarURL the URL of the avatar  of the student
     * @param schoolClass the class the student is in
     * @param feedbacks all the feedbacks the student has received
     * @param badges the badges the student has unlocked so far
     * @param notes the notes the student has written down
     * @param loveActivity the favourite activity of student
     * @param grade the grade of student
     * @param bestFriend the best friend of student
     * @param role the role of the student
     * @param activity the all answers of activities of the student
     */
    constructor(sid, firstName, lastName, email, avatarURL, schoolClass, feedbacks, badges, notes, loveActivity, grade, bestFriend, role, activity) {
        this._sid = sid;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._avatarURL = avatarURL;
        this._schoolClass = schoolClass;
        this._feedbacks = feedbacks;
        this._badges = badges;
        this._notes = notes;
        this._grade = grade;
        this._loveActivity = loveActivity;
        this._bestFriend = bestFriend;
        this._role = role;
        this._activity = activity;
    }

    get sid() {
        return this._sid;
    }

    set sid(value) {
        this._sid = value;
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

    get badges() {
        return this._badges;
    }

    set badges(value) {
        this._badges = value;
    }

    get grade() {
        return this._grade;
    }

    set grade(value) {
        this._grade = value;
    }

    get loveActivity() {
        return this._loveActivity;
    }

    set loveActivity(value) {
        this._loveActivity = value;
    }

    get bestFriend() {
        return this._bestFriend;
    }

    set bestFriend(value) {
        this._bestFriend = value;
    }

    get notes() {
        return this._notes;
    }

    set notes(value) {
        this._notes = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }

    get activity() {
        return this._activity;
    }

    set activity(value) {
        this._activity = value;
    }

    toString() {
        return `
            {
                "sid": "${this.sid}",
                "firstName": "${this.firstName}",
                "lastName": "${this.lastName}",
                "email": "${this.email}",
                "avatarURL": "${this.avatarURL}",
                "schoolClass": "${this.schoolClass}",
                "feedbacks": "${this.feedbacks}",
                "badges": "${this.badges}",
                "notes": "${this.notes}",
                "age": "${this.age}",
                "loveActivity": "${this.loveActivity}",
                "bestFriend": "${this.bestFriend}",
                "activity": "${this.activity}"
            }
        `;
    }
}

module.exports = Student;
