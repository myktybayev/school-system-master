export const calculateRating = (academicYear,schoolId) => {
    
    //calculated ubt rating here

    let totalRating = {
        academicYear:academicYear,
        schoolId: schoolId,
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

    for (var i = 1; i <= 34; i++) {
            var n = 'ubt' + i;

            if (totalRating[n] != 0) {
                totalRating[n] = (totalRating[n] / counter[i-1]).toFixed(2)

                totalRating.total += parseInt(totalRating[n]);
                counterTotal++;
            }
            else {
                totalRating[n] = 0
            }
        }

    totalRating.total = (totalRating.total / counterTotal).toFixed(2)

    totalRating.total = parseFloat(totalRating.total)

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
