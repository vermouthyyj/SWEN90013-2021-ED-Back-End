/**
 * @file this file contains the definition for Activity model
 */
class Activity {

    /**
     * return an activity with the defined structure
     * @param aid the activity id in DB
     * @param teacher the teacher who creates and holds the activity
     * @param assignClass the class this activity is assigned to
     * @param time the create time this activity was written
     * @param title the title of this activity
     * @param content the content of this activity
     */
    constructor(aid, teacher, assignClass, time, title, content) {
        this._aid = aid;
        this._teacher = teacher;
        this._assignClass = assignClass;
        this._time = time;
        this._title = title;
        this._content = content;
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

module.exports = Activity;