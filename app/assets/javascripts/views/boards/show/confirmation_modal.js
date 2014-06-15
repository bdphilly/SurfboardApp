SurfboardApp.Views.ConfirmationModal = Backbone.CompositeView.extend({
  template: JST['boards/show/confirmation_modal'],

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