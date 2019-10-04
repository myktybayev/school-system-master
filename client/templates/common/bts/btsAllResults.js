import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsAllResults.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
Template.btsAllResults.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar("7")
    document.title = "БТС Жалпы Нәтижелері";
    template.schoolId_select = new ReactiveVar("")
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("btsAllResults",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})
Template.btsAllResults.helpers({

    schools()  {
        return Schools.find({},{sort:{schoolId:1}})
    },
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    results() {
        let schoolId_select = new RegExp(Template.instance().schoolId_select.get())
        return BtsResults.find({schoolId:schoolId_select},{sort:{total:-1}})
    }
})

Template.btsAllResults.events({

    "change #select"(event,template) {
        template.schoolId_select.set(template.find('[name=schoolId_select]').value)
        template.grade.set(template.find('[name=grade]').value)

        let schoolId_select = FlowRouter.getParam('_id')
        let grade = FlowRouter.getParam('_id')
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      let btsNo = FlowRouter.getParam('btsNo');
      let okuJyly = academicYear.get();

      let selectedLesson = "7 cынып";
      let grades = ["7 cынып", "8 cынып", "9 cынып", "10 cынып"];
      selectedLesson = grades[parseInt(template.grade.get()) - 7];

      var schoolId_select = Template.instance().schoolId_select.get();
      var btsStore;
      let school_name;

      if(schoolId_select) {

        btsStore = BtsResults.find({schoolId:schoolId_select},{sort:{total:-1}}).fetch();
        school_name = Schools.findOne({schoolId: schoolId_select}) ? Schools.findOne({schoolId: schoolId_select}).shortName : "no";

      }else {
        btsStore = BtsResults.find({},{sort:{total:-1}}).fetch();
        school_name = "Жалпы";
      }

      // var btsStore = BtsResults.find({schoolId:schoolId_select},{sort:{total:-1}}).fetch();

      // console.log("schoolId_select1: "+schoolId_select);
      // console.log("school_name: "+school_name);
      // console.log("selectedLesson: "+selectedLesson);
      // console.log(btsStore);

      var schoolTitle = ["БТС нәтижелері", school_name];
      var headers = ["#", "Оқу жылы", "Мектеп", "Сынып", "Аты Жөні",
      "Жалпы", "Физика", "Химия", "Биология", "Ағылшын тілі",
      "Қазақ тілі", "Қазақ әдебиеті", "Орыс тілі", "Алгебра", "Геометрия",
      "Информатика", "Жалпы тарих", "Тарих", "География"];

      data.push(schoolTitle);
      data.push(headers);
      //

      console.log(btsStore);
      var dictLessonAverage = {
        "total": 0,
        "physics": 0,
        "chemistry": 0,
        "biology": 0,
        "english": 0,
        "kazakh": 0,
        "kazakh_literature": 0,
        "russian": 0,
        "algebra": 0,
        "geometry": 0,
        "computer": 0,
        "world_history": 0,
        "kazakh_history": 0,
        "geography": 0
      };

      for(var i = 0; i < btsStore.length; i++){
        let idN = i+1;
        school_name = Schools.findOne({schoolId: btsStore[i].schoolId}) ? Schools.findOne({schoolId: btsStore[i].schoolId}).shortName : "no";

        let studentInfo = btsStore[i].surname+" "+btsStore[i].name.trim();
        let classN = btsStore[i].grade+" "+btsStore[i].division;
        let total = btsStore[i].total;
        let physics = btsStore[i].physics;
        let chemistry = btsStore[i].chemistry;
        let biology = btsStore[i].biology;
        let english = btsStore[i].english;
        let kazakh = btsStore[i].kazakh;
        let kazakh_literature = btsStore[i].kazakh_literature ? btsStore[i].kazakh_literature : 0;
        let russian = btsStore[i].russian;
        let algebra = btsStore[i].algebra;
        let geometry = btsStore[i].geometry;
        let computer = btsStore[i].computer;
        let world_history = btsStore[i].world_history;
        let kazakh_history = btsStore[i].kazakh_history;
        let geography = btsStore[i].geography;

        dictLessonAverage["total"]          = dictLessonAverage["total"] + (total ? total : 0);
        dictLessonAverage["physics"]        = dictLessonAverage["physics"] + (physics ? physics : 0);
        dictLessonAverage["chemistry"]      = dictLessonAverage["chemistry"] + (chemistry ? chemistry : 0);
        dictLessonAverage["biology"]        = dictLessonAverage["biology"] + (biology ? biology : 0);
        dictLessonAverage["english"]        = dictLessonAverage["english"] + (english ? english : 0);
        dictLessonAverage["kazakh"]         = dictLessonAverage["kazakh"] + (kazakh ? kazakh : 0);
        dictLessonAverage["kazakh_literature"] = dictLessonAverage["kazakh_literature"] + (kazakh_literature ? kazakh_literature : 0);
        dictLessonAverage["russian"]        = dictLessonAverage["russian"] + (russian ? russian : 0);
        dictLessonAverage["algebra"]        = dictLessonAverage["algebra"] + (algebra ? algebra : 0);
        dictLessonAverage["geometry"]       = dictLessonAverage["geometry"] + (geometry ? geometry : 0);
        dictLessonAverage["computer"]       = dictLessonAverage["computer"] + (computer ? computer : 0);
        dictLessonAverage["world_history"]  = dictLessonAverage["world_history"] + (world_history ? world_history : 0);
        dictLessonAverage["kazakh_history"] = dictLessonAverage["kazakh_history"] + (kazakh_history ? kazakh_history : 0);
        dictLessonAverage["geography"]      = dictLessonAverage["geography"] + (geography ? geography : 0);

        let content = [idN, okuJyly, school_name, classN, studentInfo,
          total,
          physics,
          chemistry,
          biology,
          english,
          kazakh,
          kazakh_literature,
          russian,
          algebra,
          geometry,
          computer,
          world_history,
          kazakh_history,
          geography];

        data.push(content);
      }

      if(data.length == 2){
          alert("Keep calm, there is no data to export");
      }else{

        let sCount = (btsStore.length - 1);
        let averages = [" "," "," "," ","Орталама балы",
          Math.round(dictLessonAverage["total"] / sCount * 100) / 100,
          Math.round(dictLessonAverage["physics"] / sCount * 100) / 100,
          Math.round(dictLessonAverage["chemistry"] / sCount * 100) / 100,
          Math.round(dictLessonAverage["biology"] / sCount * 100) / 100,
          Math.round(dictLessonAverage["english"] / sCount * 100) / 100,
          Math.round(dictLessonAverage["kazakh"] / sCount * 100) / 100,
          Math.round(dictLessonAverage["kazakh_literature"] / sCount * 100) / 100,
          Math.round(dictLessonAverage["russian"] / sCount * 100) / 100,
          Math.round(dictLessonAverage["algebra"] / sCount * 100) / 100,
          Math.round(dictLessonAverage["geometry"] / sCount * 100) / 100,
          Math.round(dictLessonAverage["computer"] / sCount * 100) / 100,
          Math.round(dictLessonAverage["world_history"] / sCount * 100) / 100,
          Math.round(dictLessonAverage["kazakh_history"] / sCount * 100) / 100 ,
          Math.round(dictLessonAverage["geography"] / sCount * 100) / 100
        ];

        data.push(averages);
        // console.log(data);

        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;

          let sName = 'BTS-'+btsNo+' жалпы нәтижелері '+selectedLesson+' '+okuJyly+'.xlsx';
          XLSX.writeFile(wb, sName);
        });

      }

    }
})
