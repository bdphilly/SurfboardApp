SurfboardApp.Views.UserCalendar = Backbone.View.extend({

  template: JST['boards/calendar'],
  template2: JST['user/user_calendar'],

  initialize: function () {
    this.events = [];
    this.setEvents();
    var that = this;
    
    this.listenTo(this.model.rentals(), 'change', function() {
      
      that.setEvents();
      that.render();
    });
  },

  render: function () {
    console.log('rendering user calendar view');
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
        rental: rental, 
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
              that.displayApprovedModel(target);
            } else {
              that.addModal(target);  
            }
          } else {
            that.generateOptionToMakeUnavailableModel();
          }

          console.log(target.events[0]);
          console.log(target.events[0].status);
          // console.log(target.events[0].price);
           
        },

      },

      doneRendering: function() {
        console.log("the events: ");
        console.log(theEvents);
      },
    });    
  },

  addModal: function (rentalParams) {
    var modalView = new SurfboardApp.Views.UserModal({
      model: rentalParams
    });
    $('body').append(modalView.render().$el);
    $('#user-modal').modal('show')
  },

  generateOptionToMakeUnavailableModel: function () {
    var newRental = new SurfboardApp.Models.Rental();
    var modalView = new SurfboardApp.Views.NewRenterModal({
      model: newRental
    });
    $('body').append(modalView.render().$el);
    $('#new-renter-modal').modal('show')
  },

  displayApprovedModel: function (rentalParams) {
    var modalView = new SurfboardApp.Views.UserApprovedModal({
      model: rentalParams
    });
    $('body').append(modalView.render().$el);
    $('#approved-modal').modal('show')
  },
  
});