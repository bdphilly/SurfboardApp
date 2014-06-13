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
      console.log('happy days');
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
      console.log('unhappy days');
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

  spinner: function() {

    var opts = {
      lines: 9, // The number of lines to draw
      length: 40, // The length of each line
      width: 4, // The line thickness
      radius: 30, // The radius of the inner circle
      corners: 0.5, // Corner roundness (0..1)
      rotate: 11, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#0AC2FF', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 17, // Afterglow percentage
      shadow: true, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
    };

    var target = document.getElementById('content');
    $(target).html('<div id="spinner"></div>')
    var spinner = new Spinner(opts).spin(target);
  },

});

    // var checkedButton = $('input[type="radio"]:checked').val()
    // console.log(checkedButton)
    
    // var that = this;

    // this.model.events[0].rental[checkedButton](function () {
    //     that.$el.hide();
    //     $('body').removeClass('modal-open');
    //     $('.modal-backdrop').remove();
    // });



// BoardRental.new({board_id: 7, start_date: "2014-07-04", end_date: "2014-07-08", status: "Approved", renter_id: 6, price: 10})