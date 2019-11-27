//calculaint ope rating

export const rating = (academicYear, schoolId) => {
    
    opeReports = OpeReports.find({academicYear:academicYear, schoolId:schoolId}).fetch()

    var totalMathReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalPhysicsReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalChemistryReportType = [0,0,0,0,0,0,0,0,0,0,0];

    var totalBiologyReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalInformaticReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalEnglishReportType = [0,0,0,0,0,0,0,0,0,0,0];

    var totalGeographyReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalKazakh_historyReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalKazakh_langReportType = [0,0,0,0,0,0,0,0,0,0,0];

    var totalTurkish_langReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalRussian_langReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalHuhuk_langReportType = [0,0,0,0,0,0,0,0,0,0,0];

    var totalReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var report11 = 0;
    var report12 = 0;

    var reportIndex = 1;
    _.each(opeReports,(report) => {

      if(reportIndex == 13){
        reportIndex = 1;
        totalReportType = [0,0,0,0,0,0,0,0,0,0,0];
      }

      if(reportIndex < 11){
        totalMathReportType[reportIndex] += parseInt(report.mathematic)
        totalPhysicsReportType[reportIndex] += parseInt(report.physics)
        totalChemistryReportType[reportIndex] += parseInt(report.chemistry)

        totalBiologyReportType[reportIndex] += parseInt(report.biology)
        totalInformaticReportType[reportIndex] += parseInt(report.informatic)
        totalEnglishReportType[reportIndex] += parseInt(report.english)

        totalGeographyReportType[reportIndex] += parseInt(report.geography)
        totalKazakh_historyReportType[reportIndex] += parseInt(report.kazakh_history)
        totalKazakh_langReportType[reportIndex] += parseInt(report.kazakh_lang)

        totalTurkish_langReportType[reportIndex] += parseInt(report.turkish_lang)
        totalRussian_langReportType[reportIndex] += parseInt(report.russian_lang)
        totalHuhuk_langReportType[reportIndex] += parseInt(report.huhuk)

        totalReportType[reportIndex] +=

            totalMathReportType[reportIndex] +
            totalPhysicsReportType[reportIndex] +
            totalChemistryReportType[reportIndex]+

            totalBiologyReportType[reportIndex]+
            totalInformaticReportType[reportIndex]+
            totalEnglishReportType[reportIndex]+

            totalGeographyReportType[reportIndex]+
            totalKazakh_historyReportType[reportIndex]+
            totalKazakh_langReportType[reportIndex]+

            totalTurkish_langReportType[reportIndex]+
            totalRussian_langReportType[reportIndex]+
            totalHuhuk_langReportType[reportIndex];

            /*
      console.log("totalMathReportType[reportIndex]: "+totalMathReportType[reportIndex]);

      console.log("totalMathReportType[reportIndex]: "+totalMathReportType[reportIndex] )
      console.log("totalPhysicsReportType[reportIndex]: "+totalPhysicsReportType[reportIndex] )
      console.log("totalChemistryReportType[reportIndex]: "+totalChemistryReportType[reportIndex])

      console.log("totalBiologyReportType[reportIndex]: "+totalBiologyReportType[reportIndex])
      console.log("totalInformaticReportType[reportIndex]: "+totalInformaticReportType[reportIndex])
      console.log("totalEnglishReportType[reportIndex]: "+totalEnglishReportType[reportIndex])

      console.log("totalGeographyReportType[reportIndex]: "+totalGeographyReportType[reportIndex])
      console.log("totalKazakh_historyReportType[reportIndex]: "+totalKazakh_historyReportType[reportIndex])
      console.log("totalKazakh_langReportType[reportIndex]: "+totalKazakh_langReportType[reportIndex])

      console.log("totalTurkish_langReportType[reportIndex]: "+totalTurkish_langReportType[reportIndex])
      console.log("totalRussian_langReportType[reportIndex]: "+totalRussian_langReportType[reportIndex])
      console.log("totalHuhuk_langReportType[reportIndex]: "+totalHuhuk_langReportType[reportIndex])

      console.log("totalReportType[reportIndex]: "+totalReportType[reportIndex]);
      */

      }else if(reportIndex == 11){
        report11 += parseInt(report.mathematic)

      }else if(reportIndex == 12){
        report12 += parseInt(report.mathematic)
      }

      reportIndex++;

    })

    console.log("11: "+report11);
    console.log("12: "+report12);

    let subjectIdStore = ['01','02','03','04','05','06','07','08','09','10','11','12']

    _.each(subjectIdStore,(sId) => {
        let reportArray = [];
        if(sId == '01'){
            reportArray = totalMathReportType;
        }else if(sId == '02'){
            reportArray = totalPhysicsReportType;
        }else if(sId == '03'){
            reportArray = totalChemistryReportType;
        }else if(sId == '04'){
            reportArray = totalBiologyReportType;
        }else if(sId == '05'){
            reportArray = totalInformaticReportType;
        }else if(sId == '06'){
            reportArray = totalEnglishReportType;
        }else if(sId == '07'){
            reportArray = totalGeographyReportType;
        }else if(sId == '08'){
            reportArray = totalKazakh_historyReportType;
        }else if(sId == '09'){
            reportArray = totalKazakh_langReportType;
        }else if(sId == '10'){
            reportArray = totalTurkish_langReportType;
        }else if(sId == '11'){
            reportArray = totalRussian_langReportType;
        }else if(sId == '12'){
            reportArray = totalHuhuk_langReportType;
        }

        let subjectRating = {
            academicYear:academicYear,
            schoolId: schoolId,
            subjectId: sId,
            reportType1: reportArray[1],
            reportType2: reportArray[2],
            reportType3: reportArray[3],
            reportType4: reportArray[4],
            reportType5: reportArray[5],
            reportType6: reportArray[6],
            reportType7: reportArray[7],
            reportType8: reportArray[8],
            reportType9: reportArray[9],
            reportType10: reportArray[10],
            reportType11: report11,
            reportType12: report12
        }

        var sameSubjectRating = OpeRatings.findOne({
            academicYear: academicYear,
            schoolId: schoolId,
            subjectId: sId
        })

        if (sameSubjectRating) {
            OpeRatings.update({_id:sameSubjectRating._id},{$set:subjectRating})
        } else {
            OpeRatings.insert(subjectRating)
        }

    })


    let allSchoolsRating = {
        academicYear:academicYear,
        schoolId: schoolId,
        subjectId: 'all',
        reportType1: totalReportType[1],
        reportType2: totalReportType[2],
        reportType3: totalReportType[3],
        reportType4: totalReportType[4],
        reportType5: totalReportType[5],
        reportType6: totalReportType[6],
        reportType7: totalReportType[7],
        reportType8: totalReportType[8],
        reportType9: totalReportType[9],
        reportType10: totalReportType[10],
        reportType11: report11,
        reportType12: report12
    }

    var sameAllSchoolsRating = OpeRatings.findOne({
        academicYear: academicYear,
        schoolId: schoolId,
        subjectId: 'all'
    })

    if (sameAllSchoolsRating) {
        OpeRatings.update({_id:sameAllSchoolsRating._id},{$set:allSchoolsRating})
    } else {
        OpeRatings.insert(allSchoolsRating)
    }




            /*
            if(report.reportId == 'reportType1') {
              totalMathReportType[1] += parseInt(report.mathematic)
              totalPhysicsReportType[1] += parseInt(report.physics)
              totalChemistryReportType[1] += parseInt(report.chemistry)

              totalReportType[1] +=
                  totalMathReportType[1] +
                  totalPhysicsReportType[1] +
                  totalChemistryReportType[1];
            }

            if(report.reportId == 'reportType2') {
              totalMathReportType[2] += parseInt(report.mathematic)
              totalPhysicsReportType[2] += parseInt(report.physics)
              totalChemistryReportType[2] += parseInt(report.chemistry)

              totalReportType[2] +=
                  totalMathReportType[2] +
                  totalPhysicsReportType[2] +
                  totalChemistryReportType[2];

            }

            if(report.reportId == 'reportType3') {
              totalMathReportType[3] += parseInt(report.mathematic)
              totalPhysicsReportType[3] += parseInt(report.physics)
              totalChemistryReportType[3] += parseInt(report.chemistry)

              totalReportType[3] +=
                  totalMathReportType[3] +
                  totalPhysicsReportType[3] +
                  totalChemistryReportType[3];
            }
            */

    /*

    // if(report.reportId == 'reportType1') {
    //   totalRating.totalMathReportType1 += parseInt(report.mathematic)
    //   totalRating.totalPhysicsReportType1 += parseInt(report.physics)
    //   totalRating.totalChemistryReportType1 += parseInt(report.chemistry)
    //
    //   totalRating.totalReportType1 +=
    //       totalRating.totalMathReportType1 +
    //       totalRating.totalPhysicsReportType1 +
    //       totalRating.totalPhysicsReportType1;
    // }
    //
    // if(report.reportId == 'reportType2') {
    //   totalRating.totalMathReportType2 += parseInt(report.mathematic)
    //   totalRating.totalPhysicsReportType2 += parseInt(report.physics)
    //   totalRating.totalChemistryReportType2 += parseInt(report.chemistry)
    //
    //   totalRating.totalReportType2 +=
    //       totalRating.totalMathReportType2 +
    //       totalRating.totalPhysicsReportType2 +
    //       totalRating.totalPhysicsReportType2;
    //
    // }
    //
    // if(report.reportId == 'reportType3') {
    //   totalRating.totalMathReportType3 += parseInt(report.mathematic)
    //   totalRating.totalPhysicsReportType3 += parseInt(report.physics)
    //   totalRating.totalChemistryReportType3 += parseInt(report.chemistry)
    //
    //   totalRating.totalReportType3 +=
    //       totalRating.totalMathReportType3 +
    //       totalRating.totalPhysicsReportType3 +
    //       totalRating.totalPhysicsReportType3;
    // }

    function compareNumbers(a, b) {
      return a - b;
    }

    let totalRating = {
        academicYear:academicYear,
        schoolId: schoolId,
        countOfStudents: 0,
        countOfStudentTakingUbt: 0,
        totalInProcent: 0,
        ubt1PassedStudents: 0,
        ubt2PassedStudents: 0,
        ubt3PassedStudents: 0,
        ubt4PassedStudents: 0,
        ubt5PassedStudents: 0,
        ubt6PassedStudents: 0,
        ubt7PassedStudents: 0,
        ubt8PassedStudents: 0,
        ubt9PassedStudents: 0,
        ubt10PassedStudents: 0,
        ubt11PassedStudents: 0,
        ubt12PassedStudents: 0,
        ubt13PassedStudents: 0,
        ubt14PassedStudents: 0,
        ubt15PassedStudents: 0,
        ubt16PassedStudents: 0,
        ubt17PassedStudents: 0,
        ubt18PassedStudents: 0,
        ubt19PassedStudents: 0,
        ubt20PassedStudents: 0,
        ubt21PassedStudents: 0,
        ubt22PassedStudents: 0,
        ubt23PassedStudents: 0,
        ubt24PassedStudents: 0,
        ubt25PassedStudents: 0,
        ubt26PassedStudents: 0,
        ubt27PassedStudents: 0,
        ubt28PassedStudents: 0,
        ubt29PassedStudents: 0,
        ubt30PassedStudents: 0,
        ubt31PassedStudents: 0,
        ubt32PassedStudents: 0,
        median: 0,
        total: 0
    }

    counter = [];

    for (var i = 1; i <= 34; i++) {
            var n = 'ubt' + i;
            totalRating[n] = 0;
            counter.push(0)
        }

    var counterTotal = 0;

    ubtResults = UhdResults.find({academicYear:academicYear, schoolId:schoolId}).fetch()

    totalRating.countOfStudents = Students.find({schoolId:schoolId, grade: '11'}).count()
    totalRating.countOfStudentTakingUbt = ubtResults.length

    var ubtPassedStudentCounters = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    _.each(ubtResults,(result) => {
        for (var i = 1; i <= 34; i++) {
            var n = 'ubt' + i;

            if (parseInt(result[n]) > 0) {
                totalRating[n] += parseInt(result[n]);
                counter[i-1]++;
            }else {
                totalRating[n] += parseInt(result[n]);
            }

        }

        for(var j = 1; j <= 34; j++){
          var ubtNumber = 'ubt'+j;
          if(parseInt(result[ubtNumber]) > 0) ubtPassedStudentCounters[j]++;
        }

    })

    totalRating.ubt1PassedStudents  = ubtPassedStudentCounters[1];
    totalRating.ubt2PassedStudents  = ubtPassedStudentCounters[2];
    totalRating.ubt3PassedStudents  = ubtPassedStudentCounters[3];
    totalRating.ubt4PassedStudents  = ubtPassedStudentCounters[4];
    totalRating.ubt5PassedStudents  = ubtPassedStudentCounters[5];
    totalRating.ubt6PassedStudents  = ubtPassedStudentCounters[6];
    totalRating.ubt7PassedStudents  = ubtPassedStudentCounters[7];
    totalRating.ubt8PassedStudents  = ubtPassedStudentCounters[8];
    totalRating.ubt9PassedStudents  = ubtPassedStudentCounters[9];
    totalRating.ubt10PassedStudents  = ubtPassedStudentCounters[10];
    totalRating.ubt11PassedStudents  = ubtPassedStudentCounters[11];
    totalRating.ubt12PassedStudents  = ubtPassedStudentCounters[12];
    totalRating.ubt13PassedStudents  = ubtPassedStudentCounters[13];
    totalRating.ubt14PassedStudents  = ubtPassedStudentCounters[14];
    totalRating.ubt15PassedStudents  = ubtPassedStudentCounters[15];
    totalRating.ubt16PassedStudents  = ubtPassedStudentCounters[16];
    totalRating.ubt17PassedStudents  = ubtPassedStudentCounters[17];
    totalRating.ubt18PassedStudents  = ubtPassedStudentCounters[18];
    totalRating.ubt19PassedStudents  = ubtPassedStudentCounters[19];
    totalRating.ubt20PassedStudents  = ubtPassedStudentCounters[20];
    totalRating.ubt21PassedStudents  = ubtPassedStudentCounters[21];
    totalRating.ubt22PassedStudents  = ubtPassedStudentCounters[22];
    totalRating.ubt23PassedStudents  = ubtPassedStudentCounters[23];
    totalRating.ubt24PassedStudents  = ubtPassedStudentCounters[24];
    totalRating.ubt25PassedStudents  = ubtPassedStudentCounters[25];
    totalRating.ubt26PassedStudents  = ubtPassedStudentCounters[26];
    totalRating.ubt27PassedStudents  = ubtPassedStudentCounters[27];
    totalRating.ubt28PassedStudents  = ubtPassedStudentCounters[28];
    totalRating.ubt29PassedStudents  = ubtPassedStudentCounters[29];
    totalRating.ubt30PassedStudents  = ubtPassedStudentCounters[30];
    totalRating.ubt31PassedStudents  = ubtPassedStudentCounters[31];
    totalRating.ubt32PassedStudents  = ubtPassedStudentCounters[32];

    console.log("schoolId: "+schoolId);
    console.log("ubt1 count: "+ubtPassedStudentCounters[1]);
    console.log("ubt2 count: "+ubtPassedStudentCounters[2]);
    console.log("ubt3 count: "+ubtPassedStudentCounters[3]);

    var totalOfMediansStore = [];
    var t = 0;
    for (var i = 1; i <= 34; i++) {
        var n = 'ubt' + i;
        var medianName = 'median' + i;
        var medianStore = [];
        var c = 0;

        _.each(ubtResults,(result) => {
            if(result[n] > 0){
              medianStore[c] = result[n];
              c++;
            }
        })

        medianStore.sort(compareNumbers)

        let length = medianStore.length
        let medianRes = 0;

        if(length != 0){
          if(length % 2 == 0){
            medianRes = (parseInt(medianStore[parseInt(length/2)]) + parseInt(medianStore[parseInt(length/2) - 1])) / 2
          }else{
            medianRes = parseInt(medianStore[parseInt(length/2)])
          }
        }

        totalRating[medianName] = medianRes;

        if(medianRes!=0) {
          totalOfMediansStore[t] = medianRes;
          t++;
        }

    }

    totalOfMediansStore.sort(compareNumbers)
    let length = totalOfMediansStore.length

    if(length != 0){
      if(length % 2 == 0){
        totalRating["totalMedian"] = (parseInt(totalOfMediansStore[parseInt(length/2)]) + parseInt(totalOfMediansStore[parseInt(length/2) - 1])) / 2
      }else{
        totalRating["totalMedian"] = parseInt(totalOfMediansStore[parseInt(length/2)])
      }
    }

    // console.log("schoolId: "+schoolId);
    // console.log("median: "+totalRating[medianName]);


    for (var i = 1; i <= 34; i++) {
            var n = 'ubt' + i;

            if (totalRating[n] != 0) {
                totalRating[n] = parseInt((totalRating[n] / counter[i-1]).toFixed(1))

                totalRating.total += parseInt(totalRating[n]);
                counterTotal++;
            }
            else {
                totalRating[n] = 0
            }
    }

    totalRating.total = (totalRating.total / counterTotal).toFixed(1)

    totalRating.total = parseFloat(totalRating.total)
    totalRating.totalInProcent = totalRating.total * 100 / 140;
    totalRating.totalInProcent = parseFloat(totalRating.totalInProcent)

    // insert total rating to db
    var sameSchoolRating = UhdSchoolRatings.findOne({
        schoolId: schoolId,
        academicYear: academicYear
    })

    if (sameSchoolRating) {
        UhdSchoolRatings.update({_id:sameSchoolRating._id},{$set:totalRating})
    } else {
        UhdSchoolRatings.insert(totalRating)
    }

    */
}
