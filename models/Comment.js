/**
 * @file this file contains the definition for Comment model
 */
class Comment {

    /**
     * return a comment with the defined structure
     * @param cid the comment id in DB
     * @param student the student who write this comment
     * @param activity the activity this comment is added on
     * @param date the time this comment was written
     * @param content the content of the comment
     */
    constructor(cid, student, activity, date, content) {
        this._cid = cid;
        this._student = student;
        this._activity = activity;
        this._date = date;
        this._content = content;
    }

    get cid() {
        return this._cid;
    }

    set cid(value) {
        this._cid = value;
    }

    get student() {
        return this._student;
    }

    set student(value) {
        this._student = value;
    }

    get activity() {
        return this._activity;
    }

    set activity(value) {
        this._activity = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }
}

module.exports = Comment;

