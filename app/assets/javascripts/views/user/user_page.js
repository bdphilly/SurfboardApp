SurfboardApp.Views.User = Backbone.CompositeView.extend({
  template: JST['user/user'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.addCalendar);
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

  addCalendar: function () {
    
    calendar = new SurfboardApp.Views.UserCalendar({
      model: this.model.boards().last()
    });
    this.addSubview('.calendar', calendar);
  },

});