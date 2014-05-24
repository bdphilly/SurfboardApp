SurfboardApp.Views.InfoTabs = Backbone.View.extend({
  template: JST['boards/show/info_tabs'],

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

    this.$el.find('#info-tabs').click(function (event){
      event.preventDefault();
      $(this).tab('show');
    })

    return this;
  },

});


$('[data-toggle=tab]').click(function(){
  if ($(this).parent().hasClass('active')){
  $($(this).attr("href")).toggleClass('active');
  }
})