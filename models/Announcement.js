/**
 * @file this file contains the definition for Announcement model
 */
class Announcement {

    /**
     * return an announcement with the defined structure
     * @param aid the announcement id in DB
     * @param teacher the teacher sending the announcement
     * @param schoolClass the class to send the announcement to
     * @param content the content of the announcement
     * @param date the date when the announcement was sent
     */
    constructor(aid, teacher, schoolClass, content, date) {
        this._aid = aid;
        this._teacher = teacher;
        this._schoolClass = schoolClass;
        this._content = content;
        this._date = date;
    }

    get aid() {
        return this._aid;
    }

    set aid(value) {
        this._aid = value;
    }

    get teacher() {
        return this._teacher;
    }

    get schoolClass() {
        return this._schoolClass;
    }

    set schoolClass(value) {
        this._schoolClass = value;
    }

    set teacher(value) {
        this._teacher = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }
}

module.exports = Announcement;
