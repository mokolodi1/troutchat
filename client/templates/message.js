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