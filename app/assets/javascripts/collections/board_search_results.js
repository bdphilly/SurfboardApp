SurfboardApp.Collections.BoardSearchResults = Backbone.Collection.extend({
  model: SurfboardApp.Models.Board,

  initialize: function(models, options) {
    
  },

  url: "/api/boards/search",

  getOrFetch: function (id) {
    var boards = this;
  
    var board;
    if (board = this.get(id)) {
      board.fetch();
    } else {
      board = new SurfboardApp.Models.Board({ id: id });
      board.fetch({
        success: function () { boards.add(board); }
      });
    }
  
    return board;
  },  

});