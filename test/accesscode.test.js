const app = require('../index');
const assert = require("assert");
const {assignNewMochaID} = require("mocha/lib/utils");
const Joi = require("joi");
const request = require('supertest')(app);

describe('test/accesscode.test.js', function () {
    const email = 'test@test.com';
    const email1 = 'test@teacher.test.com';
    const email2 = 'test_test@test.com';
    const password = 'test_Password123';
    const password1 = 'test123_password';
    const newPassword = 'test_Password123';
    let sid = 'ZnCdgZXLcAYhCUzcrLOgVZTUgMZ2';
    let tid = 'FLRziHcEL8SzC9rFKJXtFWSMIx83';

    describe('access code test', function () {
        it('should get access code ', function (done) {
            request.get('/api/access-code')
                .set({})
                .send({})
                .expect(200, function (err, res) {
                    done();
                });
        });
    });
});