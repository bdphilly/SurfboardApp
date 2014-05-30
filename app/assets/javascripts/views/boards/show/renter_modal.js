SurfboardApp.Views.RenterModal = Backbone.CompositeView.extend({
  template: JST['boards/show/renter_modal'],

  initialize: function () {
    
  },

  events: {

  },

  render: function () {
    var renderedContent = this.template({
      rental: this.model.events[0]
    });
    
    this.$el.html(renderedContent);

    return this;
  },

});