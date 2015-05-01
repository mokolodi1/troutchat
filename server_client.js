Messages = new Mongo.Collection('messages');

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