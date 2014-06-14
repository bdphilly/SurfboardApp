SurfboardApp.Views.PastDatesModal = Backbone.CompositeView.extend({
  template: JST['boards/show/past_dates_modal'],

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