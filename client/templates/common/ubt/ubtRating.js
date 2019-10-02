import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './ubtRating.html';

import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

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
  "click #export"(event,template) {
    const html = document.getElementById('out').innerHTML;


    var resultStore = UhdSchoolRatings.findOne({},{sort:{total:-1}});

    var row = new Array();
    var data = new Array();

    var i = 0;
    for (var key in resultStore) {
        row[i] = key;
        i += 1;
    }
    row[2] = "Mektep";
    data.push(row);

    var schoolRatingsArray = UhdSchoolRatings.find({},{sort:{total:-1}}).fetch();
    for(var i = 0; i < schoolRatingsArray.length; i++){
      let array = [];
      let values = Object.values(schoolRatingsArray[i]);
      Array.prototype.push.apply(array, values);

      const schoolName  = Schools.findOne({schoolId: schoolRatingsArray[i].schoolId});
      array[2] = schoolName.shortName;
      data.push(array);
    }

    for(var i = 0 ; i < data.length ; i++)
    {
       data[i].splice(0,1);
    }

    // console.log(data);
    let year = academicYear.get();
    Meteor.call('download', data, (err, wb) => {
      if (err) throw err;

      let sName = 'Ubt rating '+year+'.xlsx';
      XLSX.writeFile(wb, sName);
    });

  }
})
