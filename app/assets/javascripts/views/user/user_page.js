SurfboardApp.Views.User = Backbone.CompositeView.extend({
  template: JST['user/user'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.addCalendar);

    this.listenTo(this.model.customerRentals(), 'all', this.render);

  },

  events: {
    'click .user-accept-button': 'handleAcceptance',
    'click .user-reject-button': 'handleRejection',
  },

  render: function () {
    
    $(document).ajaxError(function (event, xhr) {
      if (xhr.status == 401) {
        window.location = '#boards';
      }    
    });

    // if (!this.model.ready())  return this;
    // if (this.model.isNew()) return this;
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
    event.preventDefault();
    
    var rentalId = $(event.target).data("id");
    console.log(rentalId);
    // debugger

    this.model.rentals().getOrFetch(rentalId).approve(function () {
      alert('accepted!');
    });

  },

  handleRejection: function (event) {
    event.preventDefault();
    
    var rentalId = $(event.target).data("id");
    console.log(rentalId);
    debugger

    var x = this.model.rentals().getOrFetch(rentalId);
    // debugger
    // .deny(function () {
    //   alert('denied!');
    // });

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