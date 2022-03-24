/**
 * @file this file contains the definition for Note model
 */
class Note {

    /**
     * return a note with the defined structure
     * @param nid the note id in DB
     * @param sid the student's id
     * @param pid the page id or activity id
     * @param note the note
     */

    constructor(nid, sid, pid, note) {
        this._nid = nid;
        this._pid = pid;
        this._sid = sid;
        this._note = note;
    }

    get nid() {
        return this._nid;
    }

    set nid(value) {
        this._nid = value;
    }

    get sid() {
        return this._sid;
    }

    set sid(value) {
        this._sid = value;
    }

    get pid() {
        return this._pid;
    }

    set pid(value) {
        this._pid = value;
    }

    get note() {
        return this._note;
    }

    set note(value) {
        this._note = value;
    }
}

module.exports = Note;
