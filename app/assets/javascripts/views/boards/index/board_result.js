SurfboardApp.Views.BoardResult = Backbone.View.extend({
  template: JST['boards/index/board_result'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    // console.log("rendering" + this.model.id)
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

});
