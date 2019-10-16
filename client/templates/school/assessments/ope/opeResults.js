import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './opeResults.html';
import {ReactiveDict} from 'meteor/reactive-dict'

Template.opeResults.onCreated(function() {
    let template = this
    this.state = new ReactiveDict();
    document.title = "OPE Нәтижелері";
    template.subjectId = new ReactiveVar('01')
    template.grade = new ReactiveVar('7')

    template.autorun(() => {
        template.subscribe("opeResults", template.subjectId.get(), template.grade.get())
    })
})

Template.opeResults.helpers({
  students(){
    return Students.find({},{sort:{surname:-1, division:1}})
  },
  showEdit(){
    const instance = Template.instance();
    return instance.state.get('showEdit');
  }
});

Template.opeResults.events({
    'change #subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    },
    'click #show-edit'(event, instance){
      instance.state.set('showEdit', true);
    },
    'click #show-save'(event, instance){
      instance.state.set('showEdit', false);
    },

    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    },
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.surname_search.set(template.find('[name=surname_search]').value)
    },
    "change #select"(event,template) {
        template.quarter.set(template.find('[name=quarter]').value)
        template.week.set(template.find('[name=week]').value)

        let quarter = FlowRouter.getParam('_id')
        let week = FlowRouter.getParam('_id')
    },
    "click #constructRating"(event,template) {
        let quarter = new Template.instance().quarter.get()

        if (quarter) {
            if (confirm(quarter + "-ші Тоқсан үшін жаңа рейтинг құрастырғыңыз келеді ме?")) {
                Meteor.call("Teacher.constructRatingAll", academicYear.get(), quarter, function(err) {
                    if(err){
                        alert(err.reason)
                    } else {
                        alert('Рейтинг құрастырылды')
                    }
                })
            }
        } else {
            alert("Тоқсан немесе апта таңдалмады")
        }
    }
})

Template.opeResults.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
