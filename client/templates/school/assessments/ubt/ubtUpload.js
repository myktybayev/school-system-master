import XLSX from 'xlsx';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './ubtUpload.html';

Template.ubtUpload.onCreated(function() {
    let template = this
    document.title = "ҰБТ жүктеу";
    template.results = new ReactiveVar([])
    template.quarter = new ReactiveVar('1')
    //template.errors = new ReactiveVar(false)
    template.subscribe("students")
    template.subscribe('schools')

})

Template.ubtUpload.helpers({
    results() {
        return Template.instance().results.get()
    }
});

Template.ubtUpload.events({
    'change #upload' (event,template) {

        const file = event.currentTarget.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            const name = file.name;

            Meteor.call('upload', data, name, function(err, wb) {
                if(err) alert(err);
                else {
                    // res = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header : ['studentId', 'grade', 'studentSurname', 'studentName', 'ubt1','ubt2','ubt3','ubt4','ubt5','ubt6','ubt7','ubt8','ubt9','ubt10',
                    // 'ubt11','ubt12','ubt13','ubt14','ubt15','ubt16','ubt17','ubt18','ubt19','ubt20','ubt21','ubt22','ubt23','ubt24','ubt25','ubt26','ubt27','ubt28','ubt29','ubt30','ubt31','ubt32','ubt33','ubt34']})
                    res = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header : 0})
                    template.results.set(res)
                }
            });
        };
        reader.readAsBinaryString(file);
  },
  'click #dnload' () {
      const html = document.getElementById('out').innerHTML;

      var data = [];
      var headers = ['studentId', 'grade', 'studentSurname', 'studentName', 'ubt1','ubt2','ubt3','ubt4','ubt5','ubt6','ubt7',
      'ubt8','ubt9','ubt10',
      'ubt11','ubt12','ubt13','ubt14','ubt15','ubt16','ubt17','ubt18','ubt19','ubt20','ubt21','ubt22','ubt23','ubt24',
      'ubt25','ubt26','ubt27','ubt28','ubt29','ubt30','ubt31','ubt32','ubt33','ubt34'];

      data.push(headers);

      let schoolName = Schools.findOne({userId: Meteor.userId()}).secondaryName;
      let students = Students.find({grade: "11"}, {sort:{division: 1}}).fetch()

      students.forEach(student =>{
        let content = [ student.studentId, student.grade+student.division, student.surname, student.name, "50", "50", "80" ];
        data.push(content);
      });

      let splited = schoolName.split(' ');
      let shortN = splited[0];

      console.log(shortN);

      Meteor.call('download', data, (err, wb) => {
        if (err) throw err;

        let sName = 'ubt_students_'+academicYear.get()+' '+shortN+'.xlsx';
        XLSX.writeFile(wb, sName);
      });

        /*
        address: "Бегалиева Балнұр Болатовна"
        birthDate: "11/26/2002"
        division: "A"
        elective1: "04"
        elective2: "03"
        fatherName: "Бегалиева Балнұр Болатовна"
        gender: "male"
        grade: "11"
        hasProfile: "yes"
        languageGroup: "kaz"
        motherName: "Егембердиевич Нурлан Елтанович"
        name: "Тамерлан"
        oldSchoolId: "014"
        olympiad: "free"
        phone: "87016454772"
        prev_grade: "7"
        schoolId: "020"
        studentId: 18968
        surname: "Егембердиев"
        userId: "ZcdH3Sy66AWAf3LRv"
        _id: "AAnRgcBXJMkbZcfKP"
        */

  },

    "click #save"(event,template) {
        event.preventDefault()
        if(template.results.get().length > 0) {
            SUIBlock.block('Жүктелуде...');
            Meteor.call("UbtResults.Upload", academicYear.get(), template.results.get(),function (err) {
                if (err) {
                    alert(err.reason)
                    SUIBlock.unblock();
                } else {
                    template.results.set([])
                    SUIBlock.unblock();
                    alert("Сақталды")
                }
            });
            return
        }
        alert("Файл таңдалмады немесе қателер табылды")
    },
    "change #select"(event,template) {
        template.quarter.set(template.find('[name=quarter]').value)

        let quarter = FlowRouter.getParam('_id')
    },
})


  // Meteor.call('download', html, function(err, wb) {
  //   if (err) throw err;
  //
  //   const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //   saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'example_for_ubt.xlsx');
  // });
