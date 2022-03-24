const app = require('../index');
const assert = require("assert");
const {assignNewMochaID} = require("mocha/lib/utils");
const Joi = require("joi");
const request = require('supertest')(app);

describe('test/profile.test.js', function () {
    const email = 'test@test.com';
    const email1 = 'test@teacher.test.com';
    const email2 = 'test_test@test.com';
    const password = 'test_Password123';
    const password1 = 'test123_password';
    const newPassword = 'test_Password123';
    let sid = 'ZnCdgZXLcAYhCUzcrLOgVZTUgMZ2';
    let tid = 'FLRziHcEL8SzC9rFKJXtFWSMIx83';

    describe('profile test', function () {
        it('should not get student profile without sid', function (done) {
            request.get('/api/profilestudent')
                .set({})
                .send({})
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'uid is not defined!');
                    done();
                });
        });
        it('should not get student profile with incorrect sid', function (done) {
            request.get('/api/profilestudent')
                .set({
                    uid: "12"
                })
                .send({})
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'No such uid, please check!');
                    done();
                });
        });
        it('should get student profile with correct sid', function (done) {
            request.get('/api/profilestudent')
                .set({
                    uid: sid
                })
                .send({})
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should not get teacher profile without tid', function (done) {
            request.get('/api/profileteacher')
                .set({})
                .send({})
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'uid is not defined!');
                    done();
                });
        });
        it('should not get teacher profile with incorrect tid', function (done) {
            request.get('/api/profileteacher')
                .set({
                    uid: "12"
                })
                .send({})
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'No such uid, please check!');
                    done();
                });
        });
        it('should get teacher profile with correct tid', function (done) {
            request.get('/api/profileteacher')
                .set({
                    uid: tid
                })
                .send({})
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should not edit student profile without sid', function (done) {
            request.post('/api/studentprofileedit')
                .set({})
                .send({
                    firstName: "mary",
                    lastName: "DK",
                    loveActivity: "math",
                    bestFriend: "alice"
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, "\"sid\" is required");
                    done();
                });
        });
        it('should not edit student profile with incorrect sid', function (done) {
            request.post('/api/studentprofileedit')
                .set({})
                .send({
                    sid: "12",
                    firstName: "mary",
                    lastName: "DK",
                    loveActivity: "math",
                    bestFriend: "alice"
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, "12 is not exist in database.");
                    done();
                });
        });
        it('should edit student profile with correct sid', function (done) {
            request.post('/api/studentprofileedit')
                .set({})
                .send({
                    sid: sid,
                    firstName: "mary",
                    lastName: "DK",
                    loveActivity: "math",
                    bestFriend: "alice" + Math.floor(Math.random() * 20).toString()
                })
                .expect(200, function (err, res) {
                    assert.equal(res.body.sid, sid);
                    done();
                });
        });
        it('should not edit teacher profile without tid', function (done) {
            request.post('/api/teacherprofileedit')
                .set({})
                .send({
                    firstName: "tea",
                    lastName: "cher",
                    school: "No.1"
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, "\"tid\" is required");
                    done();
                });
        });
        it('should not edit teacher profile with incorrect tid', function (done) {
            request.post('/api/teacherprofileedit')
                .set({})
                .send({
                    tid: "12",
                    firstName: "tea",
                    lastName: "cher",
                    school: "No.1"
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, "12 is not exist in database.");
                    done();
                });
        });
        it('should edit teacher profile with correct tid', function (done) {
            request.post('/api/teacherprofileedit')
                .set({})
                .send({
                    tid: tid,
                    firstName: "tea",
                    lastName: "cher",
                    school: "No.1" + Math.floor(Math.random() * 20).toString()
                })
                .expect(200, function (err, res) {
                    assert.equal(res.body.tid, tid);
                    done();
                });
        });
        it('should not change password without uid', function (done) {
            request.post('/api/profile/edit/password')
                .set({})
                .send({
                    password: newPassword
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, "uid is required!");
                    done();
                });
        });
        it('should not change password without new password', function (done) {
            request.post('/api/profile/edit/password')
                .set({})
                .send({
                    uid: sid
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, "password is required!");
                    done();
                });
        });
        it('should change password', function (done) {
            request.post('/api/profile/edit/password')
                .set({})
                .send({
                    uid: sid,
                    password: newPassword
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should change password', function (done) {
            request.post('/api/profile/edit/password')
                .set({})
                .send({
                    uid: sid,
                    password: password
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
    });
});