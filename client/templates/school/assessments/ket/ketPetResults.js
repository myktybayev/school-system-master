import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import './ketPetResults.html';
import XLSX from 'xlsx';

Template.ketPetResults.onCreated(function(){
    let template = this
    Session.setDefault('Sort',{total:-1});
    document.title = "KET-PET Нәтижелері";
    template.state = new ReactiveVar("results")
    template.grade = new ReactiveVar('7')
    template.examPeriod = new ReactiveVar('2')
    // template.subscribe("ketPetResult")

    template.autorun(()=>{
        template.subscribe("ketPetResults", academicYear.get(), template.grade.get(), template.examPeriod.get())
    })
})


Template.ketPetResults.helpers({
    results() {
        return KetPetResults.find({},{sort: Session.get('Sort')})
    },

    grade7(){
        return "7" == Template.instance().grade.get()
    },

    grade8(){
        return "8" == Template.instance().grade.get()
    }
})

var sortTotal = -1;
var sortLevel = -1;
var sortReadingAndWriting = -1;
var sortWritingTask9 = -1;
var sortReading = -1;
var sortWritingPart1 = -1;
var sortWritingPart2 = -1;
var sortWritingPart3 = -1;
var sortListening = -1;
var sortSpeaking = -1;

Template.ketPetResults.events({

    'change #select'(event,template) {
        template.grade.set(event.target.value)
    },

    'change #examPeriod'(event,template) {
        template.examPeriod.set(event.target.value)
    },

    "click #export"(event,template) {
      const html = document.getElementById('out').innerHTML;

      var resultStore = UhdResults.findOne({},{sort:{total:-1}});

      var row = new Array();
      var data = new Array();

      var i = 0;
      for (var key in resultStore) {
          row[i] = key;
          i += 1;
      }

      data.push(row);

      var ubtArray = UhdResults.find({},{sort:{total:-1}}).fetch();

      for(var i = 0; i < ubtArray.length; i++){
        let array = [];
        let values = Object.values(ubtArray[i]);
        Array.prototype.push.apply(array, values);
        data.push(array);
      }

      var id0 = 0;
      var id2 = 2;

      for(var i = 0 ; i < data.length ; i++)
      {
         data[i].splice(id0,1);
         data[i].splice(id2,1);
      }

      let year = academicYear.get();

      Meteor.call('download', data, (err, wb) => {
        if (err) throw err;

        let sName = 'Ubt natizheleri '+year+'.xlsx';
        XLSX.writeFile(wb, sName);
      });

    },

    'click #sortTotal'(event,template) {
        sortTotal *= (-1)
        Session.set('Sort',{total:sortTotal});
    },
    'click #sortLevel'(event,template) {
        sortLevel *= (-1)
        Session.set('Sort',{level:sortLevel});
    },
    'click #sortReadingAndWriting'(event,template) {
        sortReadingAndWriting *= (-1)
        Session.set('Sort',{ReadingAndWriting:sortReadingAndWriting});
    },
    'click #sortWritingTask9'(event,template) {

        sortWritingTask9 *= (-1)
        Session.set('Sort',{WritingTask9:sortWritingTask9});
    },
    'click #sortReading'(event,template) {

        sortReading *= (-1)
        Session.set('Sort',{Reading:sortReading});
    },
    'click #sortWritingPart1'(event,template) {

        sortWritingPart1 *= (-1)
        Session.set('Sort',{sortWritingPart1:sortWritingPart1});
    },
    'click #sortWritingPart2'(event,template) {

        sortWritingPart2 *= (-1)
        Session.set('Sort',{sortWritingPart2:sortWritingPart2});
    },
    'click #sortWritingPart3'(event,template) {

        sortWritingPart3 *= (-1)
        Session.set('Sort',{sortWritingPart3:sortWritingPart3});
    },
    'click #sortListening'(event,template) {

        sortListening *= (-1)
        Session.set('Sort',{Listening:sortListening});
    },
    'click #sortSpeaking'(event,template) {
      
        sortSpeaking *= (-1)
        Session.set('Sort',{Speaking:sortSpeaking});
    },


})

      // var data = [
      //   ["studentId", "grade" , "surname", "name","ubt1","ubt2","ubt3","ubt4","ubt5","ubt6","ubt7","ubt8","ubt9","ubt10"],
      //   [ "007" ,"11A", "Kanatov" , name, html, 60, 70, 80, 90, 100, 110, 120, 130, 140 ]
      // ];

// 0: (14) ["studentId", "grade", "surname", "name", "ubt1", "ubt2", "ubt3", "ubt4", "ubt5", "ubt6", "ubt7", "ubt8", "ubt9", "ubt10"]
// 1: (14) ["007", "11A", "Kanatov", "Vasya", "50", 60, 70, 80, 90, 100, 110, 120, 130, 140]
// length: 2

// 0: (42) ["_id", "academicYear", "studentId", "schoolId", "name", "surname", "grade", "total", "ubt1", "ubt2", "ubt3", "ubt4", "ubt5", "ubt6", "ubt7", "ubt8", "ubt9", "ubt10", "ubt11", "ubt12", "ubt13", "ubt14", "ubt15", "ubt16", "ubt17", "ubt18", "ubt19", "ubt20", "ubt21", "ubt22", "ubt23", "ubt24", "ubt25", "ubt26", "ubt27", "ubt28", "ubt29", "ubt30", "ubt31", "ubt32", "ubt33", "ubt34"]
