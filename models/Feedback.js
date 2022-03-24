/**
 * @file this file contains the definition for Feedback model
 */

class Feedback {

    /**
    * return a feedback with the defined structure
    * @param fid the feedback id in DB
    * @param sid the student's id
    * @param tid the teacher's id
    * @param page the page number in the journal
    * @param answer the answer of student
    * @param feedback the feedback
    */
    constructor(fid, sid, tid, answer, feedback, page) {
        this._fid = fid;
        this._sid = sid;
        this._tid = tid;
        this._answer = answer;
        this._feedback = feedback;
        this._page = page;
    }

    get fid() {
        return this._fid;
    }

    set fid(value) {
        this._fid = value;
    }

    get sid() {
        return this._sid;
    }

    set sid(value) {
        this._sid = value;
    }

    get tid() {
        return this._tid;
    }

    set tid(value) {
        this._tid = value;
    }

    get answer() {
        return this._answer;
    }

    set answer(value) {
        this._answer = value;
    }

    get feedback() {
        return this._feedback;
    }

    set feedback(value) {
        this._feedback = value;
    }

    get page() {
        return this._page;
    }

    set page(value) {
        this._page = value;
    }
 }

module.exports = Feedback;
