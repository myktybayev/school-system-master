import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminSettings.html';
Template.adminSettings.onCreated(function() {
    let template = this
    template.reportPeriod = new ReactiveVar('16.11 - 30.11')
    template.subscribe('subjects')
    template.subscribe('schools')
    template.subscribe("configs")
    template.subscribe('kboKeysGeneral')
    template.subscribe('kboGenelResults',academicYear.get())
    template.autorun(()=>{

    })

})

Template.adminSettings.helpers({

    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    schools() {
        return Schools.find({},{sort:{schoolId:1}})
    },
    selected(id,num,val) {
        let conf = Configs.findOne({_id:id})
        if (conf)
            return conf[num] == val ? "selected" : ""
    },
    selectedPeriod(){
      var idd = Template.instance().reportPeriod.get().replace(/[.*+?^${}()|[\]\\]/g, "_");
      let conf = Configs.findOne({_id:"opeUpload"})

      if (conf)
          return conf[idd] == "enabled"

      // return Template.instance().reportPeriod.get()
    }
});

Template.adminSettings.events({
    "click #reCalc"() {
          Meteor.call("UbtResults.reCalcRating", academicYear.get(),function (err) {
              if (err) {
                  bootbox.alert(err.reason);
                  SUIBlock.unblock();
              } else {
                  SUIBlock.unblock();
                  bootbox.alert("Жасалынды");
              }
          });
    },

    'click #resetpassword'() {
        if (confirm("Are u sure?"))
            Meteor.call('resetSchoolPassword',this.schoolId,(err,res) => {
            if (err) {
                alert(err.reason)
            } else {
                alert('Сақталды')
            }
        })
    },

    'click #reCalcTotalRating'(event,template) {
      Meteor.call("BtsResults.calcTotalRating", academicYear.get(), function (err) {
          if (err) {
              alert(err.reason)
              SUIBlock.unblock();
          } else {
              SUIBlock.unblock();
              alert("Сақталды")
          }
      });
    },

    'click #addNew'(event,template) {
        event.preventDefault()

        if (confirm("Жаңа мектепті қосуыңыз келеді ме?")) {

        let schoolId = template.find("[name=schoolId]").value
        let schoolName = template.find("[name=schoolName]").value

            if (schoolId && schoolName) {
                alert("Мектеп тізімге қосылды")
                Meteor.call('addUsers',{
                    schoolId:schoolId,
                    shortName:schoolName
                })
            }
            else {
                alert("Ақпарат толтырылмаған")
            }
        }
    },

    "change #bts1"(event,template) {
        Meteor.call("editConfig","btsUpload","1",event.target.value)
    },
    "change #bts2"(event,template) {
        Meteor.call("editConfig","btsUpload","2",event.target.value)
    },
    "change #bts3"(event,template) {
        Meteor.call("editConfig","btsUpload","3",event.target.value)
    },
    "change #bts4"(event,template) {
        Meteor.call("editConfig","btsUpload","4",event.target.value)
    },
    "change #kbo1"(event,template) {
        Meteor.call("editConfig","kboUpload","1",event.target.value)
    },
    "change #kbo2"(event,template) {
        Meteor.call("editConfig","kboUpload","2",event.target.value)
    },
    "change #kbo3"(event,template) {
        Meteor.call("editConfig","kboUpload","3",event.target.value)
    },
    "change #tat1"(event,template) {
        Meteor.call("editConfig","tatUpload","1",event.target.value)
    },
    "change #tat2"(event,template) {
        Meteor.call("editConfig","tatUpload","2",event.target.value)
    },

    "change #ketPet2"(event,template) {
        Meteor.call("editConfig","ketPetUpload","2",event.target.value)
    },

    "change #ketPet4"(event,template) {
        Meteor.call("editConfig","ketPetUpload","4",event.target.value)
    },


    'change #opePeriod'(event,template) {
        event.preventDefault();
        template.reportPeriod.set(event.target.value)
        // console.log(template.reportPeriod.get());
    },

    "change #opePeriodPermission"(event,template) {
        var period = template.reportPeriod.get().replace(/[.*+?^${}()|[\]\\]/g, "_");
        Meteor.call("editConfig", "opeUpload", period, event.target.value)
    }
})

// editConfig: function(id,num,val) {
//     if (!this.userId)
//         return
//
//     if (!Roles.userIsInRole(this.userId,"admin"))
//         return
//
//     let conf = Configs.findOne({_id:id})
//     if(conf) {
//         conf[num] = val
//         console.log(conf)
//         Configs.update({_id:conf._id},{$set:conf})
//     }
// },
