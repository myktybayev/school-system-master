import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './kboRating.html';

Template.kboRating.onCreated(function(){
    let template = this
    Session.setDefault('Sort',{total:-1});
    template.grade = new ReactiveVar('all')
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('kboRating',academicYear.get(),template.grade.get(),FlowRouter.getParam('kboNo'))
    })
})
Template.kboRating.helpers({
    kboNo() {
        return FlowRouter.getParam('kboNo')
    },
    results() {
        //return KboRatings.find({},{sort:{total:-1}})
        return KboRatings.find({},{sort: Session.get('Sort')});
    },
    points(subjectId) {
        let result = KboRatings.findOne({schoolId:this.schoolId})
        if (result) {
            return result[subjectId]
        } else {
            return 0
        }
    }
})

Template.kboRating.events({
    'change .grade'(event,template) {
        template.grade.set(event.target.value)
    },
    'click #sortAlgebra'(event,template) {
        Session.set('Sort',{'01':-1});
    },
    'click #sortPhysics'(event,template) {
        Session.set('Sort',{'02':-1});
    },
    'click #sortChemistry'(event,template) {
        Session.set('Sort',{'03':-1});
    },
    'click #sortBio'(event,template) {
        Session.set('Sort',{'04':-1});
    },
    'click #sortEng'(event,template) {
        Session.set('Sort',{'05':-1});
    },
    'click #sortGeography'(event,template) {
        Session.set('Sort',{'06':-1});
    },
    'click #sortKaz'(event,template) {
        Session.set('Sort',{'07':-1});
    },
    'click #sortKazRus'(event,template) {
        Session.set('Sort',{'09':-1});
    },
    'click #sortTurkish'(event,template) {
        Session.set('Sort',{'10':-1});
    },
    'click #sortRus'(event,template) {
        Session.set('Sort',{'11':-1});
    },
    'click #sortKZHistory'(event,template) {
        Session.set('Sort',{'12':-1});
    },
    'click #sortTotal'(event,template) {
        Session.set('Sort',{total:-1});
    }
})
