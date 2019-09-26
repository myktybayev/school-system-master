import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './tatTop10Results.html';

Template.tatTop10Results.onCreated(function(){
    let template = this
    template.subjectId = new ReactiveVar('01')
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('tatAllSeparateResults',academicYear.get(),template.subjectId.get(),FlowRouter.getParam('tatNo'))
    })

})

Template.tatTop10Results.helpers({
    tatNo() {
        return FlowRouter.getParam('tatNo')
    },
    results() {
        return TatResults.find({},{sort:{result:-1}})
    }
})

Template.tatTop10Results.events({
    'change .subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    }
})
