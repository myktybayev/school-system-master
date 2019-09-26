import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './ubtRating.html';
Template.ubtRating.onCreated(function(){
    let template = this

    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("uhdSchoolRatings",academicYear.get())
    })
})

Template.ubtRating.helpers({
    results() {
        return UhdSchoolRatings.find({},{sort: {total:-1}});
    }
})

Template.ubtRating.events({

})
