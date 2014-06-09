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
    this.spinner();
    var currentUser = new SurfboardApp.Models.User();
    var that = this;

    currentUser.fetch({
      success: function () {
        var userView = new SurfboardApp.Views.User({
          model: currentUser
        });
        that._swapView(userView);        
      }
    });
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

  spinner: function() {
    $(document.getElementById('home-main')).empty();

    var opts = {
      lines: 9, // The number of lines to draw
      length: 40, // The length of each line
      width: 4, // The line thickness
      radius: 30, // The radius of the inner circle
      corners: 0.5, // Corner roundness (0..1)
      rotate: 11, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#0AC2FF', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 17, // Afterglow percentage
      shadow: true, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
    };

    var target = document.getElementById('content');
    $(target).html('<div id="spinner"></div>')
    var spinner = new Spinner(opts).spin(target);
  }

});
