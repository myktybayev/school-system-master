import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './opeReportUpload.html';
import {ReactiveDict} from 'meteor/reactive-dict'
import XLSX from 'xlsx';

Template.opeReportUpload.onCreated(function() {
    let template = this
    document.title = "OPE Репорт";
    template.reportPeriod = new ReactiveVar('16.11 - 30.11')
    template.grade = new ReactiveVar('7')
    template.results = new ReactiveVar([])
    state = new ReactiveDict();
    state.set('directorClickedYes', false)
    template.subscribe('opes');
    template.subscribe('opeReport');
    template.subscribe('configs');

    // template.autorun(() => {
    //     template.subscribe("opeReports", academicYear.get(), template.reportPeriod.get())
    // })

})

Template.opeReportUpload.helpers({
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

Template.opeReportUpload.events({


  'change #select'(event,template) {
      template.reportPeriod.set(event.target.value)
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
      var headers = ['report_name',	'math', 'physics', 'chemistry', 'biology', 'english', 'geography', 'kazakh_history',
      'informatic', 'kazakh_lang', 'turkish_lang', 'russian_lang', 'huhuk'];
      var reportNameList = ['Мұғалім түсіндірген сабақ сағаты',
                            'Басқа мұғалім түсіндірген сабақ сағаты',
                            'Жасалған емтихан саны',
                            'Мұғалім мотивация программ сағаты',
                            'Мұғалімнің кандидат саны(10 сынып)',
                            'Мұғалімнің кандидат саны(11 сынып)',
                            'Жалпы Олимпиадчик оқушы саны',
                            'Область дәрежесіне жеткен оқушы саны',
                            'Республика дәрежесіне жеткен оқушы саны',
                            'Дүние дәрежесіне жеткен оқушы саны',
                            'Әкімшіліктің мотивация программ сағаты',
                            'Олимпиада мұғалімдерімен жиналыс сағаты']

      data.push(headers);

      reportNameList.forEach(reportName =>{
        let content = [reportName];
        data.push(content);
      });

      Meteor.call('download', data, (err, wb) => {
        if (err) throw err;

        let sName = 'ope_report.xlsx';
        XLSX.writeFile(wb, sName);
      });
  },
  
  'change #upload' (event,template) {
      let ope = Configs.findOne({
          _id: 'opeUpload'
      });

      reportId = template.reportPeriod.get().replace(/[.*+?^${}()|[\]\\]/g, "_");

      if (ope[reportId] == 'disabled')
          throw alert('OPE '+template.reportPeriod.get()+' күнгі жүктеу жабық. Өтініш, IT Department-ке хабарласыңыз.')


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

Template.opeReportUpload.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
