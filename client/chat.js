Rooms = new Mongo.Collection('rooms');

// whether the messages have loaded
Session.setDefault("messagesLoaded", false);

// scroll down automatically with new messages
Session.setDefault("autoScrolldown", true);

Meteor.subscribe("messages", function () {
  Session.set("messagesLoaded", true);
});

Template.body.events({
  "click #toggle-autoscrolldown": function () {
    Session.set("autoScrolldown", ! Session.get("autoScrolldown"));
  }
});

Template.body.helpers({
  autoScrolldown: function () {
    return Session.get("autoScrolldown");
  },
  isLoaded: function () {
    // do I need to link to this?
    return Session.get("messagesLoaded");
  },
  hasMessages: function () {
    return Messages.find().count() !== 0;
  },
  getChats: function () {
    return Messages.find({});
  }/*,
  rooms: function () {
    console.log("getting rooms");
    return Rooms.find({
      $or: [
        { global: true },
        { Meteor.userId() ===  }
      ]
    });
  }*/
});

/* username instead of email for login */
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Router.route('/', function () {
  this.render('');
});