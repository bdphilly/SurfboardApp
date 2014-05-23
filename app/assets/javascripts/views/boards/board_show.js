SurfboardApp.Views.BoardShow = Backbone.View.extend({
  template: JST['boards/show'],

  initialize: function () {

  //   globalView = this;
    // globalModel = this.model;
    this.listenTo(this.model, 'sync', this.render);
    this.model.fetch();

  //  this.listenTo(this.model, 'sync', this.addBoard);
  //   this.listenTo(this.collection, 'sync', this.addSearchBar);
    
    
  },

  render: function () {
    console.log('rendering')

    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent); 

    return this;
  },

  // addBoard: function (board) {
  //   var boardResult = new SurfboardApp.Views.BoardResult({
  //     model: board
  //   });
  //   this.addSubview('.board-results', boardResult);
  // },

  // addSearchBar: function () {
  //   var searchBar = new SurfboardApp.Views.SearchBar({ 
  //     boards: this.collection 
  //   });

  //   this.addSubview('.search-bar', searchBar);
  // },



});
