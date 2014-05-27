SurfboardApp.Routers.router = Backbone.Router.extend({
  initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

  routes: {
    "": "boardsIndex",
    "new": "boardsNew",
    "map": "map",
    "calendar": "calendarPage",
    ":id": "boardsShow"
  },

  // calendarPage: function () {
  //   calendar = new SurfboardApp.Views.CalendarPage();
  //   this._swapView(calendar);
  // },

  map: function () {
    map = new SurfboardApp.Models.mapModel();
    SurfboardApp.Collections.boards.fetch();
    var view = new SurfboardApp.Views.PageBoardsMap({
      model: map,
      collection: SurfboardApp.Collections.boards
    });
    
    this._swapView(view);
  },

  boardsIndex: function () {
    SurfboardApp.Collections.boards.fetch();
    var indexView = new SurfboardApp.Views.BoardsIndex({
      collection: SurfboardApp.Collections.boards
    });

    this._swapView(indexView);
  },

  boardsNew: function () {
    var board = new SurfboardApp.Models.Board();
    var newView = new SurfboardApp.Views.BoardNew({
      model: board
    });

    this._swapView(newView);
  },

  boardsShow: function (id) {
    var board = SurfboardApp.Collections.boards.getOrFetch(id);
    // debugger
    board.fetch();
    var showView = new SurfboardApp.Views.BoardShow({
      model: board
    });

    this._swapView(showView);
    board.fetch();
  },

  _swapView: function (newView) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = newView;

    this.$rootEl.html(newView.render().$el);
  },

});
