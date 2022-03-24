const app = require('../index');
const assert = require("assert");
const request = require('supertest')(app);

describe('test/test.js', function () {
    const email = 'test@test.com';
    const email1 = 'test@teacher.test.com';
    const email2 = 'test_test@test.com';
    const password = 'test_Password123';
    const password1 = 'test123_password';
    const email_student = 'testDemo@test.com';
    const email_teacher = 'testDemo@teacher.test.com';
    let sid;
    let tid;

    describe('sign up test', function () {
        it('should not sign up with empty password', function (done) {
            request.post('/api/signup')
                .send({
                    firstName: 'Test',
                    lastName: 'Demo',
                    email: email,
                    password: '',
                    accessCode: 'test',
                    role: 'student'
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message,'\"password\" is not allowed to be empty');
                    done();
                });
        });
        it('should not sign up with empty email', function (done) {
            request.post('/api/signup')
                .send({
                    firstName: 'Test',
                    lastName: 'Demo',
                    email: '',
                    password: password,
                    accessCode: 'test',
                    role: 'student'
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message,'\"email\" is not allowed to be empty');
                    done();
                });
        });
        it('should not sign up with empty firstName', function (done) {
            request.post('/api/signup')
                .send({
                    firstName: '',
                    lastName: 'Demo',
                    email: email,
                    password: password,
                    accessCode: 'test',
                    role: 'student'
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message,'\"firstName\" is not allowed to be empty');
                    done();
                });
        });
        it('should not sign up with empty lastName', function (done) {
            request.post('/api/signup')
                .send({
                    firstName: 'Test',
                    lastName: '',
                    email: email,
                    password: password,
                    accessCode: 'test',
                    role: 'student'
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message,'\"lastName\" is not allowed to be empty');
                    done();
                });
        });
        it('should not sign up with empty accessCode', function (done) {
            request.post('/api/signup')
                .send({
                    firstName: 'Test',
                    lastName: 'Demo',
                    email: email,
                    password: password,
                    accessCode: '',
                    role: 'student'
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message,'\"accessCode\" is not allowed to be empty');
                    done();
                });
        });
        it('should not sign up with empty role', function (done) {
            request.post('/api/signup')
                .send({
                    firstName: 'Test',
                    lastName: 'Demo',
                    email: email,
                    password: password,
                    accessCode: 'test',
                    role: ''
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message,'\"role\" is not allowed to be empty');
                    done();
                });
        });
        it('should not sign up with invalid role', function (done) {
            request.post('/api/signup')
                .send({
                    firstName: 'Test',
                    lastName: 'Demo',
                    email: email,
                    password: password,
                    accessCode: 'test',
                    role: '1'
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message,'Invalid role provided');
                    done();
                });
        });
        /*it('should sign up an student', function (done) {
            request.post('/api/signup')
                .send({
                    firstName: 'Test',
                    lastName: 'Demo',
                    email: email_student,
                    password: password,
                    accessCode: 'test',
                    role: 'student'
                })
                .expect(200, function (err, res) {
                    assert.notEqual(res.body.code, "auth/email-already-in-use");
                    assert.notEqual(res.body.message, "The email address is already in use by another account.");
                    done();
                });
        });
        it('should sign up an teacher', function (done) {
            request.post('/api/signup')
                .send({
                    firstName: 'Test',
                    lastName: 'Demo',
                    email: email_teacher,
                    password: password,
                    accessCode: 'test',
                    role: 'teacher'
                })
                .expect(200, function (err, res) {
                    assert.notEqual(res.body.code, "auth/email-already-in-use");
                    assert.notEqual(res.body.message, "The email address is already in use by another account.");
                    done();
                });
        });*/
        /*it('should not sign up an student when it is exist', function (done) {
            request.post('/api/signup')
                .send({
                    firstName: 'Test',
                    lastName: 'Demo',
                    email: email,
                    password: password,
                    accessCode: 'test',
                    role: 'student'
                })
                .expect(200, function (err, res) {
                    assert.equal(res.body.code, "auth/email-already-in-use");
                    assert.equal(res.body.message, "The email address is already in use by another account.");
                    done();
                });
        });
        it('should not sign up an teacher when it is exist', function (done) {
            request.post('/api/signup')
                .send({
                    firstName: 'Test',
                    lastName: 'Demo',
                    email: email1,
                    password: password,
                    accessCode: 'test',
                    role: 'teacher'
                })
                .expect(200, function (err, res) {
                    assert.equal(res.body.code, "auth/email-already-in-use");
                    assert.equal(res.body.message, "The email address is already in use by another account.");
                    done();
                });
        });*/
    });

    describe('login test', function() {
        it('should not login with empty email', function (done) {
            request.post('/api/login')
                .send({
                    email: '',
                    password: password
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, "\"email\" is not allowed to be empty");
                    done();
                });
        });
        it('should not login with empty password', function (done) {
            request.post('/api/login')
                .send({
                    email: email,
                    password: ''
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, "\"password\" is not allowed to be empty");
                    done();
                });
        });
        it('should not login with not exist account', function (done) {
            request.post('/api/login')
                .send({
                    email: email2,
                    password: password
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.code, "auth/user-not-found");
                    assert.equal(res.body.message, "There is no user record corresponding to this identifier. The user may have been deleted.");
                    done();
                });
        });
        it('should not login with incorrect password', function (done) {
            request.post('/api/login')
                .send({
                    email: email,
                    password: password1
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.code, "auth/wrong-password");
                    assert.equal(res.body.message, "The password is invalid or the user does not have a password.");
                    done();
                });
        });
        it('should not login with incorrect password', function (done) {
            request.post('/api/login')
                .send({
                    email: email,
                    password: password1
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.code, "auth/wrong-password");
                    assert.equal(res.body.message, "The password is invalid or the user does not have a password.");
                    done();
                });
        });
        it('should login as student with correct password', function (done) {
            request.post('/api/login')
                .send({
                    email: email,
                    password: password
                })
                .expect(200, function (err, res) {
                    assert.equal(res.body.role, "student");
                    done();
                });
        });
        it('should login as teacher with correct password', function (done) {
            request.post('/api/login')
                .send({
                    email: email1,
                    password: password
                })
                .expect(200, function (err, res) {
                    assert.equal(res.body.role, "teacher");
                    done();
                });
        });
    });
});

