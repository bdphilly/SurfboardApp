SurfboardApp.Views.User = Backbone.CompositeView.extend({
  template: JST['user'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
  },

  render: function () {

    if (!this.model.ready()) return this;

    var renderedContent = this.template({
      user: this.model
    });
    this.$el.html(renderedContent); 

    return this;
  },

});