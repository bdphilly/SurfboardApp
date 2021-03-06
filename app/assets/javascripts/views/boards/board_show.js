SurfboardApp.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  events: {
    'click #submit-rental-request': 'generateNewRentalModal' 
  },

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
    // this.$el.find('.carousel').carousel({
    //   interval: 4000
    // });

    //Carousel Thumbnails
    // $(".carousel-thumbs li").click(function (){
    //   $('.carousel').carousel($(this).data('slide-to'));
    // });
    // $(".carousel a").click(function (){
    //   $('.carousel').carousel($(this).data('slide'));
    // });
    
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
    calendar = new SurfboardApp.Views.CalendarPage({
      model: this.model
    });
    this.addSubview('.calendar', calendar);
  },

  generateNewRentalModal: function () {
    var newRental = new SurfboardApp.Models.Rental();
    var modalView = new SurfboardApp.Views.ShowRenterModal({
      model: newRental,
      board: this.model,
    });
    $('body').append(modalView.render().$el);
    $('#new-renter-modal').modal('show');      

    $("#show-start-date").datepicker({ 
      changeMonth: true,
      changeYear: true,
      startDate: "today",
      dateFormat:'yyyy/mm/dd',
      showButtonPanel: true,
      autoclose: true,

      // onSelect: function (dateStr) {
      //   $('#endDate').datepicker('option', 'defaultDate', dateStr);
      //   $('#endDate').datepicker('option', 'minDate', dateStr);
      // },

    });
    $("#show-start-date").datepicker('setDate', ""); 

    $( "#show-end-date" ).datepicker({ changeMonth: true,
      changeMonth: true,
      changeYear: true,
      startDate: "today",
      dateFormat:'yyyy/mm/dd',
      showButtonPanel: true,
      autoclose: true,   
    });
    $("#show-end-date").datepicker('setDate', ""); 

  },

});