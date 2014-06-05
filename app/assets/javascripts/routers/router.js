SurfboardApp.Routers.router = Backbone.Router.extend({
  initialize: function (options) {
		this.$rootEl = options.$rootEl;
    this.$altEl = $('#home-main');
	},

  routes: {
    "": "homePage",
    "boards": "boardsIndex",
    "boards/new": "boardsNew",
    "user": "userPage",
    "map": "map",
    "calendar": "calendarPage",
    "boards/:id": "boardsShow"
  },

  userPage: function () {
    var currentUser = new SurfboardApp.Models.User();
    currentUser.fetch();
    var userView = new SurfboardApp.Views.User({
      model: currentUser
    });

    this._swapView(userView);
  },

  homePage: function () {
    var homeView = new SurfboardApp.Views.HomePage();

    this._swapView(homeView, this.$altEl);
  },

  boardsIndex: function () {
    // SurfboardApp.Collections.boards.fetch();
    var indexView = new SurfboardApp.Views.BoardsIndex({
      collection: SurfboardApp.Collections.boards
    });

    this._swapView(indexView);
  },

  boardsNew: function () {
    var currentUser = new SurfboardApp.Models.User();
    currentUser.fetch();
        $(document).ajaxError(function (event, xhr) {
      if (xhr.status == 401) {
        window.location = '/users/new';
      }    
    });
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

  _swapView: function (newView, $altEl) {
    if (this._currentView) {
      this._currentView.remove();
    }

    var $renderEl = $altEl || this.$rootEl;

    this._currentView = newView;

    $renderEl.html(newView.render().$el);
  },

});
