import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsResults.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
Template.btsResults.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar("7")
    document.title = "БТС Мектеп Нәтижелері";

    template.subscribe("schools")
    template.autorun(()=>{
        // template.subscribe("btsResults","2017-2018",template.grade.get(),FlowRouter.getParam("btsNo"))
        template.subscribe("btsResults",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))

    })
})

Template.btsResults.helpers({
    grade7(){
        return "7" == Template.instance().grade.get()
    },
    grade10(){
        return "10" == Template.instance().grade.get()
    },
    grade8_or_9(){
        return "8" == Template.instance().grade.get() || "9" == Template.instance().grade.get()
    },
    btsNo1_or_2(){
        return "2" == FlowRouter.getParam("btsNo") || "1" == FlowRouter.getParam("btsNo")
    },
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    results() {
        return BtsResults.find({},{sort:{total:-1}})
    }
})

Template.btsResults.events({
    'change #select'(event,template) {
        template.grade.set(event.target.value)
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      let btsNo = FlowRouter.getParam('btsNo');

      var headers = [];
      var btsStore = BtsResults.find({},{sort:{total:-1}}).fetch();
      var curGrade = btsStore[0].grade;
      let okuJyly = academicYear.get();
      if(curGrade == '7'){
        headers = ["#", "Оқу жылы","Оқушы ID", "Сынып", "Аты Жөні","Жалпы", "Математика", "Қазақ тілі",
        "Түрік тілі", "Орыс тілі"];

          data.push(headers);
          for(var i = 0; i < btsStore.length; i++){
            let idN = i+1;
            let studentInfo = btsStore[i].surname+" "+btsStore[i].name.trim();
            let classN = btsStore[i].grade+" "+btsStore[i].division;
            let studentId = btsStore[i].studentId;
            let total = btsStore[i].total;
            let mathematic = btsStore[i].mathematic;
            let kazakh_lang = btsStore[i].kazakh_lang;
            let russian_lang = btsStore[i].russian_lang;
            let turkish_lang = btsStore[i].turkish_lang;

            let content = [idN, okuJyly, studentId, classN, studentInfo, total, mathematic, kazakh_lang,
              russian_lang,
              turkish_lang];

            data.push(content);

          }

      }else if (curGrade == '8' || curGrade == '9') {
        headers = ["#", "Оқу жылы","Оқушы ID", "Сынып", "Аты Жөні","Жалпы","Математика", "Қазақ тілі",
          "Түрік тілі", "Қазақстан тарихы",
          "География", "Физика", "Химия", "Биология"];

          data.push(headers);
          for(var i = 0; i < btsStore.length; i++){
            let idN = i+1;
            let studentInfo = btsStore[i].surname+" "+btsStore[i].name.trim();
            let classN = btsStore[i].grade+" "+btsStore[i].division;
            let studentId = btsStore[i].studentId;
            let total = btsStore[i].total;
            let mathematic = btsStore[i].mathematic;
            let kazakh_lang = btsStore[i].kazakh_lang;
            let turkish_lang = btsStore[i].turkish_lang;
            let kazakh_history = btsStore[i].kazakh_history;
            let geography = btsStore[i].geography;
            let physics = btsStore[i].physics;
            let chemistry = btsStore[i].chemistry;
            let biology = btsStore[i].biology;

            let content = [idN, okuJyly, studentId, classN, studentInfo, total, mathematic, kazakh_lang,
              turkish_lang,kazakh_history, geography, physics, chemistry, biology];

            data.push(content);

          }

      }else if (curGrade == '10') {
        headers = ["#", "Оқу жылы","Оқушы ID", "Сынып", "Аты Жөні","Жалпы","Математика", "Қазақ тілі",
          "Қазақстан тарихы", "География",  "Физика",
          "Химия",            "Биология",   "Дүние тарихы"];

          data.push(headers);
          for(var i = 0; i < btsStore.length; i++){
            let idN = i+1;
            let studentInfo = btsStore[i].surname+" "+btsStore[i].name.trim();
            let classN = btsStore[i].grade+" "+btsStore[i].division;
            let studentId = btsStore[i].studentId;
            let total = btsStore[i].total;
            let mathematic = btsStore[i].mathematic;
            let kazakh_lang = btsStore[i].kazakh_lang;
            let kazakh_history = btsStore[i].kazakh_history;

            let geography = btsStore[i].geography?btsStore[i].geography:'-';
            let physics = btsStore[i].physics?btsStore[i].physics:'-';

            let chemistry = btsStore[i].chemistry?btsStore[i].chemistry:'-';
            let biology = btsStore[i].biology?btsStore[i].biology:'-';
            let world_history = btsStore[i].world_history?btsStore[i].world_history:'-';

            let content = [idN, okuJyly, studentId, classN, studentInfo, total, mathematic, kazakh_lang,
              kazakh_history,geography, physics, chemistry, biology, world_history];

            data.push(content);

          }
        }

      console.log(btsStore);

      if(data.length == 1){

          alert("Keep calm, there is no data to export");

      }else{

        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;
          let sName = 'BTS-'+btsNo+' results grade:'+curGrade+' '+okuJyly+'.xlsx';
          XLSX.writeFile(wb, sName);
        });
      }
    }
})

/*
kazakh: 18
kazakh_history: 15
kazakh_literature: 18
name: "Ғани "
surname: "Баймахан"

*/
