Rooms = new Mongo.Collection('rooms');

if (Rooms.find().count() === 0) {
  Rooms.insert({
    name: "Global",
    users: {},
    global: true,
  });
}