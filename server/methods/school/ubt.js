import { Meteor } from 'meteor/meteor';
import { upload } from "../../modules/ubt/upload";
import { calculateRating } from "../../modules/ubt/rating";

Meteor.methods({
	/* read the data and return the workbook object to the frontend */
	upload: (bstr, name) => {
		return XLSX.read(bstr, {type:'binary'});
	},
	'UbtResults.Upload':function(academicYear,results) {

        if (!Roles.userIsInRole(this.userId,"school"))
            throw new Meteor.Error('access-denied', 'Access denied!')


        let school = Schools.findOne({
            userId: this.userId
        })

        if (school) {
            upload(academicYear,school.schoolId,results)
            calculateRating(academicYear,school.schoolId)
        }
    }
});

// mongodump -h https://tests.bilik.kz/ --port 21018  -d test --username Mac --password readmore124
Meteor.startup(() => { });
