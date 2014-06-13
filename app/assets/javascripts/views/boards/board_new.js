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

    // $("#model").on('blur', function(event){
    //   if ($('#model').val() !== "") {
    //     $('#model').parent().removeClass('has-error');
    //     $('#model').parent().addClass('has-success');
    //   } else {
    //     $('#model').parent().removeClass('has-success');
    //     $('#model').parent().addClass('has-error');
    //   }
    // });    


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
    // debugger
    var attrs = $(event.currentTarget).serializeJSON();
    this.model.set(attrs.board);
    SurfboardApp.Collections.boards.add(this.model);
    // debugger
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
      console.log(this.model.validationError);
      this.handleValidations(this.model.validationError)
      // validate error(s) accessible in model.validationError
    }
  },

  handleValidations: function (errors) {
    $("#error").html("");
    var messages = [];

    var formFields = ['brand', 'model', 'length', 'width', 'condition', 'description',
      'price', 'address', 'city', 'state', 'zipcode', 'board_type'];

    formFields.forEach(function(field) {
      var id = "#" + field;
        $(id).parent().find('span').remove();
        $(id).parent().removeClass('has-error');
        $(id).parent().addClass('has-success');
        $(id).parent().addClass('has-feedback');
        $(id).parent().append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');

    });

    $('label[for=condition]').find('span').remove();
    $('label[for=board_type]').find('span').remove();    

    errors.forEach(function (error) {
      var id = "#" + error.name;
      // debugger
        $(id).parent().find('span').remove();
        $(id).parent().removeClass('has-success');
        $(id).parent().addClass('has-error');
        $(id).parent().addClass('has-feedback');
        $(id).parent().append('<span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>');

        messages.push(error.message)

        $('label[for=' + error.name + ']').append("<span style='color: #FF26BE'>  -  " + error.message + "</span>");

    });

    $("<div></div>").addClass("alert").addClass("alert-danger")
        .html("Brah...you forgot to fill out some information!").appendTo($("#error"));

  },
  
});
