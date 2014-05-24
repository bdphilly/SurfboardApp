SurfboardApp.Views.InfoTabs = Backbone.View.extend({
  template: JST['boards/show/info_tabs'],

  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
  },

  events: {
    "click a[data-toggle='tab']": 'toggleInfoTabs',
  },

  render: function () {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);

    // this.$el.find('#info-tabs').click(function (event){
    //   event.preventDefault();
    //   $(this).tab('show');
    // })

    return this;
  },

  toggleInfoTabs: function (event) {
    // debugger
    event.preventDefault();
    $(event.currentTarget).tab('show');
  },

});


// $('[data-toggle=tab]').click(function(){
//   if ($(this).parent().hasClass('active')){
//   $($(this).attr("href")).toggleClass('active');
//   }
// })