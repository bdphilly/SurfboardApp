SurfboardApp.Views.UserModal = Backbone.CompositeView.extend({
  template: JST['user/modal'],

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