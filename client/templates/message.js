Template.message.helpers({
	dateTime: function () {
    twentyFourHours = 24 * 60 * 60 * 1000;
    if (this.createdAt.getTime() < Date.now() - twentyFourHours)
      return this.createdAt.format("mmm d yyyy hh:MM");
    else
      return this.createdAt.format("hh:MM");
  }
});