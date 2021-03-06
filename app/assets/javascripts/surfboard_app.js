window.SurfboardApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    SurfboardApp.myRouter = new SurfboardApp.Routers.router({
      $rootEl: $('#content')
    });
    
    SurfboardApp.Collections.boards = new SurfboardApp.Collections.Boards();
    SurfboardApp.Models.map = new SurfboardApp.Models.MapModel();
    SurfboardApp.Collections.boards.fetch();
    Backbone.history.start();
  }
};

//originally had this in root.html.erb...I think I like it better here...
$(document).ready(function(){
  SurfboardApp.initialize();
});