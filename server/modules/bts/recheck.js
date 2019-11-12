import { parseAnswerKey} from "../multipleChoiceChecker";
import {parseLevelKey} from "../multipleChoiceChecker"
import { check } from "../multipleChoiceChecker";
import { checkA } from "../multipleChoiceChecker";
import { checkB } from "../multipleChoiceChecker";
import { checkC } from "../multipleChoiceChecker";
import { calculateRating } from "./rating";

export const recheck = (academicYear,btsNo,variant,day) => {

    let answerKey = BtsAnswerKeys.findOne({academicYear:academicYear,quarter:btsNo,variant:variant});
    let levelKey = BtsLevels.findOne({academicYear:academicYear,quarter:btsNo,variant:variant});

    if (answerKey.grade == '7') {
        let results = BtsResults.find({academicYear:academicYear,btsNo:btsNo,variant_day_1:variant}).fetch()

        if (btsNo == '1' || btsNo == '2'){

            _.each(results,(result) => {
                result["mathematic"] = check(parseAnswerKey(answerKey.mathematic), result.day_1_keys.slice(0,100));
                result["mathematicA"] = checkA(parseAnswerKey(answerKey.mathematic), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.mathematic));
                result["mathematicB"] = checkB(parseAnswerKey(answerKey.mathematic), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.mathematic));

                result["kazakh_lang"] = check(parseAnswerKey(answerKey.kazakh_lang),result.day_1_keys.slice(100,200))
                result["kazakh_langA"] = checkA(parseAnswerKey(answerKey.kazakh_lang),result.day_1_keys.slice(100,200),parseLevelKey(levelKey.kazakh_lang))
                result["kazakh_langB"] = checkB(parseAnswerKey(answerKey.kazakh_lang),result.day_1_keys.slice(100,200),parseLevelKey(levelKey.kazakh_lang))

                result["russian_lang"] = check(parseAnswerKey(answerKey.russian_lang), result.day_1_keys.slice(200,300))

                result["turkish_lang"] = check(parseAnswerKey(answerKey.turkish_lang),result.day_1_keys.slice(300,400))
                result["turkish_langA"] = checkA(parseAnswerKey(answerKey.turkish_lang),result.day_1_keys.slice(300,400),parseLevelKey(levelKey.turkish_lang))
                result["turkish_langB"] = checkB(parseAnswerKey(answerKey.turkish_lang),result.day_1_keys.slice(300,400),parseLevelKey(levelKey.turkish_lang))

                result["day_1_total"] = 0;
                result["total"] = 0;
                result["day_1_total"] = result["mathematic"] + result["kazakh_lang"] + result["russian_lang"] + result["turkish_lang"]
                result["total"] = result["day_1_total"];

                BtsResults.update({_id:result._id},{$set:result})
            })
        }else if (btsNo == '3'){

            _.each(results,(result) => {

                result["mathematic"] = check(parseAnswerKey(answerKey.mathematic), result.day_1_keys.slice(0,100));
                result["mathematicA"] = checkA(parseAnswerKey(answerKey.mathematic), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.mathematic));
                result["mathematicB"] = checkB(parseAnswerKey(answerKey.mathematic), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.mathematic));

                result["physics"] = check(parseAnswerKey(answerKey.physics), result.day_1_keys.slice(100,200));
                result["physicsA"] = checkA(parseAnswerKey(answerKey.physics), result.day_1_keys.slice(100,200),parseLevelKey(levelKey.physics));
                result["physicsB"] = checkB(parseAnswerKey(answerKey.physics), result.day_1_keys.slice(100,200),parseLevelKey(levelKey.physics));

                result["chemistry"] = check(parseAnswerKey(answerKey.chemistry), result.day_1_keys.slice(200,300));
                result["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), result.day_1_keys.slice(200,300),parseLevelKey(levelKey.chemistry));
                result["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), result.day_1_keys.slice(200,300),parseLevelKey(levelKey.chemistry));

                result["biology"] = check(parseAnswerKey(answerKey.biology), result.day_1_keys.slice(300,400));
                result["biologyA"] = checkA(parseAnswerKey(answerKey.biology), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.biology));
                result["biologyB"] = checkB(parseAnswerKey(answerKey.biology), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.biology));

                result["day_1_total"] = 0;
                result["total"] = 0;
                result["day_1_total"] = result["mathematic"] + result["kazakh_lang"] + result["russian_lang"] + result["turkish_lang"]
                result["total"] = result["day_1_total"];

                BtsResults.update({_id:result._id},{$set:result})
            })
          }
      }else if(answerKey.grade == '8' || answerKey.grade == '9'){
        if(day == 1){
            let results = BtsResults.find({academicYear:academicYear,btsNo:btsNo,variant_day_1:variant}).fetch()
            _.each(results,(result) => {

                result["mathematic"] = check(parseAnswerKey(answerKey.mathematic), result.day_1_keys.slice(0,100));
                result["mathematicA"] = checkA(parseAnswerKey(answerKey.mathematic), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.mathematic));
                result["mathematicB"] = checkB(parseAnswerKey(answerKey.mathematic), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.mathematic));

                result["kazakh_lang"] = check(parseAnswerKey(answerKey.kazakh_lang),result.day_1_keys.slice(100,200))
                result["kazakh_langA"] = checkA(parseAnswerKey(answerKey.kazakh_lang),result.day_1_keys.slice(100,200),parseLevelKey(levelKey.kazakh_lang))
                result["kazakh_langB"] = checkB(parseAnswerKey(answerKey.kazakh_lang),result.day_1_keys.slice(100,200),parseLevelKey(levelKey.kazakh_lang))

                result["turkish_lang"] = check(parseAnswerKey(answerKey.turkish_lang),result.day_1_keys.slice(200,300))
                result["turkish_langA"] = checkA(parseAnswerKey(answerKey.turkish_lang),result.day_1_keys.slice(200,300),parseLevelKey(levelKey.turkish_lang))
                result["turkish_langB"] = checkB(parseAnswerKey(answerKey.turkish_lang),result.day_1_keys.slice(200,300),parseLevelKey(levelKey.turkish_lang))

                result["kazakh_history"] = check(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(300,400))
                result["kazakh_historyA"] = checkA(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))
                result["kazakh_historyB"] = checkB(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.kazakh_history))

                result["day_1_total"] = 0;
                result["total"] = 0;
                result["day_1_total"] = result["mathematic"] + result["kazakh_lang"] + result["turkish_lang"] + result["kazakh_history"]
                result["total"] = result["day_1_total"];

                BtsResults.update({_id:result._id},{$set:result})
            })
        }else if(day == 2){
            let results = BtsResults.find({academicYear:academicYear,btsNo:btsNo,variant_day_2:variant}).fetch()

            _.each(results,(result) => {
                result["geography"] = check(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(0,100));
                result["geographyA"] = checkA(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(0,100),parseLevelKey(levelKey.geography));
                result["geographyB"] = checkB(parseAnswerKey(answerKey.geography), result.day_2_keys.slice(0,100),parseLevelKey(levelKey.geography));

                result["physics"] = check(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(100,200));
                result["physicsA"] = checkA(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.physics));
                result["physicsB"] = checkB(parseAnswerKey(answerKey.physics), result.day_2_keys.slice(100,200),parseLevelKey(levelKey.physics));

                result["chemistry"] = check(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(200,300));
                result["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.chemistry));
                result["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), result.day_2_keys.slice(200,300),parseLevelKey(levelKey.chemistry));

                result["biology"] = check(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(300,400));
                result["biologyA"] = checkA(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(300,400),parseLevelKey(levelKey.biology));
                result["biologyB"] = checkB(parseAnswerKey(answerKey.biology), result.day_2_keys.slice(300,400),parseLevelKey(levelKey.biology));

                result["day_2_total"] = 0;
                result["total"] = 0;

                result["day_2_total"] = result["geography"] + result["chemistry"] + result["physics"] + result["biology"];
                result["total"] = result["day_1_total"] + result["day_2_total"];
                BtsResults.update({_id:result._id},{$set:result})
            })
        }
    }else if (answerKey.grade == "10") {
        if (day == 1) {
            let results = BtsResults.find({academicYear:academicYear,btsNo:btsNo,variant_day_1:variant}).fetch()

            _.each(results,(result) => {

                result["mathematic"] = check(parseAnswerKey(answerKey.mathematic), result.day_1_keys.slice(0,100));
                result["mathematicA"] = checkA(parseAnswerKey(answerKey.mathematic), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.mathematic));
                result["mathematicB"] = checkB(parseAnswerKey(answerKey.mathematic), result.day_1_keys.slice(0,100),parseLevelKey(levelKey.mathematic));

                result["kazakh_lang"] = check(parseAnswerKey(answerKey.kazakh_lang),result.day_1_keys.slice(100,200))
                result["kazakh_langA"] = checkA(parseAnswerKey(answerKey.kazakh_lang),result.day_1_keys.slice(100,200),parseLevelKey(levelKey.kazakh_lang))
                result["kazakh_langB"] = checkB(parseAnswerKey(answerKey.kazakh_lang),result.day_1_keys.slice(100,200),parseLevelKey(levelKey.kazakh_lang))

                result["kazakh_history"] = check(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(200,300))
                result["kazakh_historyA"] = checkA(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(200,300),parseLevelKey(levelKey.kazakh_history))
                result["kazakh_historyB"] = checkB(parseAnswerKey(answerKey.kazakh_history), result.day_1_keys.slice(200,300),parseLevelKey(levelKey.kazakh_history))

                if(result.electiveGroup == "01"){

                      result["geography"] = check(parseAnswerKey(answerKey.geography), result.day_1_keys.slice(300,400));
                      result["geographyA"] = checkA(parseAnswerKey(answerKey.geography), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.geography));
                      result["geographyB"] = checkB(parseAnswerKey(answerKey.geography), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.geography));

                      result["physics"] = check(parseAnswerKey(answerKey.physics), result.day_1_keys.slice(400,500));
                      result["physicsA"] = checkA(parseAnswerKey(answerKey.physics), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.physics));
                      result["physicsB"] = checkB(parseAnswerKey(answerKey.physics), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.physics));

                }else if(result.electiveGroup == "02"){

                      result["geography"] = check(parseAnswerKey(answerKey.geography), result.day_1_keys.slice(300,400));
                      result["geographyA"] = checkA(parseAnswerKey(answerKey.geography), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.geography));
                      result["geographyB"] = checkB(parseAnswerKey(answerKey.geography), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.geography));

                      result["chemistry"] = check(parseAnswerKey(answerKey.chemistry), result.day_1_keys.slice(400,500));
                      result["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.chemistry));
                      result["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.chemistry));

                }else if(result.electiveGroup == "03"){

                      result["geography"] = check(parseAnswerKey(answerKey.geography), result.day_1_keys.slice(300,400));
                      result["geographyA"] = checkA(parseAnswerKey(answerKey.geography), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.geography));
                      result["geographyB"] = checkB(parseAnswerKey(answerKey.geography), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.geography));

                      result["biology"] = check(parseAnswerKey(answerKey.biology), result.day_1_keys.slice(400,500));
                      result["biologyA"] = checkA(parseAnswerKey(answerKey.biology), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.biology));
                      result["biologyB"] = checkB(parseAnswerKey(answerKey.biology), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.biology));

                }else if(result.electiveGroup == "04"){

                      result["physics"] = check(parseAnswerKey(answerKey.physics), result.day_1_keys.slice(300,400));
                      result["physicsA"] = checkA(parseAnswerKey(answerKey.physics), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.physics));
                      result["physicsB"] = checkB(parseAnswerKey(answerKey.physics), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.physics));

                      result["chemistry"] = check(parseAnswerKey(answerKey.chemistry), result.day_1_keys.slice(400,500));
                      result["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.chemistry));
                      result["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.chemistry));

                }else if(result.electiveGroup == "05"){

                      result["physics"] = check(parseAnswerKey(answerKey.physics), result.day_1_keys.slice(300,400));
                      result["physicsA"] = checkA(parseAnswerKey(answerKey.physics), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.physics));
                      result["physicsB"] = checkB(parseAnswerKey(answerKey.physics), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.physics));

                      result["biology"] = check(parseAnswerKey(answerKey.biology), result.day_1_keys.slice(400,500));
                      result["biologyA"] = checkA(parseAnswerKey(answerKey.biology), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.biology));
                      result["biologyB"] = checkB(parseAnswerKey(answerKey.biology), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.biology));

                }else if(result.electiveGroup == "06"){

                      result["chemistry"] = check(parseAnswerKey(answerKey.chemistry), result.day_1_keys.slice(300,400));
                      result["chemistryA"] = checkA(parseAnswerKey(answerKey.chemistry), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.chemistry));
                      result["chemistryB"] = checkB(parseAnswerKey(answerKey.chemistry), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.chemistry));

                      result["biology"] = check(parseAnswerKey(answerKey.biology), result.day_1_keys.slice(400,500));
                      result["biologyA"] = checkA(parseAnswerKey(answerKey.biology), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.biology));
                      result["biologyB"] = checkB(parseAnswerKey(answerKey.biology), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.biology));

                }else if(result.electiveGroup == "07"){

                      result["geography"] = check(parseAnswerKey(answerKey.geography), result.day_1_keys.slice(300,400));
                      result["geographyA"] = checkA(parseAnswerKey(answerKey.geography), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.geography));
                      result["geographyB"] = checkB(parseAnswerKey(answerKey.geography), result.day_1_keys.slice(300,400),parseLevelKey(levelKey.geography));

                      result["world_history"] = check(parseAnswerKey(answerKey.world_history), result.day_1_keys.slice(400,500));
                      result["world_historyA"] = checkA(parseAnswerKey(answerKey.world_history), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.world_history));
                      result["world_historyB"] = checkB(parseAnswerKey(answerKey.world_history), result.day_1_keys.slice(400,500),parseLevelKey(levelKey.world_history));

                }

                result["day_1_total"] = 0;
                result["total"] = 0;
                result["day_1_total"] = result["mathematic"] + result["kazakh_lang"] + result["kazakh_history"] + result["geography"] + result["physics"]+ result["chemistry"]+ result["biology"];
                result["total"] = result["day_1_total"];

                BtsResults.update({_id:result._id},{$set:result})
            })
        }
    }

    let schools = Schools.find().fetch()
    _.each(schools,(school) => {
        //console.log("admin: rechek shkol")
        calculateRating(academicYear,btsNo,school.schoolId)
    })
}
