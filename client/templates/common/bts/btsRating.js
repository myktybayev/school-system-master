import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './btsRating.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
Template.btsRating.onCreated(function(){
    let template = this
    Session.setDefault('Sort',{total:-1});
    document.title = "БТС Рейтинг";
    template.grade = new ReactiveVar("all")
    template.subscribe("schools")
    // template.subscribe("btsRatingAll",academicYear.get())
    template.autorun(()=>{
        template.subscribe("btsRating",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})

var schoolArray2 = [];
Template.btsRating.helpers({
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    btsNo3() {
        return FlowRouter.getParam("btsNo") == "3"
    },
    results() {

        var schoolStore = new Map();
        var schoolArray = [];

        let schools = Schools.find().fetch()
        let cursorKboRatings = BtsRatings.find({academicYear:academicYear.get()}).fetch()

        schools.forEach(school =>{
          schoolStore.set(school.schoolId, school.shortName);
        });

        for(var i = 0; i < cursorKboRatings.length; i++){
            schoolStore.delete(cursorKboRatings[i].schoolId);
        }

        schoolStore.delete("033");
        schoolStore.delete("028");
        schoolStore.delete("032");
        schoolStore.delete("041");
        schoolStore.delete("042");
        // schoolStore.delete("042");

        for (const [key, value] of schoolStore.entries()) {
          // console.log(key);
          schoolArray.push(value)
        }

        schoolArray2 = schoolArray;
        console.log(schoolArray2);

        return BtsRatings.find({schoolId: {$nin: ['004']}},{sort: Session.get('Sort')});
    },
    schoolNotUploaded(){
      return schoolArray2;
    },
    gradeAll(){
        return "all" == Template.instance().grade.get()
    },
    grade7(){
        return "7" == Template.instance().grade.get()
    },
    grade8_or_9(){
        return "8" == Template.instance().grade.get() || "9" == Template.instance().grade.get()
    },
    grade10(){
        return "10" == Template.instance().grade.get()
    }
})

Template.btsRating.events({
    "change #select"(event,template) {
        template.grade.set(template.find('[name=grade]').value)

        let grade = FlowRouter.getParam('_id')
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      let btsNo = FlowRouter.getParam('btsNo');
      var selectedLesson = "Жалпы";

      if(template.grade.get() != "all"){
        let lessons = ["7 cынып", "8 cынып", "9 cынып", "10 cынып"];
          selectedLesson = lessons[parseInt(template.grade.get()) - 7]
      }

      var headers = ["#", "Оқу жылы", "Мектеп аты",
      "Жалпы", "Физика", "Химия", "Биология", "Ағылшын тілі",
      "Қазақ тілі", "Қазақ әдебиеті", "Орыс тілі", "Алгебра", "Геометрия",
      "Информатика", "Жалпы тарих", "Тарих", "География"];

      data.push(headers);
      var btsStore = BtsRatings.find({},{sort:Session.get('Sort')}).fetch();
      let mektepAty;
      let okuJyly = academicYear.get();

      for(var i = 0; i < btsStore.length; i++){
        let idN = i+1;
        let mektepAty  = Schools.findOne({schoolId: btsStore[i].schoolId}) ? Schools.findOne({schoolId: btsStore[i].schoolId}).shortName : undefined;
        let total = btsStore[i].total.toFixed(2);
        let physics = btsStore[i].physics.toFixed(2);
        let chemistry = btsStore[i].chemistry.toFixed(2);
        let biology = btsStore[i].biology.toFixed(2);
        let english = btsStore[i].english.toFixed(2);
        let kazakh = btsStore[i].kazakh.toFixed(2);
        let kazakh_literature = btsStore[i].kazakh_literature ? btsStore[i].kazakh_literature.toFixed(2) : 0;
        let russian = btsStore[i].russian.toFixed(2);
        let algebra = btsStore[i].algebra.toFixed(2);
        let geometry = btsStore[i].geometry.toFixed(2);
        let computer = btsStore[i].computer.toFixed(2);
        let world_history = btsStore[i].world_history.toFixed(2);
        let kazakh_history = btsStore[i].kazakh_history.toFixed(2);
        let geography = btsStore[i].geography.toFixed(2);

        let content = [idN, okuJyly, mektepAty,
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

      console.log(data);

      if(data.length == 1){
          alert("Keep calm, there is no data to export");
      }else{
        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;

          let sName = 'BTS-'+btsNo+' rating '+selectedLesson+' '+okuJyly+'.xlsx';
          XLSX.writeFile(wb, sName);
        });
      }
    },

    'click #sortMath'(event,template) {
        Session.set('Sort',{mathematic:-1});
    },
    'click #sortPhysics'(event,template) {
        Session.set('Sort',{physics:-1});
    },
    'click #sortChemistry'(event,template) {
        Session.set('Sort',{chemistry:-1});
    },
    'click #sortBio'(event,template) {
        Session.set('Sort',{biology:-1});
    },



    'click #sortKazakh'(event,template) {
        Session.set('Sort',{kazakh_lang:-1});
    },
    'click #sortTur'(event,template) {
        Session.set('Sort',{turkish_lang:-1});
    },
    'click #sortRus'(event,template) {
        Session.set('Sort',{russian_lang:-1});
    },
    'click #sortHistory'(event,template) {
        Session.set('Sort',{world_history:-1});
    },
    'click #sortGeography'(event,template) {
        Session.set('Sort',{geography:-1});
    },
    'click #sortWorlHistory'(event,template) {
        Session.set('Sort',{world_history:-1});
    },
    'click #sortTotal'(event,template) {
        Session.set('Sort',{total:-1});
    },
})
