(function(Backbone, _, Tatami, Modernizr, window){

    var Users = Backbone.Model.extend({
        initialize: function(){
          this.listenTo(this, 'sync', function(model){
            if(Tatami.app.user.id === model.id)
              Tatami.app.user.set(model.toJSON());
          });
        },

        idAttribute: 'username',

        defaults: {
            avatar: '',
            firstName: '',
            lastName: '',
            jobTitle: '',
            attachementsSize: 0,
            friendsCount: 0,
            followersCount: 0
        },

        urlRoot: '/tatami/rest/users/',

        toJSON: function(){
            var attr = Backbone.Model.prototype.toJSON.call(this);

            attr.fullName = this.getFullName();
            attr.avatarURL = this.getAvatarURL();

            return attr;
        },

        getFullName: function(){
            var fullName = [];

            if (this.get('firstName')) fullName.push(this.get('firstName'));
            if (this.get('lastName')) fullName.push(this.get('lastName'));

            return fullName.join(' ');
        },

        getAvatarURL: function(){
            return (this.get('avatar'))? '/tatami/avatar/' + this.get('avatar') + '/photo.jpg': '/img/default_image_profile.png';
        },

        toggleIsFriend: function(options){
            this.fetch({
                friend: !this.model.get('friend')
            }, options || null);
        }
    });

    Tatami.Models.Users = Users;

})(Backbone, _, Tatami, Modernizr, window);