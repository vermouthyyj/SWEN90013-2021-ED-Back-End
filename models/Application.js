/**
 * @file this file contains the definition for Application model
 */
class Application {

    /**
     * return an application with the defined structure
     * @param aid the application id in DB
     * @param student the student applying for a class
     * @param schoolClass the class to be applied to
     * @param createdAt the date and time when the application was created
     * @param status the status of the application (accepted, rejected, pending)
     */
    constructor(aid, student, schoolClass, createdAt, status) {
        this._aid = aid;
        this._student = student;
        this._schoolClass = schoolClass;
        this._createdAt = createdAt
        this._status = status;
    }

    get aid() {
        return this._aid;
    }

    set aid(value) {
        this._aid = value;
    }

    get student() {
        return this._student;
    }

    set student(value) {
        this._student = value;
    }

    get schoolClass() {
        return this._schoolClass;
    }

    set schoolClass(value) {
        this._schoolClass = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(value) {
        this._createdAt = value;
    }
}

module.exports = Application;
