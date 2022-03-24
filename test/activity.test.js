const app = require('../index');
const assert = require("assert");
const {assignNewMochaID} = require("mocha/lib/utils");
const request = require('supertest')(app);

describe('test/activity.test.js', function () {
    const email = 'test@test.com';
    const email1 = 'test@teacher.test.com';
    const email2 = 'test_test@test.com';
    const password = 'test_Password123';
    const password1 = 'test123_password';
    let sid = 'VHA9vIWm8fW9KEPM5kWIJLP8JOp1';
    let tid = 'FLRziHcEL8SzC9rFKJXtFWSMIx83';
    let accessToken = 'example';
    let page = '111';
    let answer = '{answer: \"test demo test \", id: \"test\"}';

    describe('activity test', function () {
        it('should not get answer of student without sid', function (done) {
            request.get('/api/editAnswer')
                .set({
                    page: page
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'student id is required, but not given');
                    done();
                });
        });
        it('should not get answer of student without page', function (done) {
            request.get('/api/editAnswer')
                .set({
                    uid: sid
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'page number is required, but not given');
                    done();
                });
        });
        it('should not get answer of student with incorrect sid', function (done) {
            request.get('/api/editAnswer')
                .set({
                    uid: '12',
                    page: page
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'No such uid, please check!');
                    done();
                });
        });
        it('should not edit answer of student without sid', function (done) {
            request.post('/api/editAnswer/edit')
                .send({
                    answer: answer,
                    page: page,
                    tid: tid
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '"sid" is required');
                    done();
                });
        });
        it('should not edit answer of student without page', function (done) {
            request.post('/api/editAnswer/edit')
                .send({
                    answer: answer,
                    tid: tid,
                    sid: sid
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '"page" is required');
                    done();
                });
        });
        it('should not edit answer of student without answer', function (done) {
            request.post('/api/editAnswer/edit')
                .send({
                    page: page,
                    tid: tid,
                    sid: sid
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '"answer" is required');
                    done();
                });
        });
        it('should not edit answer of student with incorrect type page', function (done) {
            request.post('/api/editAnswer/edit')
                .send({
                    page: 111,
                    answer: answer,
                    tid: tid,
                    sid: sid
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '"page" must be a string');
                    done();
                });
        });
        it('should not edit feedback of student without sid', function (done) {
            request.post('/api/editFeedback')
                .send({
                    feedback: answer,
                    page: page,
                    tid: tid
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '"sid" is required');
                    done();
                });
        });
        it('should not edit feedback of student without tid', function (done) {
            request.post('/api/editFeedback')
                .send({
                    feedback: answer,
                    page: page,
                    sid: sid
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '"tid" is required');
                    done();
                });
        });
        it('should not edit feedback of student without page', function (done) {
            request.post('/api/editFeedback')
                .send({
                    feedback: answer,
                    tid: tid,
                    sid: sid
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '"page" is required');
                    done();
                });
        });
        it('should not edit feedback of student without feedback', function (done) {
            request.post('/api/editFeedback')
                .send({
                    page: page,
                    tid: tid,
                    sid: sid
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '"feedback" is required');
                    done();
                });
        });
        it('should edit answer of student', function (done) {
            request.post('/api/editAnswer/edit')
                .send({
                    answer: answer,
                    page: page,
                    tid: tid,
                    sid: sid
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should edit feedback of student', function (done) {
            request.post('/api/editFeedback')
                .send({
                    feedback: answer,
                    page: page,
                    tid: tid,
                    sid: sid
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should get answer and feedback', function (done) {
            request.get('/api/editAnswer')
                .set({
                    uid: sid,
                    page: page
                })
                .send({
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
    });
});