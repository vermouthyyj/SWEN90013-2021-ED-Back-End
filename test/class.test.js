const app = require('../index');
const assert = require("assert");
const {assignNewMochaID} = require("mocha/lib/utils");
const {number} = require("joi");
const request = require('supertest')(app);

describe('test/class.test.js', function () {
    const email = 'test@test.com';
    const email1 = 'test@teacher.test.com';
    const email2 = 'test_test@test.com';
    const password = 'test_Password123';
    const password1 = 'test123_password';
    let sid = 'VHA9vIWm8fW9KEPM5kWIJLP8JOp1';
    let tid = 'FLRziHcEL8SzC9rFKJXtFWSMIx83';
    let accessToken = 'example';

    describe('class test', function () {
        it('should not apply a class with empty sid', function (done) {
            request.post('/api/joinClass')
                .send({
                    sid: '',
                    accessToken: accessToken
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '\"sid\" is not allowed to be empty');
                    done();
                });
        });
        it('should not apply a class with empty accessToken', function (done) {
            request.post('/api/joinClass')
                .send({
                    sid: sid,
                    accessToken: ''
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '\"accessToken\" is not allowed to be empty');
                    done();
                });
        });
        it('should not apply a class with wrong sid', function (done) {
            request.post('/api/joinClass')
                .send({
                    sid: '12',
                    accessToken: accessToken
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'No such student, please check the sid!');
                    done();
                });
        });
        it('should not apply a class with wrong accessToken', function (done) {
            request.post('/api/joinClass')
                .send({
                    sid: sid,
                    accessToken: '12'
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'No such class, please check the accessToken!');
                    done();
                });
        });
        it('should not get a class with empty sid', function (done) {
            request.get('/api/classGet')
                .set({
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'sid is not defined! The student id is not existed.');
                    done();
                });
        });
        it('should not get a class with incorrect sid', function (done) {
            request.get('/api/classGet')
                .set({
                    uid: '12'
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'No such uid, please check!');
                    done();
                });
        });
        it('should not get a class with correct sid but do not join in class', function (done) {
            request.get('/api/classGet')
                .set({
                    uid: sid
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'The student has no class!');
                    done();
                });
        });
        it('should not refuse an application with empty aid', function (done) {
            request.post('/api/class/admin/reject')
                .send({
                    aids: null
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '\"aids\" must be an array');
                    done();
                });
        });
        it('should not refuse an application with incorrect aid', function (done) {
            request.post('/api/class/admin/reject')
                .send({
                    aids: ['123']
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'There is at least one application in the input list that does not exist on the database, error message: FirebaseError: [code=not-found]: 5' +
                        ' NOT_FOUND: No document to update: projects/educationdesign-5bce6/databases/(default)/documents/application/123');
                    done();
                });
        });
        it('should not accept an application with empty aid', function (done) {
            request.post('/api/class/admin/accept')
                .send({
                    aids: null
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '\"aids\" must be an array');
                    done();
                });
        });
        it('should not accept an application with incorrect aid', function (done) {
            request.post('/api/class/admin/accept')
                .send({
                    aids: ['123']
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'There is at least one application in the input list that does not exist on the database, error message: TypeError: Cannot read property \'push\' of undefined');
                    done();
                });
        });
        it('should not remove an application with empty uid', function (done) {
            request.post('/api/class/admin/remove')
                .send({
                    uid: '',
                    cid: accessToken
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '\"uid\" is not allowed to be empty');
                    done();
                });
        });
        it('should not remove an application with empty uid', function (done) {
            request.post('/api/class/admin/remove')
                .send({
                    uid: sid,
                    cid: ''
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '\"cid\" is not allowed to be empty');
                    done();
                });
        });
        it('should not remove an application with incorrect uid', function (done) {
            request.post('/api/class/admin/remove')
                .send({
                    uid: '123',
                    cid: accessToken
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'Failed to remove student with id 123 from class with id example, error message: FirebaseError: [code=invalid-argument]: Can\'t update a document that doesn\'t exist.');
                    done();
                });
        });
        it('should not remove an application with incorrect cid', function (done) {
            request.post('/api/class/admin/remove')
                .send({
                    uid: sid,
                    cid: 'abcd'
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'Failed to remove student with id VHA9vIWm8fW9KEPM5kWIJLP8JOp1 from class with id abcd, error message: TypeError: Cannot read property \'filter\' of undefined');
                    done();
                });
        });
        it('should not get all applications with empty tid', function (done) {
            request.get('/api/classes/applications')
                .set({
                    uid: ''
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'The id of the teacher is required');
                    done();
                });
        });
        it('should not get all applications with incorrect tid', function (done) {
            request.get('/api/classes/applications')
                .set({
                    uid: '123'
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'The uid maybe wrong as there is no record for the given id 123');
                    done();
                });
        });
        it('should get all applications with correct tid', function (done) {
            request.get('/api/classes/applications')
                .set({
                    uid: tid
                })
                .send({
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('teacher should not get all classes with empty tid', function (done) {
            request.get('/api/classes/')
                .set({
                    uid: ''
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'the id of teacher account is required');
                    done();
                });
        });
        it('teacher should not get all classes with incorrect tid', function (done) {
            request.get('/api/classes/')
                .set({
                    uid: '123'
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'The uid maybe wrong as there is no record for the given id 123');
                    done();
                });
        });
        it('should get all classes with correct tid', function (done) {
            request.get('/api/classes/')
                .set({
                    uid: tid
                })
                .send({
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should not get all classes with incorrect order', function (done) {
            request.get('/api/classes/?sorted=asc123&by=name')
                .set({
                    uid: tid
                })
                .send({
                })
                .expect(200, function (err, res) {
                    assert.equal(res.body.message, 'Unrecognised query param for sorted: asc123, classes will be in random order. Valid query params include asc, desc');
                    done();
                });
        });
        it('should not get all classes with incorrect sortBy', function (done) {
            request.get('/api/classes/?sorted=asc&by=name123')
                .set({
                    uid: tid
                })
                .send({
                })
                .expect(200, function (err, res) {
                    assert.equal(res.body.message, 'Unrecognised query param for by: name123, classes will be in random order. Valid query params include name, school, grade');
                    done();
                });
        });
        it('should get all classes with correct sortBy', function (done) {
            request.get('/api/classes/?sorted=asc&by=name')
                .set({
                    uid: tid
                })
                .send({
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should get all classes with correct sortBy', function (done) {
            request.get('/api/classes/?sorted=desc&by=name')
                .set({
                    uid: tid
                })
                .send({
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should get all classes with correct sortBy', function (done) {
            request.get('/api/classes/?sorted=asc&by=school')
                .set({
                    uid: tid
                })
                .send({
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should get all classes with correct sortBy', function (done) {
            request.get('/api/classes/?sorted=desc&by=school')
                .set({
                    uid: tid
                })
                .send({
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should get all classes with correct sortBy', function (done) {
            request.get('/api/classes/?sorted=asc&by=grade')
                .set({
                    uid: tid
                })
                .send({
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should get all classes with correct sortBy', function (done) {
            request.get('/api/classes/?sorted=desc&by=grade')
                .set({
                    uid: tid
                })
                .send({
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it(' should not get class detail with empty cid', function (done) {
            request.get('/api/classes/detail')
                .set({
                    cid: ''
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'the id of the class is required');
                    done();
                });
        });
        it('should not get class detail with incorrect cid', function (done) {
            request.get('/api/classes/detail')
                .set({
                    cid: '123'
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'The cid maybe wrong as there is no record for the given id 123');
                    done();
                });
        });
        it('should get class detail with correct cid', function (done) {
            request.get('/api/classes/detail')
                .set({
                    cid: accessToken
                })
                .send({
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it(' should not get students with empty cid', function (done) {
            request.get('/api/classes/students')
                .set({
                    cid: ''
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'The id of the class is required');
                    done();
                });
        });
        it('should not get students with incorrect cid', function (done) {
            request.get('/api/classes/students')
                .set({
                    cid: '123'
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'The cid maybe wrong as there is no record for the given id 123');
                    done();
                });
        });
        it('should get students with correct cid', function (done) {
            request.get('/api/classes/students')
                .set({
                    cid: accessToken
                })
                .send({
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should apply a class with correct sid and accessToken', function (done) {
            request.post('/api/joinClass')
                .send({
                    sid: sid,
                    accessToken: accessToken
                })
                .expect(200, function (err, res) {
                    assert.equal(res.body.sid, sid);
                    done();
                });
        });
        let aid = ['VHA9vIWm8fW9KEPM5kWIJLP8JOp1'];
        it('should reject an application with correct aid', function (done) {
            request.post('/api/class/admin/reject')
                .send({
                    aid: aid
                })
                .expect(200, function (err, res) {
                    //assert.equal(res.body.sid, sid);
                    done();
                });
        });
        /*it('should apply a class with correct sid and accessToken', function (done) {
            request.post('/api/joinClass')
                .send({
                    sid: sid,
                    accessToken: accessToken
                })
                .expect(200, function (err, res) {
                    assert.equal(res.body.sid, sid);
                    done();
                });
        });*/
        it('should accept an application with correct aid', function (done) {
            request.post('/api/class/admin/accept')
                .send({
                    aid: aid
                })
                .expect(200, function (err, res) {
                    //assert.equal(res.body.sid, sid);
                    done();
                });
        });
        it('should get a class with correct sid', function (done) {
            request.get('/api/classGet')
                .set({
                    uid: sid
                })
                .send({
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should remove a student with correct cid', function (done) {
            request.post('/api/class/admin/remove')
                .send({
                    uid: sid,
                    cid: accessToken
                })
                .expect(400, function (err, res) {
                    done();
                });
        });
        it('should not get a class with correct sid but do not join in class', function (done) {
            request.get('/api/classGet')
                .set({
                    uid: sid
                })
                .send({
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, 'The student has no class!');
                    done();
                });
        });
        it('should not create a class with undefined string', function (done) {
            request.post('/api/createClass')
                .send({
                    name:'',
                    school:'test',
                    grade:'test',
                    teacher: tid,
                    description:'test class'
                })
                .expect(400, function (err, res) {
                    assert.equal(res.body.message, '\"name\" is not allowed to be empty');
                    done();
                });
        });
        it('should not create a class with incorrect information', function (done) {
            request.post('/api/createClass')
                .send({
                    name:'test',
                    school:'test',
                    grade:'test',
                    teacher: '123',
                    description:'test class'
                })
                .expect(404, function (err, res) {
                    assert.equal(res.body.message, '123 is not exist in database.')
                    done();
                });
        });
        /*it('should create a class with correct information', function (done) {
            request.post('/api/createClass')
                .send({
                    name:'test',
                    school:'test',
                    grade:'test',
                    teacher: tid,
                    description:'test class'
                })
                .expect(200, function (err, res) {
                    done();
                });
        });*/
        let cid = 'grspQ39tcwatuk1zqVYl';
        it('should not edit a class with incorrect information', function (done) {
            request.post('/api/editClass')
                .send({
                    name:'Demo',
                    school:'test',
                    grade:'test',
                    teacher: tid,
                    description:'test class'
                })
                .expect(400, function (err, res) {
                    done();
                });
        });
        it('should edit a class with correct information', function (done) {
            request.post('/api/editClass')
                .send({
                    cid: cid
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should edit a class with correct information', function (done) {
            request.post('/api/editClass')
                .send({
                    cid: cid,
                    name:'Demo',
                    school:'test',
                    grade:'test',
                    teacher: tid,
                    description:'test class' + Math.floor(Math.random() * 20).toString()
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
        it('should not delete a class with incorrect information', function (done) {
            request.post('/api/deleteClass')
                .send({
                    cid: cid
                })
                .expect(400, function (err, res) {
                    done();
                });
        });
        it('should not delete a class with incorrect information', function (done) {
            request.post('/api/deleteClass')
                .send({
                    cid: cid,
                    tid: '123'
                })
                .expect(404, function (err, res) {
                    done();
                });
        });
        it('should delete a class with correct information', function (done) {
            request.post('/api/deleteClass')
                .send({
                    cid: cid,
                    teacher: tid
                })
                .expect(200, function (err, res) {
                    done();
                });
        });
    });
});