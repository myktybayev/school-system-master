import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var ope = FlowRouter.group({
    prefix: '/school/ope'
});

ope.route('/results', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'opeResults',menu:'schoolMenu'})
        }
    }
})

ope.route('/rating', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'opeRating',menu:'schoolMenu'})
        }
    }
})

ope.route('/report', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'opeReport',menu:'schoolMenu'})
        }
    }
})

ope.route('/reportResults', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'opeReportResults',menu:'schoolMenu'})
        }
    }
})
