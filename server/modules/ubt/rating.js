export const calculateRating = (academicYear,schoolId) => {

    //calculated ubt rating here
    function compareNumbers(a, b) {
      return a - b;
    }

    let totalRating = {
        academicYear:academicYear,
        schoolId: schoolId,
        countOfStudentTakingUbt: 0,
        totalInProcent: 0,
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

    totalRating.countOfStudentTakingUbt = ubtResults.length

    _.each(ubtResults,(result) => {


        for (var i = 1; i <= 34; i++) {
            var n = 'ubt' + i;

            if (parseInt(result[n]) > 0) {
                totalRating[n] += parseInt(result[n]);
                counter[i-1]++;
            }
            else {
                totalRating[n] += parseInt(result[n]);
            }
        }


    })
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

        // console.log(n);
        // console.log(medianStore);
        medianStore.sort(compareNumbers)
        // console.log("sorted: ");
        // console.log(medianStore);

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
}
