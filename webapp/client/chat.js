Template.body.helpers({
  hasMessages: function () {
    return Messages.find().count() !== 0;
  },
  getChats: function () {
    return Messages.find({}, {
      sort: { createdAt: 1 }
    });
  }
});

/* username instead of email for login */
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
