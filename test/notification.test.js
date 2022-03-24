const app = require('../index');
const assert = require("assert");
const {assignNewMochaID} = require("mocha/lib/utils");
const Joi = require("joi");
const request = require('supertest')(app);

describe('test/notification.test.js', function () {
    const email = 'test@test.com';
    const email1 = 'test@teacher.test.com';
    const email2 = 'test_test@test.com';
    const password = 'test_Password123';
    const password1 = 'test123_password';
    const newPassword = 'test_Password123';
    let sid = 'ZnCdgZXLcAYhCUzcrLOgVZTUgMZ2';
    let tid = 'FLRziHcEL8SzC9rFKJXtFWSMIx83';

    describe('notification test', function () {
        it('should not get notification without uid', function (done) {
            request.get('/api/getNotification')
                .set({})
                .send({})
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, "uid is not defined!")
                    done();
                });
        });
        it('should not get notification with incorrect uid', function (done) {
            request.get('/api/getNotification')
                .set({
                    uid: "12"
                })
                .send({})
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, "No such uid, please check!")
                    done();
                });
        });
        it('should get notification with correct uid', function (done) {
            request.get('/api/getNotification')
                .set({
                    uid: sid
                })
                .send({})
                .expect(200, function (err, res) {
                    done();
                });
        });
    });
});