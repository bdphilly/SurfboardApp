SurfboardApp.Views.ShowRenterModal = Backbone.CompositeView.extend({
  template: JST['boards/show/show_renter_modal'],

  initialize: function (options) {
    this.board = options.board
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

    var start_date = $('#show-start-date').val();
    var end_date = $('#show-end-date').val();

    var newRental = new SurfboardApp.Models.Rental();
    // debugger
    newRental.set({
      board_id: this.board.id,
      start_date: start_date,
      end_date: end_date,
      price: this.board.price,
      status: 'Pending'
    });
    debugger
    var that = this;

    newRental.save({},{
      error: function (response) {
        alert('error');
      },
      success: function (response) {
        alert('success');
        that.$el.hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        SurfboardApp.myRouter.navigate('#user', {trigger: true});
      }
    });
  },

});