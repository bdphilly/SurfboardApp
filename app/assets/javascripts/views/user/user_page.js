SurfboardApp.Views.User = Backbone.CompositeView.extend({
  template: JST['user/user'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model, 'sync', this.addCalendar);
    this.listenTo(this.model.rentals(), 'change', this.render);

    // this.listenTo(this.model.customerRentals(), 'all', this.render);

  },

  events: {
    'click .user-accept-button': 'handleAcceptance',
    'click .user-reject-button': 'handleRejection',
    'click .board-edit': 'alertInDevelopment',
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

    // this.addCalendar();

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
    debugger
    event.preventDefault();
    var rentalId = $(event.target).data("id");
    console.log(rentalId);
    // debugger
    var that = this;
    this.model.rentals().getOrFetch(rentalId).approve(function () {
      // that.remove();
      // that.render();
      console.log('happy days');
      that.render();
      that.model.rentals().trigger('change');
      that.model.trigger('change');
    });

  },

  handleRejection: function (event) {
    debugger
    event.preventDefault();
    
    var rentalId = $(event.target).data("id");
    console.log(rentalId);
    var that = this;
    this.model.rentals().getOrFetch(rentalId).deny(function () {
      that.model.rentals().trigger('change');
      that.model.trigger('change');
    });

  },

  alertInDevelopment: function (event) {
    debugger
    event.preventDefault();

    alert("Sorry, brah! This feature is still in development...");
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