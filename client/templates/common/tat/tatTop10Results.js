import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './tatTop10Results.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

Template.tatTop10Results.onCreated(function(){
    let template = this
    document.title = "ТАТ Топ 10";
    template.subjectId = new ReactiveVar('01')
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('tatAllSeparateResults',academicYear.get(),template.subjectId.get(),FlowRouter.getParam('tatNo'))
    })

})

Template.tatTop10Results.helpers({
    tatNo() {
        return FlowRouter.getParam('tatNo')
    },
    results() {
        return TatResults.find({},{sort:{result:-1}})
    }
})

Template.tatTop10Results.events({
    'change #subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      var selectedLesson = "Алгебра";
      let tatN = FlowRouter.getParam('tatNo');

      let lessons = [" ", "Алгебра", "Физика", "Химия", "Биология", "Ағылшын тілі", "География", " ",
       "Информатика", "Қазақ тілі", "Түрік тілі", "Орыс тілі", "Қазақстан тарихы", "Дене шынықтыру" ];

      if(template.subjectId.get() == "23"){
        selectedLesson = "Дене шынықтыру";
      }else{
        selectedLesson = lessons[parseInt(template.subjectId.get())]
      }

      var headers = ["#", "Оқу жылы", "Мектеп аты", "Пән", "Мұғалім ID",
      "Аты	Жөні", "Лауазымы", "Нәтиже", "%"];
      data.push(headers);

      var resultStore = TatResults.find({},{sort:{result:-1}}).fetch();
      // console.log(resultStore.length);

      console.log(resultStore);
      var size = 0;
      if(resultStore.length > 10){
        size = 10;
      }else{
        size = resultStore.length;
      }

      for(var i = 0; i < size; i++){
        let mektepAty  = Schools.findOne({schoolId: resultStore[i].schoolId}) ? Schools.findOne({schoolId: resultStore[i].schoolId}).shortName : undefined;

        let idN = i+1;
        let okuJyly = resultStore[i].academicYear;
        let mugalimId = resultStore[i].teacherId;
        let mugalimInfo = resultStore[i].teacherSurname+" "+resultStore[i].teacherName;
        let lauazim = resultStore[i].position;
        let natizhe = resultStore[i].result;
        let procentN = resultStore[i].percent;

        let content = [idN, okuJyly, mektepAty, selectedLesson, mugalimId, mugalimInfo,
          lauazim, natizhe, procentN];

        data.push(content);
      }

      if(data.length == 1){
          alert("Keep calm, there is no data to export");
      }else{
        let year = academicYear.get();
        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;

          let sName = 'Tat'+tatN+' Top10 '+selectedLesson+' '+year+'.xlsx';
          XLSX.writeFile(wb, sName);
        });
      }
    }
})
