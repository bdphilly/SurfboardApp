SurfboardApp.Views.User = Backbone.CompositeView.extend({
  template: JST['user'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
  },

  render: function () {

    //if !ready return this;

    var renderedContent = this.template({
      user: this.model
    });
    this.$el.html(renderedContent); 

    return this;
  },

  ready: function () {
    //if (user.boards().first()) && ...
    
  },

});

// url: <%= user.boards().first().photos().get('small') %>

// <% if (user.boards().first().photos()) { %>
//   <img src="<%= user.boards().first().photos().get('small') %>" 
//     class="avatar-photo img-responsive img-thumbnail" alt="Avatar Photo">
// <% } else { %>
//     <img src="" class="search-photo img-responsive img-thumbnail" alt="No Avatar Present">
// <% } %>
