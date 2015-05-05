Template.newMessageForm.rendered = function() {
  // makes the text box grow dynamically
  $(".new-message").autoGrow();

  // This should be in Template.thisName.events but I couldn't figure
  // out how to hook it up
  $(".new-message").keypress(function (event) {
    if (event.which == 13) {
      var text = $(event.target).val();      

      if (text.length > 0) {
        Meteor.call("addMessage", text, Session.get("currentRoomId"));
        $(event.target).val("");
      }

      event.preventDefault();
    }
  });
};

Template.newMessageForm.helpers({
  placeholder: function () {
    if (Meteor.userId())
      return "Enter your message...";
    else
      return "Please log in to send messages";
  },
  notSignedIn: function () {
    return ! Meteor.userId();
  },
  readonly: function () {
    if (Meteor.userId())
      return "";
    else
      return "readonly";
  }
})
