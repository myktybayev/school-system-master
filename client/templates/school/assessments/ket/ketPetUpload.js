import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './ketPetUpload.html';
import {ReactiveDict} from 'meteor/reactive-dict'
import XLSX from 'xlsx';

Template.ketPetUpload.onCreated(function() {
    let template = this
    document.title = "OPE Репорт";
    template.examPeriod = new ReactiveVar('2')
    template.results = new ReactiveVar([])
    state = new ReactiveDict();
    state.set('directorClickedYes', false)
    template.subscribe('opes');
    template.subscribe('opeReport');
    template.subscribe('configs');
    template.subscribe('schools');
    template.subscribe('students');

    // template.autorun(() => {
    //     template.subscribe("opeReports", academicYear.get(), template.reportPeriod.get())
    // })

})

Template.ketPetUpload.helpers({
  students(){
    return Students.find({},{sort:{surname:-1, division:1}})
  },
  clickedYes(){
    return !state.get('directorClickedYes')
  },
  results() {
      return Template.instance().results.get()
  }
});

Template.ketPetUpload.events({


  'change #examPeriod'(event,template) {
      template.examPeriod.set(event.target.value)
  },
  'click #director_yes': function(){
      state.set('directorClickedYes', true)
  },

  "click #save"(event,template) {
      event.preventDefault()

      if(template.results.get().length > 0) {
          SUIBlock.block('Жүктелуде...');

          if(state.get('directorClickedYes')){
              Meteor.call("OpeReport.Upload", academicYear.get(), template.reportPeriod.get(), template.results.get(),function (err) {

                 if (err) {
                      bootbox.alert(err.reason);
                      SUIBlock.unblock();
                  } else {
                      template.results.set([])
                      SUIBlock.unblock();
                      bootbox.alert("Сақталды");

                      FlowRouter.redirect('/school/ope/reportResults/')
                  }
              });

          }else{
              bootbox.alert({
                  message: "Директор растамады!!!",
                  callback: function () {
                  }
              })
              SUIBlock.unblock();
          }

          return
      }
      alert("Файл таңдалмады немесе қателер табылды")
   },

  'click #dnload' () {
      const html = document.getElementById('out').innerHTML;

      var data = [];
      var headers = ['studentId', 'grade', 'studentSurname', 'studentName', 'writing, listening point','speaking point'];

      data.push(headers);

      let school = Schools.findOne({userId: Meteor.userId()});
      let students = Students.find({schoolId: school.schoolId, grade: {$in: ['7', '8']}}, {sort:{grade: 1, division: 1}}).fetch()

      students.forEach(student =>{
        let content = [student.studentId, student.grade+student.division, student.surname, student.name];
        data.push(content);
      });

      let splited = school.secondaryName.split(' ');
      let shortN = splited[0];

      Meteor.call('download', data, (err, wb) => {
        if (err) throw err;

        let sName = 'students_list '+academicYear.get()+' '+shortN+'.xlsx';
        XLSX.writeFile(wb, sName);
      });

  },

  'change #upload' (event, template) {
      let ope = Configs.findOne({
          _id: 'ketPetUpload'
      });

      reportId = template.examPeriod.get();
      console.log(reportId);

      if (ope[reportId] == 'disabled'){
          throw alert('KET-PET '+reportId+' тоқсан жүктеу жабық.\nӨтініш, IT Department-ке хабарласыңыз.')
          // FlowRouter.redirect('/school/ope/reportResults/')
      }
      /*
      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
          const data = e.target.result;
          const name = file.name;

          Meteor.call('upload', data, name, function(err, wb) {
              if(err) alert(err);
              else {
                  res = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header : 0})
                  template.results.set(res)
              }
          });
      };
      reader.readAsBinaryString(file);
      */
  },

  'click .editItem': function(){
    Session.set('editItemId', this._id);
  },

  'click .cancelItem': function(){
    Session.set('editItemId', null);
  },
  'click .saveItem': function(){
    saveItem();
  },
    'keypress input': function(e){
      if(e.keyCode === 13){
        saveItem();
      }
      else if(e.keyCode === 27){
        Session.set('editItemId', null);
      }
    },
    'change #reportPeriod'(event,template) {
        template.reportPeriod.set(event.target.value)
    },
    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    },
})

Template.ketPetUpload.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
