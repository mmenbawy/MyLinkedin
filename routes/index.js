var express = require('express');
var router = express.Router();
var student = require('../model/user');


// Get Homepage
router.get('/', function(req, res) {



    student.find(function(err, students) {

        if (err)
            res.send(err.message);
        else
            res.render('index', {
                students: students,
                errorL: null,
                errorR: null,
                errorsR: null
            });
    })

});

router.get('/viewAll', function(req, res) {



    student.find(function(err, students) {

        if (err)
            res.send(err.message);
        else {

            var totalStudents = students.length,
                pageSize = 10,
                pageCount = (totalStudents / 10) + 1, //round up in js
                currentPage = 1,
                studentsArrays = [],
                studentsList = [];
            console.log(pageCount);

            //split list into groups
            while (students.length > 0) {
                studentsArrays.push(students.splice(0, pageSize));
            }

            //set current page if specifed as get variable (eg: /?page=2)
            if (typeof req.query.page !== 'undefined') {
                currentPage = +req.query.page;
            }

            //show list of students from group
            studentsList = studentsArrays[+currentPage - 1];

            //render index.ejs view file
            res.render('Allportfolio', {
                students: studentsList,
                pageSize: pageSize,
                totalStudents: totalStudents,
                pageCount: pageCount,
                currentPage: currentPage
            });
        }
    });
});


module.exports = router;