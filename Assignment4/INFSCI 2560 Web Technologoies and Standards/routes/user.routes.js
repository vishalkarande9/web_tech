/*
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const config = require('../config/index');

module.exports = function (router) {

    router.post("/account/register", function (request, response) {
        const user = new User();

        user.username = request.body.username;
        user.email = request.body.email;

        user.setPassword(request.body.password);

        user.save(function (err) {
            if (!err) {
                response.status(201);
                response.json(user);
            }else{
                response.status(500);
                response.json(err);
            }
        });
    });

    router.post("/account/login", function (request, response) {

        passport.authenticate('local', function (err, user, info) {
            let token;

            // If Passport throws/catches an error
            if (err) {
                response.status(404).json(err);
                return;
            }

            // If a user is found
            if (user) {
                token = user.generateJsonWebToken();
                response.status(200);
                response.json({
                    "token": token
                });
            } else {
                // If user is not found
                response.status(401).json(info);
            }
        })(request, response);
    });

    router.get('/account/courses', config.auth, function (request, response) {

        // If no user ID exists in the JWT return a 401
        if (!request.payload.id) {
            response.status(401).json({
                "message": "Unauthorized"
            });
        } else {
            // Otherwise continue
            User.findById(request.payload.id)
                .exec(function (err, user) {
                    response.status(200).json(user);
                });
        }

    });


    // router.get('/account/profile', config.auth, function (request, response) {
    //
    //     // If no user ID exists in the JWT return a 401
    //     if (!request.payload.id) {
    //         response.status(401).json({
    //             "message": "Unauthorized"
    //         });
    //     } else {
    //         // Otherwise continue
    //         User.findById(request.payload.id)
    //             .exec(function (err, user) {
    //                 response.status(200).json(user);
    //             });
    //     }
    //
    // });


    return router;
};

*/

const express = require("express");
const question=require("./../apis/questions.js");
const course=require("./../apis/courses.js");
const section=require("./../apis/sections.js");
const courseSection=require("./../apis/courseSection.js");

const router = express.Router();

router.get('/course/get',course.get)
router.get('/course/getById',course.getById)
router.post('/course/update',course.update)
router.put('/course/add',course.add)
router.delete('/course/delete',course.remove)



router.get('/section/get',section.get)
router.get('/section/getById',section.getById)
router.post('/section/update',section.update)
router.put('/section/add',section.add)
router.delete('/section/delete',section.remove)

router.get('/question/get',question.get)
router.get('/question/getById',question.getById)
router.post('/question/update',question.update)
router.put('/question/add',question.add)
router.delete('/question/delete',question.remove)

router.get('/getCourseSection/getById',courseSection.getById)


module.exports = router;




