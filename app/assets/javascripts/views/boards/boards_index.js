SurfboardApp.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],

  initialize: function () {

    globalView = this;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.addAllBoards);
    this.listenTo(this.collection, 'sync', this.addSearchBar);
    // this.listenTo(this.collection, 'sync', this.addMap);
    // this.listenTo(this.collection, 'add', this.render);
    
  },

  events: {
    "submit form" : "runSearch",
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
    this.boardResult = new SurfboardApp.Views.BoardResult({
      model: board
    });
    this.addSubview('.board-results', this.boardResult);
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

  runSearch: function (event) {
    event.preventDefault();
    var attrs = $(event.currentTarget).serializeJSON()['filters'];
    console.log(attrs);
    //create new collection of BoardSearchResults...
    this.searchResults = new SurfboardApp.Collections.BoardSearchResults();
    
    var that = this;

    this.searchResults.fetch({
      data: attrs,
      success: function (response) {
        // you can pass additional options to the event you trigger here as well
        console.log(that.searchResults);
        alert('great success!');
        that.renderSearch(that.searchResults);
      },
      error: function (response) {
        // you can pass additional options to the event you trigger here as well
        alert('error!');
      }

    });
    console.log(that.searchResults);
    // debugger
  },

  renderSearch: function () {
    this.collection = this.searchResults;
    console.log(this.collection);
    var resultsView = new SurfboardApp.Views.BoardsIndex({
      collection: this.searchResults
    })

    ///FIGURE OUT IF ZOMBIE VIEWS!
    this.$el.find('.board-results').empty();
    this.searchResults.each(this.addBoard.bind(this));
  },

});