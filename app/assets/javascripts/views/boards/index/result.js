SurfboardApp.Views.IndexResult = Backbone.View.extend({
  template: JST['boards/index/result'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

});
