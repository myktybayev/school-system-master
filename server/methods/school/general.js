import { Meteor } from 'meteor/meteor';

Meteor.methods({
    resetStudentPassword(studentId) {
        //adminRequired()
        let student = Students.findOne({studentId: studentId})
        if (student) {
            Accounts.setPassword(student.userId,'student'+student.studentId)
        }
    }
})