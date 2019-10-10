import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './schoolStudents.html';

Template.schoolStudents.onCreated(function() {
    let template = this
    document.title = "Оқушылар тізімі";
    template.name_search = new ReactiveVar("")
    template.surname_search = new ReactiveVar("")
    template.grade_search = new ReactiveVar("")
    template.division_search = new ReactiveVar("")
    template.subscribe("students")
    template.subscribe("kboSubjects")
})

Template.schoolStudents.helpers({
    students() {
        let name_search = new RegExp(Template.instance().name_search.get(), 'i')
        let surname_search = new RegExp(Template.instance().surname_search.get(), 'i')
        let grade_search = new RegExp(Template.instance().grade_search.get(), 'i')
        let division_search = new RegExp(Template.instance().division_search.get(), 'i')
        return Students.find({
            name:name_search,
            surname:surname_search,
            grade:grade_search,
            division:division_search
        },{sort:{grade:1,division:1,surname:1,name:1}})
    },
    subjects() {
        return KboCourses.find({},{sort:{subjectId:1}})
    },
    isOlympiadStudent(studentId,subjectId) {
        let student = Students.findOne({studentId:studentId})
        if (student && student.olympiad == subjectId)
            return 'selected'
    },
    isJobaStudent(studentId,subjectId) {
        let student = Students.findOne({studentId:studentId})
        if (student && student.joba == subjectId)
            return 'selected'
    }
});

Template.schoolStudents.events({
    "keyup #search"(event,template) {
        template.name_search.set(template.find('[name=name_search]').value)
        template.grade_search.set(template.find('[name=grade_search]').value)
        template.surname_search.set(template.find('[name=surname_search]').value)
        template.division_search.set(template.find('[name=division_search]').value)
    },
    "change #kboSubject"(event,template) {
        Meteor.call('Student.updateOlympiadSubject',this._id,event.target.value)
    },
    "change #kboSubject1"(event,template) {
        Meteor.call('Student.updateJobaSubject',this._id,event.target.value)
    },
    "click #addUser"(event,template) {
        if (confirm('Жаңа парақша қосуыңыз келеді ме??')) {
            Meteor.call("Student.addUser", this._id, function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    alert("Парақша қосылды")
                }
            })
        }
    },
    "click #addMultipleUsers"(event,template) {
        if (confirm('Барлық окушылардың парақшаларын қосқыңыз келеді ме???')) {
            Meteor.call("Student.addMultipleUsers", function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    alert("Парақшалар қосылды")
                }
            })
        }
    },
    "click #deleteAccount"(event,template) {
        event.preventDefault()

        if (confirm('Оқушының парақшасын жойыңыз келеді ме?')) {
            Meteor.call("Student.deleteAccount", this._id, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
            alert("Оқушының парақшасы жойылды")
        }
    },
    "click #deleteMultipleUsers"(event,template) {
        if (confirm('Барлық окушылардың парақшаларын жойыңыз келеді ме???')) {
            Meteor.call("Student.deleteMultipleUsers", function(err) {
                if(err){
                    alert(err.reason)
                } else {
                    alert("Парақшалар жойылды")
                }
            })
        }
    },
    'click #resetStudentPassword'() {
        if (confirm("Are u sure?"))
            Meteor.call('resetStudentPassword',this.studentId,(err,res) => {
            if (err) {
                alert(err.reason)
            } else {
                alert('Сақталды')
            }
        })
    },
    "click #transfer"(event,template) {
        event.preventDefault()

        if (confirm('Оқушыны трансфер тізіміне аударғыңыз келеді ме?')) {
            Meteor.call("Student.transfer", this._id, function(err) {
                if(err){
                    alert(err.reason)
                }
            })
        }
    },
    "click #deleteStudent"(event,template) {
        event.preventDefault()

        bootbox.confirm("Оқушыны өшіргіңіз келеді ме?"+this._id, function(result){
            if(result){

            }
        });


            // Meteor.call("Student.transfer", this._id, function(err) {
            //     if(err){
            //         alert(err.reason)
            //     }
            // })


    }
})

Template.schoolStudents.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover", placement:'left'});
});
