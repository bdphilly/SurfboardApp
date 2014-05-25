SurfboardApp.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],

  initialize: function () {

    globalView = this;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.addAllBoards);
    this.listenTo(this.collection, 'sync', this.addSearchBar);
    
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
    debugger
    this.collection.each(this.addBoard.bind(this));
    
  },

  addSearchBar: function () {
    var searchBar = new SurfboardApp.Views.SearchBar({ 
      boards: this.collection 
    });

    this.addSubview('.search-bar', searchBar);
  },



});
