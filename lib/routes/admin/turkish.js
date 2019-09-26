import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var turkish = FlowRouter.group({
  prefix: '/admin/turkish'
});

turkish.route('/keys', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'turkishKeys',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

turkish.route('/keys/new', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'turkishKeysNew',menu:'adminMenu'})
        }
    },
    subscriptions: function(params,queryParams) {

    }
})

turkish.route('/keys/edit/:id', {
    action: function(params,queryParams) {
    	if (!Meteor.userId()) {
	    FlowRouter.redirect('/signin')
	} else {
	    BlazeLayout.render('mainLayout', {content:'editTurkishKeys',menu:'adminMenu'})
	   }
    },
    subscriptions: function(params,queryParams) {
    }
})

turkish.route('/rating', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'turkishRating',menu:'adminMenu'})
        }
    }
})

turkish.route('/results', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'turkishAllResults',menu:'adminMenu'})
        }
    }
})
