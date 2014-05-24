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

//originally had this in root.html.erb...I think I like it better here...
$(document).ready(function(){
  SurfboardApp.initialize();
});