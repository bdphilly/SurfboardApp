SurfboardApp.Views.BoardResult = Backbone.View.extend({
  template: JST['boards/index/board_result'],

  initialize: function () {
    this.listenTo(this.model.photos(), 'all', this.render); //probably don't need this line
    this.listenTo(this.model, 'sync add change all', this.render);
  },

  render: function () {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

});
