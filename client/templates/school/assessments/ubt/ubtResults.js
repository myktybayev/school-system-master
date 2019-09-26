import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './ubtResults.html';
Template.ubtResults.onCreated(function(){
    let template = this
    template.state = new ReactiveVar("results")
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("uhdResults",academicYear.get())
    })
})
Template.ubtResults.helpers({
    resultButton() {
        return 'results'==Template.instance().state.get()
    },
    results() {
        return UhdResults.find({},{sort:{total:-1}})
    }
})

Template.ubtResults.events({
    "click #window1"(event,template) {
        Template.instance().state.set("notResults")
    
    },
    "click #window2"(event,template) {
        Template.instance().state.set("results")
    }
})
