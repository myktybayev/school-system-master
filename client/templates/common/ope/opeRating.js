import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './opeRating.html';

Template.opeRating.onCreated(function() {
    let template = this
    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")
    template.quarter = new ReactiveVar("")
    template.week = new ReactiveVar("all")
    template.subscribe("subjects")

    // template.autorun(() => {
    //     template.subscribe("teacherPerformaRating",academicYear.get())
    // })
})

Template.opeRating.helpers({
    results() {
        let name_search = new RegExp(Template.instance().name_search.get(), 'i')
        let surname_search = new RegExp(Template.instance().surname_search.get(), 'i')
        let quarter = new Template.instance().quarter.get()
        let week = new Template.instance().week.get()

        // return TeacherPerformaRating.find({
        //     name:name_search,
        //     surname:surname_search,
        //     quarter:quarter,
        //     week:week,
        // },{sort:{surname:1,name:1,subjectId:1}})
    }
});

Template.opeRating.events({
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

Template.opeRating.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
