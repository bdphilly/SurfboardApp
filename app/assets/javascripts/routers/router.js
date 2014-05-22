SurfboardApp.Routers.router = Backbone.Router.extend({
  initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

  routes: {
    "": "boardsIndex",
    "boards/new": "boardsNew",
    "boards/:id": "boardsShow"
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

    var newView = new SurfboardApp.Views.BoardsNew({
      model: board
    });

    this._swapView(newView);
  },

  boardsShow: function (id) {
    var board = SurfboardApp.Collections.boards.getOrFetch(id);

    var showView = new SurfboardApp.Views.BoardsShow({
      model: board
    });

    this._swapView(showView);
  },

  _swapView: function (newView) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = newView;

    this.$rootEl.html(newView.render().$el);
  },

});
