// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('home', {
    url: '/home',
    abstract: true,
    templateUrl: 'templates/home.html',
    controller: 'AppCtrl'
  })

  .state('home.landing', {
    url: '/landing',
    views: {
      'normalContent': {
        templateUrl: 'templates/home_landing.html',
        controller : 'landingCtrl'
      }
    }
  })


  .state('home.video', {
    url: '/video',
    views: {
      'normalContent': {
        templateUrl: 'templates/home_video.html'
      }
    }
  })

  .state('home.login', {
    url: '/login',
    views: {
      'normalContent': {
        templateUrl: 'templates/home_login.html',
        controller: 'signInCtrl'
      }
    }
  })

  .state('home.step', {
    url: '/step',
    views: {
      'normalContent': {
        templateUrl: 'templates/home_step.html'
      }
    }
  })


  // .state('app.search', {
  //   url: '/search',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/search.html'
  //     }
  //   }
  // })

    .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/app_dashboard.html',
        controller : 'dashboardCtrl'
      }
    }
  })

    .state('app.messages', {
    url: '/messages',
    views: {
      'menuContent': {
        templateUrl: 'templates/app_messages.html',
        controller : 'inboxCtrl'
      }
    }
  })

    .state('app.messages_outbox', {
    url: '/messages_outbox',
    views: {
      'menuContent': {
        templateUrl: 'templates/app_messages_outbox.html',
        controller : 'outboxCtrl'
      }
    }
  })

    .state('app.messages_compose', {
    url: '/messages_compose',
    views: {
      'menuContent': {
        templateUrl: 'templates/app_messages_compose.html',
        controller : 'composeCtrl'
      }
    }
  })

    .state('app.messages_expand', {
    url: '/messages_expand',
    views: {
      'menuContent': {
        templateUrl: 'templates/app_messages_expand.html',
        controller : 'expandCtrl'
      }
    }
  })

    .state('app.messages_expand_outbox', {
    url: '/messages_expand_outbox',
    views: {
      'menuContent': {
        templateUrl: 'templates/app_messages_expand_outbox.html',
        controller : 'expandOutboxCtrl'
      }
    }
  })
    
    .state('app.events', {
    url: '/events',
    views: {
      'menuContent': {
        templateUrl: 'templates/app_events.html',
        controller : 'eventsCtrl'
      }
    }
  })
    
    .state('app.board', {
    url: '/board',
    views: {
      'menuContent': {
        templateUrl: 'templates/app_board.html',
        controller : 'boardCtrl'
      }
    }
  })

    .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/app_profile.html',
        controller: 'studentProfileCtrl'
      }
    }
  })    

    .state('app.testimonials', {
    url: '/testimonials',
    views: {
      'menuContent': {
        templateUrl: 'templates/app_testimonial.html',
        controller : 'testimonialCtrl'
      }
    }
  })

    .state('app.testimonials_sem', {
    url: '/testimonials_sem',
    views: {
      'menuContent': {
        templateUrl: 'templates/app_testimonial_sem.html',
        controller: 'testimonial2Ctrl'
      }
    }
  })
    .state('app.suggestions', {
    url: '/suggestions',
    views: {
      'menuContent': {
        templateUrl: 'templates/app_suggestions.html',
        controller : 'suggestionsCtrl'
      }
    }
  });

  // .state('app.browse', {
  //     url: '/browse',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/browse.html'
  //       }
  //     }
  //   })

  //   .state('app.playlists', {
  //     url: '/playlists',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/playlists.html',
  //         controller: 'PlaylistsCtrl'
  //       }
  //     }
  //   })

  // .state('app.single', {
  //   url: '/playlists/:playlistId',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/playlist.html',
  //       controller: 'PlaylistCtrl'
  //     }
  //   }
  // });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/landing');
});
