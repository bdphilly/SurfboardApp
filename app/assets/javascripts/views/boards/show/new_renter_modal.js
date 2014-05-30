SurfboardApp.Views.NewRenterModal = Backbone.CompositeView.extend({
  template: JST['boards/show/new_renter_modal'],

  initialize: function (options) {
    this.board = options.board;
    this.date = options.date
  },

  events: {
    'click #renter-submit': 'handleRequest'
  },

  render: function () {
    var renderedContent = this.template({
      board: this.board,
      rental: this.model
    });
    
    this.$el.html(renderedContent);

    return this;
  },

  handleRequest: function (event) {
    event.preventDefault();

    var checkedButton = $('input[type="radio"]:checked').val();
    var end_date = $('#user-reservation-end-date').val();
    console.log(checkedButton)

    var newRental = new SurfboardApp.Models.Rental();
    debugger
    newRental.set({
      board_id: this.board.id,
      start_date: this.date.format('YYYY-MM-DD'),
      end_date: end_date,
      price: this.board.price,
      status: 'Pending'

    });

    newRental.save({},{
      error: function (response) {
        alert(response);
      }
    });

    // this.model.events[0].rental[checkedButton](function () {
    //     that.$el.hide();
    //     $('body').removeClass('modal-open');
    //     $('.modal-backdrop').remove();
    // });
  },

});