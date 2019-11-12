import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsKeysEdit.html';
Template.btsKeysEdit.onCreated(function() {
    let template = this
    template.subscribe("btsKey",FlowRouter.getParam("id"))
})

Template.btsKeysEdit.helpers({
    keys() {
        return BtsAnswerKeys.findOne({_id:FlowRouter.getParam("id")})
    },
    day1(day) {
    	return day=="1"
    },
    day2(day) {
    	return day=="2"
    },
    grade7(grade) {
      return grade == "7"
    },
    grade8_or_9(grade) {
      return grade == "8" || grade == "9"
    },
    grade10(grade) {
      return grade == "10"
    },
    btsNo1_or_2(btsNo) {
      return btsNo == "1" || btsNo == "2"
    },
    btsNo3(btsNo) {
      return btsNo == "3"
    }
})

Template.btsKeysEdit.events({
    "change #btsNo"(event,template) {
        template.btsNo.set(event.target.value)
        localStorage.setItem("btsNo", event.target.value)
    },
    "click #save"(event,template) {
        console.log("##")
        event.preventDefault()
        let keys = BtsAnswerKeys.findOne({_id:FlowRouter.getParam("id")})
        console.log(keys)
        let answerKeys = {}
        if (keys.grade == "7"){

          if (keys.day == "1"){
            if (keys.day == "1" && (keys.quarter == "1" || keys.quarter == "2")){
              answerKeys["mathematic"] = template.find("[name=mathematic]").value;
              answerKeys["kazakh_lang"] = template.find("[name=kazakh_lang]").value;
              answerKeys["turkish_lang"] = template.find("[name=turkish_lang]").value;
              answerKeys["russian_lang"] = template.find("[name=russian_lang]").value;

            }else if (keys.quarter == "3") {
              answerKeys["mathematic"] = template.find("[name=mathematic]").value;
              answerKeys["physics"] = template.find("[name=physics]").value;
              answerKeys["chemistry"] = template.find("[name=chemistry]").value;
              answerKeys["biology"] = template.find("[name=biology]").value;

            }
          }
        }else if (keys.grade == "8" || keys.grade == "9"){
          if (keys.day=="1") {
            answerKeys["mathematic"] = template.find("[name=mathematic]").value;
            answerKeys["kazakh_lang"] = template.find("[name=kazakh_lang]").value;
            answerKeys["turkish_lang"] = template.find("[name=turkish_lang]").value;
            answerKeys["kazakh_history"] = template.find("[name=kazakh_history]").value;
          }
          else if (keys.day=="2"){
            answerKeys["geography"] = template.find("[name=geography]").value;
            answerKeys["physics"] = template.find("[name=physics]").value;
            answerKeys["chemistry"] = template.find("[name=chemistry]").value;
            answerKeys["biology"] = template.find("[name=biology]").value;
          }
      }else if (keys.grade == "10") {
          if (keys.day=="1"){
            answerKeys["mathematic"] = template.find("[name=mathematic]").value;
            answerKeys["kazakh_lang"] = template.find("[name=kazakh_lang]").value;
            answerKeys["kazakh_history"] = template.find("[name=kazakh_history]").value;

            answerKeys["geography"] = template.find("[name=geography]").value;
            answerKeys["physics"] = template.find("[name=physics]").value;
            answerKeys["chemistry"] = template.find("[name=chemistry]").value;
            answerKeys["biology"] = template.find("[name=biology]").value;
            answerKeys["world_history"] = template.find("[name=world_history]").value;
          }
      }

      Meteor.call("BtsAnswerKeys.Update", keys._id,answerKeys,function(err) {
          if (err) {
              alert(err.reason)
          } else {
              alert("Сақталды!")
          }
      })
      alert("Идет пересчет рейтинга школ")
      FlowRouter.redirect("/admin/bts/keys")
    }
})
