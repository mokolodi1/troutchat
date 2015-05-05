//Messages = new Mongo.Collection('messages');
//Rooms = new Mongo.Collection('rooms');

Meteor.methods({
  addMessage: function (newMessageText, roomId) {
    // force user sign-in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (! Rooms.findOne({_id: roomId})) {
      throw new Meteor.Error("room-not-set");
    }

    if (newMessageText.length > 0) {
      Messages.insert({
        messageText: newMessageText,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
        roomId: roomId
      });
    }
  },
  createChatRoom: function (name, userList) {
    // force user sign-in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    // check to see if usernames are valid

    if (userList.length < 1) {
      throw new Meteor.Error("no-users-specified");
    }

    for (var i in userList) {
      current = Meteor.users.findOne({ username: userList[i] });
      if (! current) {
        console.log("NOPE");
        throw new Meteor.Error("no-such-user");
      }
      userList[i] = current._id;
    }

    newRoom = Rooms.insert({
      name: name,
      global: false
    });

    for (var i in userList) {
      console.log("updating: " + userList[i])
      Meteor.users.update({ _id: userList[i] }, { $addToSet: { rooms: newRoom } });
    }
  }
});

// unclear where to put this
Meteor.users.deny({
  update: function() {
    return true;
  }
});