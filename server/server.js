Meteor.publish("messages", function () {
  return Messages.find({});
});

Meteor.publish("rooms", function () {
  return Messages.find({});
});