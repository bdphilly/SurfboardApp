window.SurfboardApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    
    new SurfboardApp.Routers.router({
      $rootEl: $('#content')
    });
    
    SurfboardApp.Collections.boards = new SurfboardApp.Collections.Boards();

    Backbone.history.start();
  }
};