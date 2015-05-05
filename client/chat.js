Rooms = new Mongo.Collection('rooms');
Messages = new Mongo.Collection('messages');

Meteor.subscribe("rooms", function () {
  Session.set("currentRoomId", Rooms.findOne({ global: true })._id);
});
Meteor.subscribe("messages", function () {
  Session.set("messagesLoaded", true);
});

/* username instead of email for login */
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

Session.setDefault("editingSettings", false);

Template.leftBar.events({
  "click #settings-or-rooms": function () {
    Session.set("editingSettings", ! Session.get("editingSettings"));
    return 0;
  },
  "click .room": function (event) {
    Session.set("currentRoomId", event.currentTarget.attributes.name.value);
    return 0;
  }
});

Template.leftBar.helpers({
  editingSettings: function () {
    return Session.get("editingSettings");
  }
});

/*
** settings template
*/

Template.settings.events({
  "click #toggle-auto-scrolldown": function () {
    Session.set("autoScrolldown", ! Session.get("autoScrolldown"));
  },
  "submit #create-room": function (event) {

    // I have no idea how to do this
    roomName = $("#room-name").val();
    usernames = $("#usernames").val().split(",");

    console.log("roomName = " + roomName);
    console.log("usernames = " + usernames);

    Meteor.call("createChatRoom", roomName, usernames);

    $("#room-name").val("");
    $("#usernames").val("");

    Meteor.subscribe("rooms");

    return false;
  }
});

Template.settings.helpers({
  autoScrolldown: function () {
    return Session.get("autoScrolldown");
  }
});

/*
** about roomList template
*/

Template.roomList.helpers({
  rooms: function () {
    return Rooms.find();
  }
});

/*
** ABOUT CHAT
*/

// whether the messages have loaded
Session.setDefault("messagesLoaded", false);

Template.chat.helpers({
  isLoaded: function () {
    // do I need to link to this?
    return Session.get("messagesLoaded");
  },
  hasMessages: function () {
    return Messages.find().count() !== 0;
  },
  getChats: function () {
    return Messages.find({ roomId: Session.get("currentRoomId") });
  }
});
