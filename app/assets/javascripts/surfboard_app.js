window.SurfboardApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    alert('Hello from Backbone!');
    new SurfboardApp.Routers.Router();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  SurfboardApp.initialize();
});
