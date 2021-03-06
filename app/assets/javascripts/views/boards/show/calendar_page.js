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
   
      var tempStatus = "Approved"
      
      if (rental.get('status') === 'Approved') {
        tempStatus = 'Rented';
      } else if (rental.get('status') === 'Pending') {
        tempStatus = 'Pending';
      } else if (rental.get('status') === 'Denied') {
        tempStatus = 'Denied';
      }

      that.events.push({ 
        start: rental.get('start_date'), 
        end: rental.get('end_date'),
        status: tempStatus,
        price: rental.get('price')
      });

    });
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
          if (target.date < moment().add('days', -1)) {
            that.displayPastDatesModal();
          } else {
            if (target.events[0]) {
              if (target.events[0].status === "Rented") {
                that.displayAlreadyRentedModal();
              } else {
                that.generateNewRentalModal(target.date.format('L'));
              }
            } else {
              that.generateNewRentalModal(target.date.format('L'));
            }
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

  generateNewRentalModal: function (startDate) {
    var newRental = new SurfboardApp.Models.Rental();
    var modalView = new SurfboardApp.Views.ShowRenterModal({
      model: newRental,
      board: this.model
    });
    $('body').append(modalView.render().$el);
    $('#new-renter-modal').modal('show');     
    
    $("#show-start-date").datepicker({ 
      changeMonth: true,
      changeYear: true,
      startDate: 'today',
      dateFormat:'yyyy/mm/dd',
      showButtonPanel: true,
      autoclose: true,
      todayHighlight: true,

      // onSelect: function (dateStr) {
      //   $('#endDate').datepicker('option', 'defaultDate', dateStr);
      //   $('#endDate').datepicker('option', 'minDate', dateStr);
      // },
    });
    $("#show-start-date").datepicker('setDate', startDate); 
    
    $( "#show-end-date" ).datepicker({ changeMonth: true,
      changeYear: true,
      startDate: 'today',
      dateFormat:'yyyy/mm/dd',
      showButtonPanel: true,
      autoclose: true,   
    });
    $("#show-end-date").datepicker('setDate', ""); 
  },

  displayAlreadyRentedModal: function () {
    var modalView = new SurfboardApp.Views.AlreadyRentedModal();
    $('body').append(modalView.render().$el);
    $('#already-rented-modal').modal('show')
  },

  displayPastDatesModal: function () {
    var modalView = new SurfboardApp.Views.PastDatesModal();
    $('body').append(modalView.render().$el);
    $('#past-dates-modal').modal('show')
  },

});