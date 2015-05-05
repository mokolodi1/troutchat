Template.message.helpers({
	dateTime: function () {
    twentyFourHours = 12 * 60 * 60 * 1000;
    if (this.createdAt.getTime() < Date.now() - twentyFourHours)
      return this.createdAt.format("mmm d");
    else
      return this.createdAt.format("h:MM tt");
  },
  altText: function () {
    return this.createdAt.format("h:MM tt, mmm d yyyy");
  }
});

Session.setDefault("autoScrolldown", true);

Session.setDefault('isScrollingDown', false);
Session.setDefault('needToRescroll', false);

Template.message.rendered = function () {

  var scrollMeDown = function () {
    if (! Session.get("isScrollingDown")) {
      Session.set("isScrollingDown", true);
      Session.set("needToRescroll", false);
      $('body').animate({ scrollTop: $("div#messages").height() }, 50, function () {
        Session.set("isScrollingDown", false);
        if (Session.get("needToRescroll")) {
          scrollMeDown();
        }
      });
    } else {
      Session.set("needToRescroll", true);
    }
  }
  if (Session.get("autoScrolldown"))
    scrollMeDown();
};
