import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './opeReportRatings.html';
import {ReactiveDict} from 'meteor/reactive-dict'
import XLSX from 'xlsx';

Template.opeReportRatings.onCreated(function() {
    let template = this
    document.title = "OPE Репорт Рейтинг";
    template.reportPeriod = new ReactiveVar('16.11 - 30.11')
    template.subjectId = new ReactiveVar('all')
    template.subscribe('opes');
    template.subscribe("opeReport")
    template.subscribe('schools')
    Session.setDefault('Sort',{total:-1});
    // template.subscribe("opeReportRatings")
    // template.subscribe('opeReport');

    template.autorun(() => {
        template.subscribe("opeReportRatingsByFilter", academicYear.get(), template.subjectId.get())
    })

})

Template.opeReportRatings.helpers({
  students(){
    return Students.find({},{sort:{surname:-1, division:1}})
  },
  clickedYes(){
    return !state.get('directorClickedYes')
  },
  results() {
      return OpeRatings.find({},{sort: Session.get('Sort')})
  },
  schools() {
      return Schools.find({},{sort:{schoolId:1}})
  }
});

Template.opeReportRatings.events({

  'change #subjectId'(event,template) {
      template.subjectId.set(event.target.value)
      // console.log(template.reportPeriod.get());
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

  'click #sortTotal'(event,template) {
      Session.set('Sort',{total:-1});
  },
  'click #reportType1'(event,template) {
      Session.set('Sort',{reportType1:-1});
  },
  'click #reportType2'(event,template) {
      Session.set('Sort',{reportType2:-1});
  },
  'click #reportType3'(event,template) {
      Session.set('Sort',{reportType3:-1});
  },
  'click #reportType4'(event,template) {
      Session.set('Sort',{reportType4:-1});
  },
  'click #reportType5'(event,template) {
      Session.set('Sort',{reportType5:-1});
  },
  'click #reportType6'(event,template) {
      Session.set('Sort',{reportType6:-1});
  },
  'click #reportType7'(event,template) {
      Session.set('Sort',{reportType7:-1});
  },
  'click #reportType8'(event,template) {
      Session.set('Sort',{reportType8:-1});
  },
  'click #reportType9'(event,template) {
      Session.set('Sort',{reportType9:-1});
  },
  'click #reportType10'(event,template) {
      Session.set('Sort',{reportType10:-1});
  },
  'click #reportType11'(event,template) {
      Session.set('Sort',{reportType11:-1});
  },
  'click #reportType12'(event,template) {
      Session.set('Sort',{reportType12:-1});
  },
  'click #reportType13'(event,template) {
      Session.set('Sort',{reportType13:-1});
  },
  'click #reportType14'(event,template) {
      Session.set('Sort',{reportType14:-1});
  },

})

Template.opeReportRatings.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});