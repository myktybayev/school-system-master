import { Meteor } from 'meteor/meteor';
import { upload } from "../../modules/ope/upload";
import { rating } from "../../modules/ope/rating";

Meteor.methods({
    "Ope.updateOpeResults": function(student_id, editItem) {

        if(Roles.userIsInRole(this.userId,'school')) {

            let studId = Students.findOne({_id:student_id}).studentId
            let student = OpeResults.findOne({studentId:studId})
            if (student) {
              var count = 0;
              var total = 0;

              for(var i = 1; i < 10; i++){
                if(editItem["ope"+i]){
                  count++
                  total = total + parseInt(editItem["ope"+i])
                }
              }

              let average = total/count;

              OpeResults.update({studentId:studId},
                {$set:{
                  ope1: editItem["ope1"],
                  ope2: editItem["ope2"],
                  average: average

                }})

            }else{

              let student = Students.findOne({_id:student_id})
              let studentName = student.name
              let studentSurname = student.surname
              let schoolId = student.schoolId
              let studentId = student.studentId
              let grade = student.grade
              let olympiad = student.olympiad

              let studentOpeResults = {
                  studentSurname: studentSurname,
                  studentName: studentName,
                  studentId: studentId,
                  schoolId: schoolId,
                  grade: grade,
                  olympiad: olympiad,
                  ope1: editItem["ope1"],
                  ope2: editItem["ope2"],
                  average: undefined
              };
              OpeResults.insert(studentOpeResults)


            }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    'OpeReport.Upload':function(academicYear, reportPeriod, results) {

          if (!Roles.userIsInRole(this.userId,"school"))
              throw new Meteor.Error('access-denied', 'Access denied!')

          let school = Schools.findOne({
              userId: this.userId
          })

          if (school) {
              // upload(academicYear, school.schoolId, reportPeriod, results)
              rating(academicYear, school.schoolId)
          }
    }
})
