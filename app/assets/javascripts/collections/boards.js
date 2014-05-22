SurfboardApp.Collections.Boards = Backbone.Collection.extend({
  model: SurfboardApp.Models.Board,

  url: "/api/boards",

  getOrFetch: function (id) {
    var boards = this;
  
    var board;
    if (board = this.get(id)) {
      board.fetch();
    } else {
      board = new SurfboardApp.Models.Board({ id: id });
      board.fetch({
        success: function () { board.add(board); }
      });
    }
  
    return board;
  },  

});