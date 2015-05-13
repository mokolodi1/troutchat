var getVisibleRooms = function () {
  var globalRooms = Rooms.find({ global: true }).fetch();

  if (Meteor.userId) {
    console.log("userId is good");
    return globalRooms.concat(Meteor.users.findOne({ _id: Meteor.userId }).rooms);
  } else {
    console.log("userId not so good");
    return globalRooms;
  }
}

Tracker.autorun(function () {
  Meteor.publish("messages", function () {
    return Messages.find({
      roomId: { $in: getVisibleRooms() }
    });
  });

  Meteor.publish("rooms", function () {

    userRooms = getVisibleRooms();

    console.log(userRooms);

    if (userRooms) {
      return Rooms.find({
        _id: { $in: userRooms }
      });
    }

    console.log("only returning globals");

    return Rooms.find({ global: true });
  });
});



/*Tracker.autorun(function () {



  Meteor.publish("rooms", function () {

    if (userRooms) {
      return Rooms.find({
        $or: [
          { global: true },
          { _id: { $in: userRooms } }
        ]
      });
    }

    console.log("only returning globals");

    return Rooms.find({ global: true });
  });
});
*/