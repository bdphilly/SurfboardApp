SurfboardApp.Views.UserModal = Backbone.CompositeView.extend({
  template: JST['user/modal'],

  initialize: function () {
    
  },

  events: {
    'click #user-accept': 'handleSubmission'
  },

  render: function () {
    var renderedContent = this.template({
      rental: this.model.events[0]
    });
    
    this.$el.html(renderedContent);

    return this;
  },

  handleSubmission: function (event) {
    event.preventDefault();

    var checkedButton = $('input[type="radio"]:checked').val()
    console.log(checkedButton)
    
    var that = this;

    this.model.events[0].rental[checkedButton](function () {
        that.$el.hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    });
  },

});