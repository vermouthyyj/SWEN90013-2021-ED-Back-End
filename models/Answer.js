/**
 * @file this file contains the definition for Answer model
 */

class Answer {

    /**
    * return a answer with the defined structure
    * @param aid the answer id in DB
    * @param sid the student's id
    * @param qid the question id
    * @param answer the answer
    */
    constructor(aid, sid, qid, answer) {
        this._aid = aid;
        this._sid = sid;
        this._qid = qid;
        this._answer = answer;
    }

    get aid() {
        return this._aid;
    }

    set aid(value) {
        this._aid = value;
    }

    get sid() {
        return this._sid;
    }

    set sid(value) {
        this._sid = value;
    }

    get qid() {
        return this._qid;
    }

    set qid(value) {
        this._qid = value;
    }

    get answer() {
        return this._answer;
    }

    set answer(value) {
        this._answer = value;
    }
 }

module.exports = Answer;
