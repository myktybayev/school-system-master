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

      let grades = ["7 cынып", "8 cынып", "9 cынып", "10 cынып"];
      let selectedLesson = grades[parseInt(template.grade.get()) - 7]


      var headers = ["#", "Оқу жылы", "Сынып", "Аты Жөні",
      "Жалпы", "Физика", "Химия", "Биология", "Ағылшын тілі",
      "Қазақ тілі", "Қазақ әдебиеті", "Орыс тілі", "Алгебра", "Геометрия",
      "Информатика", "Жалпы тарих", "Тарих", "География"];

      data.push(headers);
      var btsStore = BtsResults.find({},{sort:{total:-1}}).fetch();
      // let mektepAty  = Schools.findOne({schoolId: btsStore[0].schoolId}) ? Schools.findOne({schoolId: btsStore[0].schoolId}).shortName : undefined;
      let okuJyly = academicYear.get();

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

        let content = [idN, okuJyly, classN, studentInfo,
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
      
      if(data.length == 1){
          alert("Keep calm, there is no data to export");
      }else{

        let sCount = (btsStore.length - 1);
        let averages = [" "," "," ","Орталама балы",
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
        console.log(data);

        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;
          let sName = 'BTS-'+btsNo+' school rating '+selectedLesson+' '+okuJyly+'.xlsx';
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
