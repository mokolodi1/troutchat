Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {
  Template.message.helpers({
    
  });

  Template.body.events({
    "submit .new-message": function (event) {
      var text = event.target.text.value;
      Meteor.call("addMessage", text);
      event.target.text.value = "";

      // prevent default form submit (talks to web browser)
      return false;
    }
  });

  Template.body.helpers({
    hasMessages: function () {
      return Messages.find().count() !== 0;
    },
    getChats: function () {
      return Messages.find({});
    }
  });

  /* username instead of email for login */
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
  addMessage: function (newMessageText) {
    /* force user sign-in */
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }


    Messages.insert({
      messageText: newMessageText,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  }
});
