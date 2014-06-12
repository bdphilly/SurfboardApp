SurfboardApp.Views.BoardNew = Backbone.CompositeView.extend({
  template: JST['boards/new'],

  events: {
      "submit form" : "submit",
      "change input[type=file]" : "encodeFile"
  },

  // initialize: function () {

  //   globalView = this;
  //   this.listenTo(this.collection, 'sync', this.render);
  //   this.listenTo(this.collection, 'sync', this.addAllBoards);
  //   this.listenTo(this.collection, 'sync', this.addSearchBar);
  // }, 

  render: function () {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);

    // this.attachSubviews();
    return this;
  },

  encodeFile: function (event) {
    var that = this;
    var file = event.currentTarget.files[0];
    
    console.log(file);
    
    var reader = new FileReader();
    reader.onload = function(e) {
        console.log(e.target.result);
        // that.model.set({ attachment: e.target.result });
        that.model.set({ images_attributes: [{attachment: e.target.result }] });
    }
    reader.onerror = function(stuff) {
        console.log("error", stuff)
        console.log (stuff.getMessage())
    }
    reader.readAsDataURL(file);
  },

  submit: function (event) {
    event.preventDefault();
    debugger
    var attrs = $(event.currentTarget).serializeJSON();
    this.model.set(attrs.board);
    SurfboardApp.Collections.boards.add(this.model);
    debugger
    this.model.save({}, {
      success: function () {
        alert('success!');           
        window.location.assign("");
      },
      error: function (model, errors) {
        alert('error!');
        console.log(errors);
      }
    });
    if (this.model.validationError) {
      debugger
      console.log('error!');
      // validate error(s) accessible in model.validationError
    }
  },
  
});
