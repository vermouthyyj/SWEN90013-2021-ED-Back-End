/**
 * @file this file contains the definition for Badge model
 */
class Badge {

    /**
     * return a badge with the defined structure
     * @param bid the badge id in DB
     * @param name the badge name
     * @param content the content of the badge
     * @param img the img source of the badge
     * @param criteria the criteria to get the badge
     */
    constructor(bid, name, content, img, criteria) {
        this._bid = bid;
        this._name = name;
        this._content = content;
        this._img = img;
        this._criteria = criteria;
    }

    get bid() {
        return this._bid;
    }

    set bid(value) {
        this._bid = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }

    get img() {
        return this._img;
    }

    set img(value) {
        this._img = value;
    }

    get criteria() {
        return this._criteria;
    }

    set criteria(value) {
        this._criteria = value;
    }
}

module.exports = Badge;