SurfboardApp.Views.User = Backbone.CompositeView.extend({
  template: JST['user/user'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'all', this.addCalendar);
  },

  events: {
  },



  render: function () {
    
    // if (!this.model.ready())  return this;
    // if (this.model.isNew()) return this;
    var renderedContent = this.template({
      user: this.model
    });
    


    this.$el.html(renderedContent);

    this.addCalendar();

    this.attachSubviews(); 

    return this;
  },

  addCalendar: function () {
    var user = this.model;
    var board =  user.boards().getOrFetch('6');
    
    var calendar = new SurfboardApp.Views.UserCalendar({
      model: board
    });

    this.addSubview('.calendar', calendar);
  },

});

// BoardRental.new({board_id: 7, start_date: "2014-07-04", end_date: "2014-07-08", status: "Approved", renter_id: 6, price: 10})