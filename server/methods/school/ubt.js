// import { Meteor } from 'meteor/meteor';
// import { upload } from "../../modules/ubt/upload";
// import { calculateRating } from "../../modules/ubt/rating";
//
// const XLSX = require('xlsx');
//
// Meteor.methods({
// 	/* read the data and return the workbook object to the frontend */
// 	upload: (bstr, name) => {
//
// 		return XLSX.read(bstr, {type:'binary'});
//
// 	},
//
// 	download: () => {
//
// 		/* this is the data we ultimately want to save */
// 		const data = [
// 			["studentId", "grade" , "surname", "name","ubt1","ubt2","ubt3","ubt4","ubt5","ubt6","ubt7","ubt8","ubt9","ubt10"],
// 			[ 12345 ,"11A", "Kanatov" ,  "Maulen", 50, 60, 70, 80, 90, 100, 110, 120, 130, 140 ]
// 		];
//
// 		/* follow the README to see how to generate a workbook from the data */
// 		const ws = XLSX.utils.aoa_to_sheet(data);
// 		const wb = {SheetNames: ["Sheet1"], Sheets:{Sheet1:ws }};
//
// 		/* send workbook to client */
// 		return wb;
// 	},
//
// 	'UbtResults.Upload':function(academicYear,results) {
//
//         if (!Roles.userIsInRole(this.userId,"school"))
//             throw new Meteor.Error('access-denied', 'Access denied!')
//
//
//         let school = Schools.findOne({
//             userId: this.userId
//         })
//
//         if (school) {
//             upload(academicYear,school.schoolId,results)
//             calculateRating(academicYear,school.schoolId)
//         }
//     }
// });
// mongodump -h https://tests.bilik.kz/ --port 21018  -d test --username Mac --password readmore124
// Meteor.startup(() => { });
