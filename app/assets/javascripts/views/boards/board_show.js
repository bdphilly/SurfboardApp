SurfboardApp.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function () {

    this.listenTo(this.model, 'sync', this.render);
      
    globalmodel = this.model
      
    this.listenTo(this.model, 'sync', this.addInfoTabs);
    this.listenTo(this.model, 'sync', this.addCalendar);
  },

  render: function () {
    // console.log('rendering')
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent); 

    //Adjust board carousel speed
    this.$el.find('.carousel').carousel({
      interval: 4000
    });
    // this.attachSubviews();

    return this;
  },

  addInfoTabs: function (board) {
    var infoTabs = new SurfboardApp.Views.InfoTabs({
      model: this.model
    });
    this.addSubview('.board-info-tabs', infoTabs);
  },

  addCalendar: function () {
    // debugger
    calendar = new SurfboardApp.Views.CalendarPage({
      model: this.model
    });
    this.addSubview('.calendar', calendar);
  },

});