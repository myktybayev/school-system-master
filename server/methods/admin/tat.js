import { recheck } from "../../modules/tat/recheck";

Meteor.methods({
    /*addTatKey: function(obj) {
        if (Roles.userIsInRole(this.userId,['admin'])) {
            var keyWithSameId = TatAnswerKeys.findOne(obj);
            academ = AcademicYears.findOne({now:true});
            obj.academicYear = academ.academicYear;
            obj.keys = obj.keys.replace(/\s+/g, '');
            if (!keyWithSameId)
                id = TatAnswerKeys.insert(obj);
            else
                throw new Meteor.Error('duplicate-error','Duplicate error!');
        } else {
            throw new Meteor.Error('access-denied','Access denied!');
        }
    },*/
    "TatAnswerKeys.Insert": function(obj) {
        if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
            sameKey = TatAnswerKeys.findOne({
                academicYear: obj.academicYear,
                tatNo: obj.tatNo,
                variant: obj.variant
            });
            if (!sameKey) {
                obj.keys = obj.keys.replace(/\s+/g, '');
                id = TatAnswerKeys.insert(obj);
                return id;
            } else {
                throw new Meteor.Error(403, 'Duplicate error');
            }
        } else {
            throw new Meteor.Error(403, 'Access forbidden');
        }
    },

    "TatAnswerKeys.Update": function(id,obj) {
        if (this.userId && Roles.userIsInRole(this.userId, ['admin'])) {
            sameKey = TatAnswerKeys.findOne({_id:id});
            if (sameKey) {
                TatAnswerKeys.update({_id:id},{$set:obj})
                //re calculates results and rating for given key and kbo
                recheck(sameKey.academicYear,sameKey.tatNo,sameKey.variant)
            }
        } else {
            throw new Meteor.Error(403, 'Access forbidden');
        }  
    },

    "TatAnswerKeys.Delete": function(id) {
            if(Roles.userIsInRole(this.userId,['admin'])) {
                let answerKeys = TatAnswerKeys.findOne({_id:id})
                if(answerKeys) {
                    TatAnswerKeys.remove({_id:id})
                }
            } else {
                throw new Meteor.Error('auth-error','Admin rights required.')
            }
    }
});
