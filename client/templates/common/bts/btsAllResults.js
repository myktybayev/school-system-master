import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsAllResults.html';
Template.btsAllResults.onCreated(function(){
    let template = this
    template.grade = new ReactiveVar("7")
    template.schoolId_select = new ReactiveVar("")
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("btsAllResults",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})
Template.btsAllResults.helpers({
    
    schools()  {
        return Schools.find({},{sort:{schoolId:1}})
    },
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    results() {
        let schoolId_select = new RegExp(Template.instance().schoolId_select.get())
        return BtsResults.find({schoolId:schoolId_select},{sort:{total:-1}})
    }
})

Template.btsAllResults.events({
    
    "change #select"(event,template) {
        template.schoolId_select.set(template.find('[name=schoolId_select]').value)
        template.grade.set(template.find('[name=grade]').value)

        let schoolId_select = FlowRouter.getParam('_id')
        let grade = FlowRouter.getParam('_id')
    }
})
