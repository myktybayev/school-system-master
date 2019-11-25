import { runInThisContext } from "vm";

/*
  7 grade: total 80
  8 grade: total 160
  9 grade: total 160
  10 grade: total 100
*/

export const calcTotalRating = (academicYear, schoolId, btsNo) => {
    console.log('======================================================');
    let grades= ["7","8","9","10"]
    let pointsDict = {
      "7": 80,
      "8": 160,
      "9": 160,
      "10": 100,
    }

    let grade7AveAndStudentCount = []
    let grade8AveAndStudentCount = []
    let grade9AveAndStudentCount = []
    let grade10AveAndStudentCount = []

    let totalOfSchool = 0;

    _.each(grades,(grade) => {

      let records = BtsResults.find({academicYear:academicYear, schoolId: schoolId, grade: grade}).fetch()
      let totalPoint = pointsDict[grade];
      let sumOfPoints = 0;
      let countOfStudents = records.length;

      _.each(records,(record) => {
          sumOfPoints += record.total
      })

      // let res = sumOfPoints * 100 / (totalPoint * countOfStudents)
      let res = sumOfPoints * 100 / (totalPoint * countOfStudents)
      totalOfSchool += res;

      if(grade == '7'){
        grade7AveAndStudentCount[0] = countOfStudents
        grade7AveAndStudentCount[1] = res
      }else if(grade == '8'){
        grade8AveAndStudentCount[0] = countOfStudents
        grade8AveAndStudentCount[1] = res
      }else if(grade == '9'){
        grade9AveAndStudentCount[0] = countOfStudents
        grade9AveAndStudentCount[1] = res
      }else if(grade == '10'){
        grade10AveAndStudentCount[0] = countOfStudents
        grade10AveAndStudentCount[1] = res
      }

      // console.log("grade: "+grade);
      // console.log("sumOfPoints: "+sumOfPoints);
      // console.log("countOfStudents: "+countOfStudents);
      // console.log("res: "+res);

      var totalRatingObj = {
          academicYear:academicYear,
          btsNo: btsNo,
          schoolId: schoolId,
          grade: grade,
          total: res
      }

      var sameRating = BtsRatings.findOne({
          academicYear: academicYear,
          schoolId: schoolId,
          btsNo: btsNo,
          grade: grade
      })

      if (!sameRating){
          BtsRatings.insert(ratingObj)
      }else {
          BtsRatings.update({_id:sameRating._id}, {$set: totalRatingObj})
      }

    })

    console.log("schoolId: "+schoolId);
    console.log("grade 7: ");
    console.log(grade7AveAndStudentCount);
    console.log("grade 8: ");
    console.log(grade8AveAndStudentCount);
    console.log("grade 9: ");
    console.log(grade9AveAndStudentCount);
    console.log("grade 10: ");
    console.log(grade10AveAndStudentCount);

    let allStudentsCount = grade7AveAndStudentCount[0] + grade8AveAndStudentCount[0] + grade9AveAndStudentCount[0] + grade10AveAndStudentCount[0]
    let sumOfPoint = grade7AveAndStudentCount[0]*grade7AveAndStudentCount[1]+
                    grade8AveAndStudentCount[0]*grade8AveAndStudentCount[1]+
                    grade9AveAndStudentCount[0]*grade9AveAndStudentCount[1]+
                    grade10AveAndStudentCount[0]*grade10AveAndStudentCount[1];

                    
    let totalOfSchool2 = sumOfPoint / allStudentsCount;

    console.log("allStudentsCount: "+allStudentsCount);
    console.log("sumOfPoint: "+sumOfPoint);
    console.log("totalOfSchool2: "+totalOfSchool2);

    totalOfSchool = totalOfSchool / 4;

    var totalRatingObj = {
        academicYear:academicYear,
        btsNo: btsNo,
        schoolId: schoolId,
        grade: "all",
        total: totalOfSchool2
    }

    var sameRating = BtsRatings.findOne({
        academicYear: academicYear,
        schoolId: schoolId,
        btsNo: btsNo,
        grade: "all"
    })

    if (!sameRating){
        BtsRatings.insert(ratingObj)
    }else {
        BtsRatings.update({_id:sameRating._id}, {$set: totalRatingObj})
    }
}


    // console.log("mathTotal: "+mathTotal);
    // // let mathTotalProcent = 100 * mathTotal / (mathCount * 20);
    // let mathTotalProcent = mathTotal / mathCount;
    // console.log("mathTotalProcent: "+mathTotalProcent);
    //
    // console.log("turkishCount: "+turkishCount);
    // console.log("turkishTotal: "+turkishTotal);
    // // let tTotalProcent = 100 * turkishTotal / (turkishCount * 20);
    // let tTotalProcent = turkishTotal / turkishCount;
    // console.log("tTotalProcent: "+tTotalProcent);
    //
    // console.log("russianCount: "+russianCount);
    // console.log("russianTotal: "+russianTotal);
    // // let rTotalProcent = 100 * russianTotal / (russianCount * 20);
    // let rTotalProcent = russianTotal / russianCount;
