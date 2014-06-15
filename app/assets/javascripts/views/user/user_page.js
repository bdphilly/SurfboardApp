SurfboardApp.Views.User = Backbone.CompositeView.extend({
  template: JST['user/user'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model, 'change', this.render);
    // this.listenTo(this.model, 'sync', this.addCalendar);
    // this.listenTo(this.model.rentals(), 'change', this.render);
    this.listenTo(this.model.customerRentals(), 'change', this.render);

  },

  events: {
    'click .user-accept-button': 'handleAcceptance',
    'click .user-reject-button': 'handleRejection',
    'click .board-edit-button': 'alertInDevelopment',
  },

  render: function () {
    // console.log('rendering');
    $(document).ajaxError(function (event, xhr) {
      if (xhr.status == 401) {
        window.location = '#boards';
      }    
    });
    var renderedContent = this.template({
      user: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews(); 

    return this;
  },

  addCalendar: function () {
    var user = this.model;
    var board =  user.boards().first();
    
    var calendar = new SurfboardApp.Views.UserCalendar({
      model: board
    });

    this._subviews = {};
    this.addSubview('.calendar', calendar);
  },

  handleAcceptance: function (event) {
    event.preventDefault();
    var rentalId = $(event.target).data("id");
    console.log(rentalId);
    var that = this;
    // var rental = this.model.customerRentals().getOrFetch(rentalId);

    this.model.customerRentals().getOrFetch(rentalId).approve(function () {
      // that.spinner();
      // that.model.fetch();
      that.model.customerRentals().getOrFetch(rentalId).status = "Approved";

      // that.model.customerRentals.trigger('sync');
      // that.model.customerRentals().trigger('change');
    });

  },

  handleRejection: function (event) {
    event.preventDefault();
    
    var rentalId = $(event.target).data("id");
    console.log(rentalId);
    var that = this;
    this.model.customerRentals().getOrFetch(rentalId).deny(function () {
      that.model.customerRentals().getOrFetch(rentalId).status = "Denied";
      // that.model.rentals().trigger('change');
      // that.model.trigger('change');
      // that.spinner();
    });

  },

  alertInDevelopment: function (event) {
    event.preventDefault();
    alert("Sorry, brah! This feature is still in development...");
  },

});