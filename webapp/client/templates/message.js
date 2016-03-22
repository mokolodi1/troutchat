Template.message.helpers({
	dateTime: function () {
    twelveHours = 12 * 60 * 60 * 1000;
    if (this.createdAt.getTime() < Date.now() - twelveHours * 2)
      return this.createdAt.format("mmm d yyyy hh:MM TT");
    else if (this.createdAt.getTime() < Date.now() - twelveHours)
      return this.createdAt.format("hh:MM TT");
    else
      return this.createdAt.format("hh:MM");
  }
});

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

  scrollMeDown();
};
