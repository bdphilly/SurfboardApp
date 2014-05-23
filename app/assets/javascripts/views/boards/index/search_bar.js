SurfboardApp.Views.SearchBar = Backbone.View.extend({
  template: JST['boards/index/search_bar'],

  initialize: function () {
    // this.listenTo(this.collection, 'sync change', this.render);
  },

  events: {

  },

  render: function () {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);

    this.$el.find('#datepicker').datepicker({
      startDate: "today",
      autoclose: true,
      todayHighlight: true
    });

    return this;
  },

});
