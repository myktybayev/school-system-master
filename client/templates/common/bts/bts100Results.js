import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './bts100Results.html';
Template.bts100Results.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar("7")
    //template.schoolId_select = new ReactiveVar("")
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("btsAllResults",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})
Template.bts100Results.helpers({
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    results() {
        return BtsResults.find({},{sort:{total:-1}})
    }
})

Template.bts100Results.events({
    'change .grade'(event,template) {
        template.grade.set(event.target.value)
    }
})
