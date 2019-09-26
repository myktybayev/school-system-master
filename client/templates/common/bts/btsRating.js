import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './btsRating.html';
Template.btsRating.onCreated(function(){
    let template = this
    Session.setDefault('Sort',{total:-1});

    template.grade = new ReactiveVar("all")
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("btsRating",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})

Template.btsRating.helpers({
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    results() {
        return BtsRatings.find({},{sort: Session.get('Sort')});
    }
})

Template.btsRating.events({
    "change #select"(event,template) {
        template.grade.set(template.find('[name=grade]').value)

        let grade = FlowRouter.getParam('_id')
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
    'click #sortEng'(event,template) {
        Session.set('Sort',{english:-1});
    },
    'click #sortKazakh'(event,template) {
        Session.set('Sort',{kazakh:-1});
    },
    'click #sortKazLit'(event,template) {
        Session.set('Sort',{kazakh_literature:-1});
    },
    'click #sortRus'(event,template) {
        Session.set('Sort',{russian:-1});
    },
    'click #sortAlgebra'(event,template) {
        Session.set('Sort',{algebra:-1});
    },
    'click #sortGeometry'(event,template) {
        Session.set('Sort',{geometry:-1});
    },
    'click #sortInf'(event,template) {
        Session.set('Sort',{computer:-1});
    },
    'click #sortWHistory'(event,template) {
        Session.set('Sort',{world_history:-1});
    },
    'click #sortKZHistory'(event,template) {
        Session.set('Sort',{kazakh_history:-1});
    },
    'click #sortGeography'(event,template) {
        Session.set('Sort',{geography:-1});
    },
    'click #sortTotal'(event,template) {
        Session.set('Sort',{total:-1});
    },
})
