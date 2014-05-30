SurfboardApp.Views.NewRenterModal = Backbone.CompositeView.extend({
  template: JST['boards/show/new_renter_modal'],

  initialize: function () {
    
  },

  events: {

  },

  render: function () {
    
    var renderedContent = this.template({
      rental: this.model
    });
    
    this.$el.html(renderedContent);

    return this;
  },

});