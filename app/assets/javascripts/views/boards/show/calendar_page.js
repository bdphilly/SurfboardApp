SurfboardApp.Views.CalendarPage = Backbone.View.extend({

  template: JST['boards/calendar'],
  template2: JST['boards/renter_calendar'],

  initialize: function () {
    this.events = [];
    this.setEvents();

    // this.listenTo(this.model.rentals(), 'all', this.renderCalendar);

  },

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent); 

    this.renderCalendar();
    return this;
  },

  setEvents: function (callback) {
    var rentals = this.model.rentals();
    var that = this;
    
    rentals.each(function(rental){
      that.events.push({ 
        start: rental.get('start_date'), 
        end: rental.get('end_date'),
        status: rental.get('status'), 
        price: rental.get('price')
      });
      
    });
    // this.renderCalendar();
  },

  renderCalendar: function () {
    var theEvents = this.events;
    var that = this;

    this.$('.cal2').clndr({
      
      render: function (data) {
        return that.template2(data);
      },

      events: theEvents,

      multiDayEvents: {
        startDate: 'start',
        endDate: 'end'
      },

      clickEvents: {
        click: function(target) { 
          
          console.log(target);
          if (target.events[0]) {
            
            if (target.events[0].status === "Approved") {
              debugger
              that.displayAlreadyRentedModal();
            } else {
              that.addModal(target);  
            }
          } else {
            that.generateNewRentalModal();
          }

        },
      },
    });    
  },

  addModal: function (rentalParams) {
    var modalView = new SurfboardApp.Views.RenterModal({
      model: rentalParams,
      board: this.model
    });
    $('body').append(modalView.render().$el);
    $('#myModal').modal('show')
  },

  generateNewRentalModal: function () {
    var newRental = new SurfboardApp.Models.Rental();
    var modalView = new SurfboardApp.Views.NewRenterModal({
      model: newRental,
      board: this.model
    });
    $('body').append(modalView.render().$el);
    $('#new-renter-modal').modal('show')
  },

  displayAlreadyRentedModal: function () {
    var modalView = new SurfboardApp.Views.AlreadyRentedModal();
    $('body').append(modalView.render().$el);
    $('#already-rented-modal').modal('show')
  },

});