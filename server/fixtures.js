Rooms = new Mongo.Collection('rooms');
Messages = new Mongo.Collection('messages');

if (Rooms.find().count() === 0) {
  Rooms.insert({
    name: "Global",
    users: {},
    global: true
  });
}