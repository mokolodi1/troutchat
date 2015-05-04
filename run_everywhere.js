Messages = new Mongo.Collection('messages');
//Rooms = new Mongo.Collection('rooms');
UserRooms = new Mongo.Collection('userRooms');

Meteor.methods({
  addMessage: function (newMessageText) {
    // force user sign-in
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
  },
  createChatRoom: function (name, userList) {
    // force user sign-in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Rooms.insert({
      name: name,
      users: userList
    })
  }
});

// unclear where to put this
Meteor.users.deny({
  update: function() {
    return true;
  }
});
/*
Router.route("/", function () {
  this.layout(first, {to: 'hello'});
});

Router.route('/hello/:stuff', function () {
  var stuff = this.params.stuff;
  console.log("stuff: ", stuff);
  this.layout('asdf');
});*/