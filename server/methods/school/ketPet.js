import { Meteor } from 'meteor/meteor';
import { upload } from "../../modules/ketPet/upload";
import { calculateRating } from "../../modules/ketPet/calculateRating";
import XLSX from 'xlsx';

Meteor.methods({

	'KetPet.Upload':function(academicYear, grade, examPeriod, results) {

        if (!Roles.userIsInRole(this.userId,"school"))
            throw new Meteor.Error('access-denied', 'Access denied!')


        let school = Schools.findOne({
            userId: this.userId
        })

        if (school) {
            upload(academicYear, school.schoolId, grade, examPeriod,results)
            // calculateRating(academicYear, school.schoolId)
        }
  },
});
Meteor.startup(() => { });
