import { runInThisContext } from "vm";
// 1 and 2 BTS exams needs to be changed if there are any changes, 3 and 4 were changed
export const calculateRating = (academicYear,btsNo,day, schoolId) => {
    //calculated bts rating here
    let grades = ["7","8","9","10"]
    //let grades = ["9","10"]
    var counter = 0;

    console.log("================================================================");
    console.log("rating");

    let totalRating = {
        academicYear:academicYear,
        btsNo: btsNo,
        schoolId: schoolId,
        grade: "all",
        mathematic: 0,
        mathematicA: 0,
        mathematicB: 0,
        turkish_lang: 0,
        turkish_langA: 0,
        turkish_langB: 0,
        kazakh_history: 0,
        kazakh_historyA: 0,
        kazakh_historyB: 0,
        world_history: 0,
        world_historyA: 0,
        world_historyB: 0,
        geography: 0,
        geographyA: 0,
        geographyB: 0,
        physics: 0,
        physicsA: 0,
        physicsB: 0,
        chemistry: 0,
        chemistryA: 0,
        chemistryB: 0,
        biology: 0,
        biologyA: 0,
        biologyB: 0,
        kazakh_lang: 0,
        kazakh_langA: 0,
        kazakh_langB: 0,
        russian_lang: 0,
        total: 0,
        totalA: 0,
        totalB: 0
    }

    calculateBtsRatingForGrade = (academicYear,btsNo,schoolId,grade) => {

        console.log("calculateBtsRatingForGrade");

        let ratingObj = {
            academicYear:academicYear,
            btsNo: btsNo,
            schoolId: schoolId,
            grade: grade,
            mathematic: 0,
            mathematicA: 0,
            mathematicB: 0,
            turkish_lang: 0,
            turkish_langA: 0,
            turkish_langB: 0,
            kazakh_history: 0,
            kazakh_historyA: 0,
            kazakh_historyB: 0,
            world_history: 0,
            world_historyA: 0,
            world_historyB: 0,
            geography: 0,
            geographyA: 0,
            geographyB: 0,
            physics: 0,
            physicsA: 0,
            physicsB: 0,
            chemistry: 0,
            chemistryA: 0,
            chemistryB: 0,
            biology: 0,
            biologyA: 0,
            biologyB: 0,
            kazakh_lang: 0,
            kazakh_langA: 0,
            kazakh_langB: 0,
            russian_lang: 0,
            total: 0,
            totalA: 0,
            totalB: 0
        }

        let records = BtsResults.find({academicYear:academicYear,btsNo:btsNo,grade:grade,schoolId:schoolId}).fetch()

        let firstDayCounter = 0;
        let secondDayCounter = 0;
        let firstDayTotal = 0;
        let secondDayTotal = 0;

        if (ratingObj.grade == '7'){
            _.each(records,(record) => {
                if (record.day_1_total){

                  console.log("ratingObj.grade == '7'");
                  ratingObj.mathematic += (record.mathematic || 0)
                  ratingObj.mathematicA += (record.mathematicA || 0)
                  ratingObj.mathematicB += (record.mathematicB || 0)

                  if (btsNo == '1' || btsNo == '2'){

                    console.log("ratingObj.grade == '7' btsNo == '1' || btsNo == '2' ");
                    ratingObj.kazakh_lang += (record.kazakh_lang || 0)
                    ratingObj.kazakh_langA += (record.kazakh_langA || 0)
                    ratingObj.kazakh_langB += (record.kazakh_langB || 0)

                    ratingObj.turkish_lang += (record.turkish_lang || 0)
                    ratingObj.turkish_langA += (record.turkish_langA || 0)
                    ratingObj.turkish_langB += (record.turkish_langB || 0)

                    ratingObj.russian_lang += (record.russian_lang || 0)

                  }
                  else if(btsNo == '3'){
                    ratingObj.physics   += (record.physics || 0)
                    ratingObj.physicsA += (record.physicsA || 0)
                    ratingObj.physicsB += (record.physicsB || 0)

                    ratingObj.chemistry += (record.chemistry ||0)
                    ratingObj.chemistryA += (record.chemistryA ||0)
                    ratingObj.chemistryB += (record.chemistryB ||0)

                    ratingObj.biology += (record.biology || 0)
                    ratingObj.biologyA += (record.biologyA || 0)
                    ratingObj.biologyB += (record.biologyB || 0)
                  }

                  firstDayCounter++;
                  firstDayTotal += (record.day_1_total || 0)
                }
            })

        }else if(ratingObj.grade == '8' || ratingObj.grade == '9'){
          console.log("ratingObj.grade == '8' || ratingObj.grade == '9'");
            _.each(records,(record) => {

                if (record.day_1_total) {

                    ratingObj.mathematic += (record.mathematic || 0)
                    ratingObj.mathematicA += (record.mathematicA || 0)
                    ratingObj.mathematicB += (record.mathematicB || 0)

                    ratingObj.kazakh_lang += (record.kazakh_lang || 0)
                    ratingObj.kazakh_langA += (record.kazakh_langA || 0)
                    ratingObj.kazakh_langB += (record.kazakh_langB || 0)

                    ratingObj.turkish_lang += (record.turkish_lang || 0)
                    ratingObj.turkish_langA += (record.turkish_langA || 0)
                    ratingObj.turkish_langB += (record.turkish_langB || 0)

                    ratingObj.kazakh_history += (record.kazakh_history || 0)
                    ratingObj.kazakh_historyA += (record.kazakh_historyA || 0)
                    ratingObj.kazakh_historyB += (record.kazakh_historyB || 0)


                    firstDayCounter++;
                    firstDayTotal += (record.day_1_total || 0)

                }else if (record.day_2_total) {

                    ratingObj.geography += (record.geography || 0)
                    ratingObj.geographyA += (record.geographyA || 0)
                    ratingObj.geographyB += (record.geographyB || 0)

                    ratingObj.physics   += (record.physics || 0)
                    ratingObj.physicsA += (record.physicsA || 0)
                    ratingObj.physicsB += (record.physicsB || 0)

                    ratingObj.chemistry += (record.chemistry ||0)
                    ratingObj.chemistryA += (record.chemistryA ||0)
                    ratingObj.chemistryB += (record.chemistryB ||0)

                    ratingObj.biology += (record.biology || 0)
                    ratingObj.biologyA += (record.biologyA || 0)
                    ratingObj.biologyB += (record.biologyB || 0)

                    secondDayCounter++;
                    secondDayTotal += (record.day_2_total || 0)

                }

              })
        }
        else if (ratingObj.grade == '10') {
          console.log("ratingObj.grade == '10'");
          _.each(records,(record) => {

              if (record.day_1_total) {

                  ratingObj.mathematic += (record.mathematic || 0)
                  ratingObj.mathematicA += (record.mathematicA || 0)
                  ratingObj.mathematicB += (record.mathematicB || 0)

                  ratingObj.kazakh_lang += (record.kazakh_lang || 0)
                  ratingObj.kazakh_langA += (record.kazakh_langA || 0)
                  ratingObj.kazakh_langB += (record.kazakh_langB || 0)

                  ratingObj.kazakh_history += (record.kazakh_history || 0)
                  ratingObj.kazakh_historyA += (record.kazakh_historyA || 0)
                  ratingObj.kazakh_historyB += (record.kazakh_historyB || 0)

                  if(record.electiveGroup == "01"){

                    ratingObj.geography += (record.geography || 0)
                    ratingObj.geographyA += (record.geographyA || 0)
                    ratingObj.geographyB += (record.geographyB || 0)

                    ratingObj.physics   += (record.physics || 0)
                    ratingObj.physicsA += (record.physicsA || 0)
                    ratingObj.physicsB += (record.physicsB || 0)

                  }else if(record.electiveGroup == "02"){

                    console.log("record.electiveGroup == '02'");

                    ratingObj.geography += (record.geography || 0)
                    ratingObj.geographyA += (record.geographyA || 0)
                    ratingObj.geographyB += (record.geographyB || 0)

                    ratingObj.chemistry += (record.chemistry ||0)
                    ratingObj.chemistryA += (record.chemistryA ||0)
                    ratingObj.chemistryB += (record.chemistryB ||0)

                  }else if(record.electiveGroup == "03"){

                    ratingObj.geography += (record.geography || 0)
                    ratingObj.geographyA += (record.geographyA || 0)
                    ratingObj.geographyB += (record.geographyB || 0)

                    ratingObj.biology += (record.biology || 0)
                    ratingObj.biologyA += (record.biologyA || 0)
                    ratingObj.biologyB += (record.biologyB || 0)

                  }else if(record.electiveGroup == "04"){

                    ratingObj.physics   += (record.physics || 0)
                    ratingObj.physicsA += (record.physicsA || 0)
                    ratingObj.physicsB += (record.physicsB || 0)

                    ratingObj.chemistry += (record.chemistry ||0)
                    ratingObj.chemistryA += (record.chemistryA ||0)
                    ratingObj.chemistryB += (record.chemistryB ||0)
                  }else if(record.electiveGroup == "05"){

                    ratingObj.physics   += (record.physics || 0)
                    ratingObj.physicsA += (record.physicsA || 0)
                    ratingObj.physicsB += (record.physicsB || 0)

                    ratingObj.biology += (record.biology || 0)
                    ratingObj.biologyA += (record.biologyA || 0)
                    ratingObj.biologyB += (record.biologyB || 0)

                  }else if(record.electiveGroup == "06"){
                    ratingObj.chemistry += (record.chemistry ||0)
                    ratingObj.chemistryA += (record.chemistryA ||0)
                    ratingObj.chemistryB += (record.chemistryB ||0)

                    ratingObj.biology += (record.biology || 0)
                    ratingObj.biologyA += (record.biologyA || 0)
                    ratingObj.biologyB += (record.biologyB || 0)

                  }else if(record.electiveGroup == "07"){
                    ratingObj.geography += (record.geography || 0)
                    ratingObj.geographyA += (record.geographyA || 0)
                    ratingObj.geographyB += (record.geographyB || 0)

                    ratingObj.world_history += (record.biology || 0)
                    ratingObj.world_historyA += (record.world_historyA || 0)
                    ratingObj.world_historyB += (record.world_historyB || 0)
                  }

                  firstDayCounter++;
                  firstDayTotal += (record.day_1_total || 0)

              }
            })
        }

        if (ratingObj.grade == '7'){
            if (firstDayCounter != 0) {

              console.log("ratingObj.grade == '7' firstDayCounter != 0 ");
              ratingObj.mathematic = (ratingObj.mathematic / firstDayCounter)
              ratingObj.mathematicA = (ratingObj.mathematicA / firstDayCounter)
              ratingObj.mathematicB = (ratingObj.mathematicB / firstDayCounter)

                if(btsNo == '1' || btsNo == '2'){

                  console.log("ratingObj.grade == '7' firstDayCounter != 0 btsNo == '1' || btsNo == '2'");
                  ratingObj.kazakh_lang = (ratingObj.kazakh_lang / firstDayCounter)
                  ratingObj.kazakh_langA = (ratingObj.kazakh_langA / firstDayCounter)
                  ratingObj.kazakh_langB = (ratingObj.kazakh_langB / firstDayCounter)

                  ratingObj.turkish_lang = (ratingObj.turkish_lang / firstDayCounter)
                  ratingObj.turkish_langA = (ratingObj.turkish_langA / firstDayCounter)
                  ratingObj.turkish_langB = (ratingObj.turkish_langB / firstDayCounter)

                  ratingObj.russian_lang = (ratingObj.russian_lang / firstDayCounter)

                }else if(btsNo == '3'){

                  ratingObj.physics   += (ratingObj.physics / firstDayCounter)
                  ratingObj.physicsA += (ratingObj.physicsA / firstDayCounter)
                  ratingObj.physicsB += (ratingObj.physicsB / firstDayCounter)

                  ratingObj.chemistry += (ratingObj.chemistry / firstDayCounter)
                  ratingObj.chemistryA += (ratingObj.chemistryA / firstDayCounter)
                  ratingObj.chemistryB += (ratingObj.chemistryB / firstDayCounter)

                  ratingObj.biology += (ratingObj.biology / firstDayCounter)
                  ratingObj.biologyA += (ratingObj.biologyA / firstDayCounter)
                  ratingObj.biologyB += (ratingObj.biologyB / firstDayCounter)

                }

                ratingObj.total += firstDayTotal/firstDayCounter
            }
        }else if(ratingObj.grade == '8' || ratingObj.grade == '9'){
            if (firstDayCounter != 0) {
                console.log("ratingObj.grade == '8' || ratingObj.grade == '9' firstDayCounter != 0");
                ratingObj.mathematic = (ratingObj.mathematic / firstDayCounter)
                ratingObj.mathematicA = (ratingObj.mathematicA / firstDayCounter)
                ratingObj.mathematicB = (ratingObj.mathematicB / firstDayCounter)
                ratingObj.kazakh_lang = (ratingObj.kazakh_lang / firstDayCounter)
                ratingObj.kazakh_langA = (ratingObj.kazakh_langA / firstDayCounter)
                ratingObj.kazakh_langB = (ratingObj.kazakh_langB / firstDayCounter)
                ratingObj.turkish_lang = (ratingObj.turkish_lang / firstDayCounter)
                ratingObj.turkish_langA = (ratingObj.turkish_langA / firstDayCounter)
                ratingObj.turkish_langB = (ratingObj.turkish_langB / firstDayCounter)
                ratingObj.kazakh_history = (ratingObj.kazakh_history / firstDayCounter)
                ratingObj.kazakh_historyA = (ratingObj.kazakh_historyA / firstDayCounter)
                ratingObj.kazakh_historyB = (ratingObj.kazakh_historyB / firstDayCounter)

                ratingObj.total += firstDayTotal/firstDayCounter

            }
            else if (secondDayCounter != 0) {
                  ratingObj.geography = (ratingObj.geography / secondDayCounter)
                  ratingObj.geographyA = (ratingObj.geographyA / secondDayCounter)
                  ratingObj.geographyB = (ratingObj.geographyB / secondDayCounter)

                  ratingObj.physics   += (ratingObj.physics / secondDayCounter)
                  ratingObj.physicsA += (ratingObj.physicsA / secondDayCounter)
                  ratingObj.physicsB += (ratingObj.physicsB / secondDayCounter)

                  ratingObj.chemistry = (ratingObj.chemistry / secondDayCounter)
                  ratingObj.chemistryA = (ratingObj.chemistryA / secondDayCounter)
                  ratingObj.chemistryB = (ratingObj.chemistryB / secondDayCounter)

                  ratingObj.biology = (ratingObj.biology / secondDayCounter)
                  ratingObj.biologyA = (ratingObj.biologyA / secondDayCounter)
                  ratingObj.biologyB = (ratingObj.biologyB / secondDayCounter)

                  ratingObj.total += secondDayTotal/secondDayCounter
            }
        }else if(ratingObj.grade == '10'){
          if (firstDayCounter != 0) {

              console.log("ratingObj.grade == '10' firstDayCounter != 0");
              ratingObj.mathematic = (ratingObj.mathematic / firstDayCounter)
              ratingObj.mathematicA = (ratingObj.mathematicA / firstDayCounter)
              ratingObj.mathematicB = (ratingObj.mathematicB / firstDayCounter)
              ratingObj.kazakh_lang = (ratingObj.kazakh_lang / firstDayCounter)
              ratingObj.kazakh_langA = (ratingObj.kazakh_langA / firstDayCounter)
              ratingObj.kazakh_langB = (ratingObj.kazakh_langB / firstDayCounter)
              ratingObj.kazakh_history = (ratingObj.kazakh_history / firstDayCounter)
              ratingObj.kazakh_historyA = (ratingObj.kazakh_historyA / firstDayCounter)
              ratingObj.kazakh_historyB = (ratingObj.kazakh_historyB / firstDayCounter)

              ratingObj.geography = (ratingObj.geography / firstDayCounter)
              ratingObj.geographyA = (ratingObj.geographyA / firstDayCounter)
              ratingObj.geographyB = (ratingObj.geographyB / firstDayCounter)

              ratingObj.physics   += (ratingObj.physics / firstDayCounter)
              ratingObj.physicsA += (ratingObj.physicsA / firstDayCounter)
              ratingObj.physicsB += (ratingObj.physicsB / firstDayCounter)

              ratingObj.chemistry = (ratingObj.chemistry / firstDayCounter)
              ratingObj.chemistryA = (ratingObj.chemistryA / firstDayCounter)
              ratingObj.chemistryB = (ratingObj.chemistryB / firstDayCounter)

              ratingObj.biology = (ratingObj.biology / firstDayCounter)
              ratingObj.biologyA = (ratingObj.biologyA / firstDayCounter)
              ratingObj.biologyB = (ratingObj.biologyB / firstDayCounter)

              ratingObj.world_history = (ratingObj.world_history / firstDayCounter)
              ratingObj.world_historyA = (ratingObj.world_historyA / firstDayCounter)
              ratingObj.world_historyB = (ratingObj.world_historyB / firstDayCounter)

              ratingObj.total += firstDayTotal/firstDayCounter

          }
        }

        // insert rating to db
        var sameRating = BtsRatings.findOne({
            btsNo: btsNo,
            academicYear: academicYear,
            schoolId: schoolId,
            grade: grade
        })
        if (!sameRating){
            BtsRatings.insert(ratingObj)
          }
        else {
            BtsRatings.update({_id:sameRating._id}, {
                $set: ratingObj
            })
        }

        return ratingObj
    }

    _.each(grades,(grade) => {
        let gradeRating = calculateBtsRatingForGrade(academicYear,btsNo,schoolId,grade)

        // counter = 0;
        if (grade == gradeRating.grade && gradeRating.total > 0) {
            counter++;
        }

        if(grade == '7'){
            if(btsNo == '1' || btsNo == '2'){

                console.log("rating grade 7 btsNo == '1' || btsNo == '2' ");
                totalRating.mathematic += (gradeRating.mathematic || 0)
                totalRating.mathematicA += (gradeRating.mathematicA || 0)
                totalRating.mathematicB += (gradeRating.mathematicB || 0)

                totalRating.kazakh_lang += (gradeRating.kazakh_lang || 0)
                totalRating.kazakh_langA += (gradeRating.kazakh_langA || 0)
                totalRating.kazakh_langB += (gradeRating.kazakh_langB || 0)


                totalRating.turkish_lang += (gradeRating.turkish_lang || 0)
                totalRating.turkish_langA += (gradeRating.turkish_langA || 0)
                totalRating.turkish_langB += (gradeRating.turkish_langB || 0)
                console.log("grade 7 totalRating.turkish_lang: "+totalRating.turkish_lang );

                totalRating.russian_lang += (gradeRating.russian_lang || 0)

                totalRating.total += (gradeRating.total || 0)
                totalRating.totalA += (gradeRating.totalA || 0)
                totalRating.totalB += (gradeRating.totalB || 0)
            }else if(btsNo == '3'){

                totalRating.mathematic += (gradeRating.mathematic || 0)
                totalRating.mathematicA += (gradeRating.mathematicA || 0)
                totalRating.mathematicB += (gradeRating.mathematicB || 0)

                totalRating.physics += (gradeRating.physics || 0)
                totalRating.physicsA += (gradeRating.physicsA || 0)
                totalRating.physicsB += (gradeRating.physicsB || 0)

                totalRating.chemistry += (gradeRating.chemistry || 0)
                totalRating.chemistryA += (gradeRating.chemistryA || 0)
                totalRating.chemistryB += (gradeRating.chemistryB || 0)

                totalRating.biology += (gradeRating.biology || 0)
                totalRating.biologyA += (gradeRating.biologyA || 0)
                totalRating.biologyB += (gradeRating.biologyB || 0)

                totalRating.total += (gradeRating.total || 0)
                totalRating.totalA += (gradeRating.totalA || 0)
                totalRating.totalB += (gradeRating.totalB || 0)
            }
        }
        else if(grade == '8' || grade == '9'){
            if(day == '1'){

                console.log("rating grade 8 or 9 btsNo == '1'");
                totalRating.mathematic += (gradeRating.mathematic || 0)
                totalRating.mathematicA += (gradeRating.mathematicA || 0)
                totalRating.mathematicB += (gradeRating.mathematicB || 0)

                totalRating.kazakh_lang += (gradeRating.kazakh_lang || 0)
                totalRating.kazakh_langA += (gradeRating.kazakh_langA || 0)
                totalRating.kazakh_langB += (gradeRating.kazakh_langB || 0)

                totalRating.turkish_lang += (gradeRating.turkish_lang || 0)
                totalRating.turkish_langA += (gradeRating.turkish_langA || 0)
                totalRating.turkish_langB += (gradeRating.turkish_langB || 0)

                console.log("grade 8 or 9 totalRating.turkish_lang: "+totalRating.turkish_lang );
                totalRating.kazakh_history += (gradeRating.kazakh_history || 0)
                totalRating.kazakh_historyA += (gradeRating.kazakh_historyA || 0)
                totalRating.kazakh_historyB += (gradeRating.kazakh_historyB || 0)

                totalRating.total += (gradeRating.total || 0)
                totalRating.totalA += (gradeRating.totalA || 0)
                totalRating.totalB += (gradeRating.totalB || 0)
            }
            if(day == '2'){
              totalRating.geography += (gradeRating.geography || 0)
              totalRating.geographyA += (gradeRating.geographyA || 0)
              totalRating.geographyB += (gradeRating.geographyB || 0)

              totalRating.physics += (gradeRating.physics || 0)
              totalRating.physicsA += (gradeRating.physicsA || 0)
              totalRating.physicsB += (gradeRating.physicsB || 0)

              totalRating.chemistry += (gradeRating.chemistry || 0)
              totalRating.chemistryA += (gradeRating.chemistryA || 0)
              totalRating.chemistryB += (gradeRating.chemistryB || 0)

              totalRating.biology += (gradeRating.biology || 0)
              totalRating.biologyA += (gradeRating.biologyA || 0)
              totalRating.biologyB += (gradeRating.biologyB || 0)

              totalRating.total += (gradeRating.total || 0)
              totalRating.totalA += (gradeRating.totalA || 0)
              totalRating.totalB += (gradeRating.totalB || 0)
            }

        }else if(grade == '10'){
          console.log("rating grade 10");
          totalRating.mathematic += (gradeRating.mathematic || 0)
          totalRating.mathematicA += (gradeRating.mathematicA || 0)
          totalRating.mathematicB += (gradeRating.mathematicB || 0)

          totalRating.kazakh_lang += (gradeRating.kazakh_lang || 0)
          totalRating.kazakh_langA += (gradeRating.kazakh_langA || 0)
          totalRating.kazakh_langB += (gradeRating.kazakh_langB || 0)

          totalRating.kazakh_history += (gradeRating.kazakh_history || 0)
          totalRating.kazakh_historyA += (gradeRating.kazakh_historyA || 0)
          totalRating.kazakh_historyB += (gradeRating.kazakh_historyB || 0)

          totalRating.geography += (gradeRating.geography || 0)
          totalRating.geographyA += (gradeRating.geographyA || 0)
          totalRating.geographyB += (gradeRating.geographyB || 0)

          totalRating.physics += (gradeRating.physics || 0)
          totalRating.physicsA += (gradeRating.physicsA || 0)
          totalRating.physicsB += (gradeRating.physicsB || 0)

          console.log("grade 10 totalRating.physics: "+totalRating.physics );
          console.log("grade 10 totalRating.geography: "+totalRating.geography );

          totalRating.chemistry += (gradeRating.chemistry || 0)
          totalRating.chemistryA += (gradeRating.chemistryA || 0)
          totalRating.chemistryB += (gradeRating.chemistryB || 0)

          totalRating.biology += (gradeRating.biology || 0)
          totalRating.biologyA += (gradeRating.biologyA || 0)
          totalRating.biologyB += (gradeRating.biologyB || 0)

          totalRating.world_history += (gradeRating.biology || 0)
          totalRating.world_historyA += (gradeRating.world_historyA || 0)
          totalRating.world_historyB += (gradeRating.world_historyB || 0)

          totalRating.total += (gradeRating.total || 0)
          totalRating.totalA += (gradeRating.totalA || 0)
          totalRating.totalB += (gradeRating.totalB || 0)


        }

    })

    totalRating.mathematic += totalRating.mathematic / (counter || 1)
    totalRating.mathematicA += totalRating.mathematicA / (counter || 1)
    totalRating.mathematicB += totalRating.mathematicB / (counter || 1)

    totalRating.kazakh_lang += totalRating.kazakh_lang / (counter || 1)
    totalRating.kazakh_langA += totalRating.kazakh_langA / (counter || 1)
    totalRating.kazakh_langB += totalRating.kazakh_langB / (counter || 1)

    totalRating.kazakh_history += totalRating.kazakh_history / (counter || 1)
    totalRating.kazakh_historyA += totalRating.kazakh_historyA / (counter || 1)
    totalRating.kazakh_historyB += totalRating.kazakh_historyB / (counter || 1)

    console.log("totalRating.turkish_lang / (counter || 1): "+totalRating.turkish_lang);
    console.log("counter: "+counter);

    totalRating.turkish_lang += totalRating.turkish_lang / (counter || 1)
    totalRating.turkish_langA += totalRating.turkish_langA / (counter || 1)
    totalRating.turkish_langB += totalRating.turkish_langB / (counter || 1)
    // console.log("totalRating.turkish_lang / (counter || 1): "+totalRating.turkish_lang);

    totalRating.russian_lang += totalRating.russian_lang / (counter || 1)

    totalRating.geography += totalRating.geography / (counter || 1)
    totalRating.geographyA += totalRating.geographyA / (counter || 1)
    totalRating.geographyB += totalRating.geographyB / (counter || 1)

    totalRating.physics += totalRating.physics / (counter || 1)
    totalRating.physicsA += totalRating.physicsA / (counter || 1)
    totalRating.physicsB += totalRating.physicsB / (counter || 1)

    totalRating.chemistry += totalRating.chemistry / (counter || 1)
    totalRating.chemistryA += totalRating.chemistryA / (counter || 1)
    totalRating.chemistryB += totalRating.chemistryB / (counter || 1)

    totalRating.biology += totalRating.biology / (counter || 1)
    totalRating.biologyA += totalRating.biologyA / (counter || 1)
    totalRating.biologyB += totalRating.biologyB / (counter || 1)

    totalRating.world_history += totalRating.world_history / (counter || 1)
    totalRating.world_historyA += totalRating.world_historyA / (counter || 1)
    totalRating.world_historyB += totalRating.world_historyB / (counter || 1)

    totalRating.total = totalRating.total / (counter || 1)
    totalRating.totalA = totalRating.totalA / (counter || 1)
    totalRating.totalB = totalRating.totalB / (counter || 1)

    // insert total rating to db
    var sameSchoolRating = BtsRatings.findOne({
        btsNo: btsNo,
        schoolId: schoolId,
        academicYear: academicYear,
        grade: 'all'
    })

    if (sameSchoolRating) {
        BtsRatings.update({_id:sameSchoolRating._id},{$set:totalRating})
    } else {
        BtsRatings.insert(totalRating)
        console.log("BtsRatings.insert(totalRating): "+totalRating);
    }

    console.log("================================================================");
}
