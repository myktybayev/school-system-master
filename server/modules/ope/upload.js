
export const upload = (academicYear, schoolId, reportPeriod, results) => {


    var index = 1;
    _.each(results,(result) => {

      var reportId = "reportType"+index;
      let opeRecord = {
          academicYear: academicYear,
          schoolId: schoolId,
          reportId: reportId,
          reportPeriod: reportPeriod,
          reportName: result.report_name,
          mathematic: result.mathematic,
          physics: result.physics,
          chemistry: result.chemistry,
          biology: result.biology,
          english: result.english,
          geography: result.geography,
          kazakh_history: result.kazakh_history,
          informatic: result.informatic,
          kazakh_lang: result.kazakh_lang,
          turkish_lang: result.turkish_lang,
          russian_lang: result.russian_lang,
          huhuk: result.huhuk
      }
      index++;

      // OpeReports.insert(opeRecord)

      let recordInDb = OpeReports.findOne({academicYear:academicYear,schoolId:schoolId,reportPeriod:reportPeriod,
        reportName:result.report_name})

      if (recordInDb) {
          OpeReports.update({_id:recordInDb._id},{$set:opeRecord})
      } else {
          OpeReports.insert(opeRecord)
      }

    })
    /*
    _.each(results,(result) => {

        let student = Students.findOne({studentId:parseInt(studentObj.studentId)});


        if (!student || student.schoolId != schoolId){
            return;
        }

        let studentRecord = {
            academicYear: academicYear,
            studentId: student.studentId,
            schoolId: schoolId,
            name: student.name,
            surname: student.surname,
            grade: student.grade + student.division,

            total: 0,
        }

        var totalPoints = 0;
        var totalAmount = 0;

        for (var i = 1; i <= 34; i++) {
            var n = 'ubt' + i;

            studentRecord[n] = studentObj[n] || 0;
            totalPoints += parseInt(studentObj[n] || 0)

            if (studentObj[n]) {
                totalAmount++ ;
            }
        }

        studentRecord.total = (totalPoints / totalAmount || 0).toFixed(2)
        studentRecord.total = parseFloat(studentRecord.total)

        let recordInDb = UhdResults.findOne({academicYear:academicYear,studentId:student.studentId,schoolId:schoolId})

        if (recordInDb) {
            UhdResults.update({_id:recordInDb._id},{$set:studentRecord})
        } else {
            UhdResults.insert(studentRecord)
        }
    })
    */
}
