SurfboardApp.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],

  initialize: function () {

    globalView = this;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.addAllBoards);
    this.listenTo(this.collection, 'sync', this.addSearchBar);
    this.listenTo(this.collection, 'sync', this.addMap);
    // this.listenTo(this.collection, 'add', this.render);
    
  },

  render: function () {
    var renderedContent = this.template({
      boards: this.collection
    });

    this.$el.html(renderedContent);

    this.attachSubviews();
    return this;
  },

  addBoard: function (board) {
    var boardResult = new SurfboardApp.Views.BoardResult({
      model: board
    });
    this.addSubview('.board-results', boardResult);
  },

  addAllBoards: function () {
    this.collection.each(this.addBoard.bind(this));
    // this.addMap();
  },

  addSearchBar: function () {
    var searchBar = new SurfboardApp.Views.SearchBar({ 
      boards: this.collection 
    });

    this.addSubview('.search-bar', searchBar);
  },

  addMap: function () {
    map = new SurfboardApp.Models.mapModel();
    var mapResults = new SurfboardApp.Views.BoardsMap({
      model: map,
      collection: SurfboardApp.Collections.boards
    });
    this.addSubview('.map-view', mapResults)
  },

});
