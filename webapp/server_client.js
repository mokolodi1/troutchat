Messages = new Mongo.Collection('messages');

Meteor.methods({
  addMessage: function (newMessageText) {
    /* force user sign-in */
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (newMessageText.length > 0) {
      Messages.insert({
        messageText: newMessageText,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    }
  }
});