SurfboardApp.Views.AlreadyRentedModal = Backbone.CompositeView.extend({
  template: JST['boards/show/already_rented_modal'],

  initialize: function () {
    
  },

  events: {

  },

  render: function () {
    
    var renderedContent = this.template({
    });
    
    this.$el.html(renderedContent);

    return this;
  },

});