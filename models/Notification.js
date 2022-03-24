/**
 * @file this file contains the definition for Notification model
 */
class Notification {

    /**
     * return a notification with the defined structure
     * @param nid the notification id in DB
     * @param teacher the teacher who send notification
     * @param assignClass the class this notification is assigned to
     * @param time the create time this notification was sent
     * @param title the title of this notification
     * @param content the content of this notification
     */
    constructor(nid, teacher, assignClass, time, title, content) {
        this._nid = nid;
        this._teacher = teacher;
        this._assignClass = assignClass;
        this._time = time;
        this._title = title;
        this._content = content;
    }

    get nid() {
        return this._nid;
    }

    set nid(value) {
        this._nid = value;
    }

    get teacher() {
        return this._teacher;
    }

    set teacher(value) {
        this._teacher = value;
    }

    get assignClass() {
        return this._assignClass;
    }

    set assignClass(value) {
        this._assignClass = value;
    }

    get time() {
        return this._time;
    }

    set time(value) {
        this._time = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }
}

module.exports = Notification;