import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './bts100Results.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
Template.bts100Results.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar("7")
    //template.schoolId_select = new ReactiveVar("")
    document.title = "БТС TOП-100 Оқушы";
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("btsAllResults",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})
Template.bts100Results.helpers({
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    results() {
        return BtsResults.find({},{sort:{total:-1}})
    }
})

Template.bts100Results.events({
    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      let btsNo = FlowRouter.getParam('btsNo');
      let okuJyly = academicYear.get();

      let selectedGrade = "7 cынып";
      let grades = ["7 cынып", "8 cынып", "9 cынып", "10 cынып"];
      selectedGrade = grades[parseInt(template.grade.get()) - 7];

      var btsStore = BtsResults.find({},{sort:{total:-1}}).fetch();
      var headers = ["#", "Оқу жылы", "Мектеп", "Сынып", "Аты Жөні", "Жалпы"];

      data.push(headers);
      console.log(btsStore);
      var totalAve = 0;

      if(btsStore.length > 0){
        for(var i = 0; i < 100; i++){
          let idN = i+1;
          let school_name = Schools.findOne({schoolId: btsStore[i].schoolId}) ? Schools.findOne({schoolId: btsStore[i].schoolId}).shortName : "no";
          let studentInfo = btsStore[i].surname+" "+btsStore[i].name.trim();
          let classN = btsStore[i].grade+" "+btsStore[i].division;

          let total = btsStore[i].total;
          totalAve += total;

          let content = [idN, okuJyly, school_name, classN, studentInfo, total];
          data.push(content);
        }
      }

      if(data.length == 1){
          alert("Keep calm, there is no data to export");
      }else{

        let averages = [" "," "," "," ","Орталама балы", Math.round(totalAve / 100)];

        data.push(averages);
        console.log(data);

        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;
          let sName = 'BTS-'+btsNo+' TOП-100 Оқушы '+selectedGrade+' '+okuJyly+'.xlsx';
          XLSX.writeFile(wb, sName);
        });

      }

    }
})
