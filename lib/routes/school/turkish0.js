import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

var turkish = FlowRouter.group({
    prefix: '/school/turkish'
});

turkish.route('/upload', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'turkishUpload',menu:'schoolMenu'})
        }
    }
})

turkish.route('/results', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'turkishResults',menu:'schoolMenu'})
        }
    }
})

turkish.route('/rating', {
    action: function(params,queryParams) {
        if (!Meteor.userId()) {
            FlowRouter.redirect('/signin')
        } else {
            BlazeLayout.render('mainLayout', {content:'turkishRating',menu:'schoolMenu'})
        }
    }
})
