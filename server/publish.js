Meteor.publish("messages", function () {
  return Messages.find({});
});

Meteor.publish("rooms", function () {
  console.log("about to set bleh");
  console.log(Meteor.users.findOne({ _id: this.userId }).rooms);

  if (Meteor.users.findOne({ _id: this.userId }).rooms) {
    bleh = Rooms.find({
      $or: [
        { global: true },
        { _id: { $in: Meteor.users.findOne({ _id: this.userId }).rooms } }
      ]
    });
  } else {
    bleh = Rooms.find({ global: true });
  }

  console.log(bleh.fetch());
  return bleh;
});
