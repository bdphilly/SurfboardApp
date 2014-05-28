SurfboardApp.Views.HomePage = Backbone.CompositeView.extend({
  template: JST['home'],

  initialize: function () {

  },

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent); 

    return this;
  },

});