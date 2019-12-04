import { Meteor } from 'meteor/meteor';

Meteor.methods({
    resetSchoolPassword(schoolId) {
        //adminRequired()
        let school = Schools.findOne({schoolId: schoolId})
        if (school) {
            Accounts.setPassword(school.userId,'school'+school.schoolId)
        }
    },
    editConfig: function(id,num,val) {
        if (!this.userId)
            return

        if (!Roles.userIsInRole(this.userId,"admin"))
            return

        let conf = Configs.findOne({_id:id})
        if(conf) {
            conf[num] = val
            Configs.update({_id:conf._id},{$set:conf})

        }else{
            var fild = val;
            if(id == 'ketPetUpload'){

              let newConf = {
                "2": "disabled",
                "4": "disabled",
                "_id" : "ketPetUpload"
              }
              Configs.insert(newConf)

            }else{

              let newConf = {
                fild: num,
                "_id" : "opeUpload"
              }
              Configs.insert(newConf)

            }
        }
    },

/*
    addMultipleUsers: function() {
        let schools = Schools.find().fetch()
        _.each(schools,(school) => {
            let newUserData = {
                username: "school" + school.schoolId,
                password: "school" + school.schoolId
            };
            let userId = Accounts.createUser(newUserData);
            Roles.addUsersToRoles(userId,["school"])
            Schools.update({_id:school._id},{$set:{userId:userId}})
        })
    }
*/

    "addUsers": function(schoolObj) {
        if(Roles.userIsInRole(this.userId,'admin')) {
            let school = schoolObj

            let newUserData = {
                username: "school" + school.schoolId,
                password: "school" + school.schoolId
            };

            let userId = Accounts.createUser(newUserData);
            Roles.addUsersToRoles(userId,['school'])
            school.userId = userId
            Schools.insert(school)
            console.log("school added:" + school.shortName)
            }
    },

    "lessonObjectives.Insert": function (objectives) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')

            //check if same variant exists in database
        sameObjective = LessonObjectives.findOne({
            grade: objectives.grade,
            id:objectives.id,
            objective: objectives.objective,
            topic:objectives.topic
        })
        if (sameObjective)
            throw new Meteor.Error(322, 'same objective already exists')
        objectiveId = LessonObjectives.insert(objectives)
        return objectiveId;
    },

    "lessonObjectives.Delete": function(_id) {
            if(Roles.userIsInRole(this.userId,['admin'])) {
                let objective = LessonObjectives.findOne({_id:_id})
                if(objective) {
                    LessonObjectives.remove({_id:_id})
                }
            } else {
                throw new Meteor.Error('auth-error','Admin rights required.')
            }
    },

    "lessonObjectives.Update": function(_id,objectives) {
        if (!this.userId || !Roles.userIsInRole(this.userId, ['admin']))
            throw new Meteor.Error(401, 'Please login as administrator')

        console.log(objectives)
        sameObjective = LessonObjectives.findOne({_id:_id});
        if (sameObjective) {
            LessonObjectives.update({_id:_id},{$set:objectives})
        }
    },

})
