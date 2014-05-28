SurfboardApp.Views.User = Backbone.CompositeView.extend({
  template: JST['user'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent); 

    return this;
  },

});