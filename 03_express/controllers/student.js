const students = require('../models/student')

const {request, response} = require("express");

configureStudents()

exports.get = function(request, response) {
    students.find({}, function(err, all) {
        if (err != null) {
            console.error(err)
            return;
        }

        response.json(all)
    })
}

exports.post = function (request, response) {
    let studentObj = {
        id: Date.now(),
        full_name: request.body.full_name
    }

    const newStudent = new students (studentObj)
    newStudent.save(function (err) {
        if(err != null) {
            console.log(err)
            return err
        }

        response.sendStatus(201)
    })
}

function configureStudents()
{
    students[0] = {
        id: 0,
        full_name: "Vasya Pupkin",
    }
    students[1] = {
        id: 1,
        full_name: "Maksym Tyulyukov",
    }
}