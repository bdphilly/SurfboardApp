SurfboardApp.Views.UserModal = Backbone.CompositeView.extend({
  template: JST['user/modal'],

  initialize: function () {
    
  },

  events: {

  },

  render: function () {
    debugger
    var renderedContent = this.template({
      rental: this.model.events[0]
    });
    
    this.$el.html(renderedContent);

    return this;
  },

});