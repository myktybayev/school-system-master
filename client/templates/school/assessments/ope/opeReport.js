import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './opeReport.html';
import {ReactiveDict} from 'meteor/reactive-dict'

Template.opeReport.onCreated(function() {
    let template = this
    document.title = "OPE Репорт";
    template.subjectId = new ReactiveVar('01')
    template.grade = new ReactiveVar('7')
    template.subscribe('opes');

    template.autorun(() => {
        template.subscribe("opeResults", template.subjectId.get(), template.grade.get())
    })
})

Template.opeReport.helpers({
  students(){
    return Students.find({},{sort:{surname:-1, division:1}})
  },
  editing(){
    return Session.equals('editItemId', this._id);
  }
});

var saveItem = function(){
  var editItem = {
    ope1: $("#editOpe1").val(),
    ope2: $("#editOpe2").val(),
  }
  console.log("id: "+Session.get('editItemId'));
  console.log("Ope1: "+editItem["ope1"]);

  Meteor.call('Ope.updateOpeResults',Session.get('editItemId'),editItem)
  // Items.update(Session.get('editItemId'), {$set: editItem});
  Session.set('editItemId', null);
}

Template.opeReport.events({
  'click .editItem': function(){
    Session.set('editItemId', this._id);
  },
  'click .cancelItem': function(){
    Session.set('editItemId', null);
  },
  'click .saveItem': function(){
    saveItem();
  },
    'keypress input': function(e){
      if(e.keyCode === 13){
        saveItem();
      }
      else if(e.keyCode === 27){
        Session.set('editItemId', null);
      }
    },
    'change #subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    },
    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    },
})

Template.opeReport.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
