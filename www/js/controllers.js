var app_data = angular.module("data", []).constant('student_key', 'dummy-key');
var app = angular.module('starter.controllers', ['ionic','ngCordova']);


app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicTabsDelegate) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

app.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

app.controller('testimonialCtrl', function($scope, $stateParams, $http) {
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log('Testimonials Logged Status: ' + $scope.get_logged_status);
  if($scope.get_logged_status == 'false')
    window.location ='#/login';

  $http.get('http://infosys.esy.es/ion/json_testimonials.php')
  .success(function(response){
    $scope.testimonials = response.testimonial_data;
  });
})

app.controller('testimonial2Ctrl', function($scope, $stateParams) {
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log('Testimonials 2nd sem Logged Status: ' + $scope.get_logged_status);
  if($scope.get_logged_status == 'false')
    window.location ='#/login';
  
})

app.controller('composeCtrl', function($scope, $stateParams, $http, $cordovaToast) {
  $scope.studentNumber = sessionStorage.getItem('student_number');
  console.log('compose student number: ' + $scope.studentNumber);
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log('Compose Logged Status: ' + $scope.get_logged_status);
  if($scope.get_logged_status == 'false')
  {  window.location ='#/login'; }

  $scope.sendMessage = function(message, duration, location){
    if($scope.txtEmail == null || $scope.txtMessage == null)
    {
      console.log('email or message fields are empty');
      $cordovaToast.show('Sending failed. either fields are empty! ', 'long', 'bottom').then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    } 
    else
    {
      console.log('Email chosen: ' + $scope.txtEmail);
      console.log('Repy text: ' + $scope.txtMessage);

      $scope.studentNumber = sessionStorage.getItem('student_number');
      $http.post('http://infosys.esy.es/ion/json_compose_message.php',
        {'to' : $scope.txtEmail , 'message': $scope.txtMessage , 'from' : $scope.studentNumber})
      .success(function(data){
        console.log(data);
        $scope.txtEmail = null;
        $scope.txtMessage = null;
      })

      $cordovaToast.show(message, duration, location).then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
      
    } 
      
  }

  $http.post('http://infosys.esy.es/ion/json_student_list.php',
    { 'student_number' : $scope.studentNumber })
  .success(function(data){
    //console.log(response);
    console.log(data[1][0]); // log json email sent from php
    $scope.emails = data[1][0]; // assign json email to scope
  }); //end controller


})

app.controller('inboxCtrl', function($scope, $stateParams, $http, $state) {
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log('Inbox Logged Status: ' + $scope.get_logged_status);
  if($scope.get_logged_status == 'false')
    window.location ='#/login';

  sessionStorage.removeItem('passedId'); //resets session for passed values
  sessionStorage.removeItem('passedFrom'); 
  sessionStorage.removeItem('passedMessage');

  $scope.studentNumber = sessionStorage.getItem('student_number');
  $scope.doRefresh = function(){
      $http.post('http://infosys.esy.es/ion/json_inbox.php',
      {'student_number' : $scope.studentNumber})
      .success(function(data){
        if(data[0]['has_message'] == true)
        {
          console.log('student has message');
          $scope.messages = data;
          $scope.has_message = true;
        }else{
          console.log('Refreshed No mEssage');
          $scope.no_message = true;
        }
      })
      .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     })
  }

  $http.post('http://infosys.esy.es/ion/json_inbox.php',
    {'student_number' : $scope.studentNumber})
  .success(function(data){
      console.log('has message? ' + data[0]['has_message']); //check if student has any msgs
      if(data[0]['has_message'] == true)
       {
        console.log('student has message');
        $scope.messages = data;
        $scope.has_message = true;
       } 
      else
      {
        console.log('student has no messages');
        $scope.no_message = true;
      }
     
  })

  $scope.passValue = function(id, from, message, date){ //pass value
    sessionStorage.setItem('passedId', id);
    sessionStorage.setItem('passedFrom', from);
    sessionStorage.setItem('passedMessage', message);
    sessionStorage.setItem('passedDate', date);

    $scope.passedId = sessionStorage.getItem('passedId');
    $scope.passedFrom = sessionStorage.getItem('passedFrom');
    $scope.passedMessage = sessionStorage.getItem('passedMessage');
    $scope.passedDate = sessionStorage.getItem('passedDate');
    //console.log('root scopes passed: '+ $scope.passedId + $scope.passedFrom + $scope.passedMessage + $scope.passedDate);
    $state.go('app.messages_expand');
  }

})//end inbox controller

app.controller('outboxCtrl', function($scope, $stateParams, $http, $state) {
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log('Outbox Logged Status: ' + $scope.get_logged_status);
  if($scope.get_logged_status == 'false')
    window.location ='#/login';

  $scope.studentNumber = sessionStorage.getItem('student_number');
  $scope.doRefresh = function(){
      $http.post('http://infosys.esy.es/ion/json_outbox.php',
      {'student_number' : $scope.studentNumber})
      .success(function(data){
        if(data[0]['has_message'] == true)
        {
          console.log('has refreshed outbox message');
          console.log(data);
          $scope.messages_outbox = data;
        }else{
          console.log('no refreshed outbox message');
          $scope.no_message = true;
        }
      })
      .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     })
  }

  $http.post('http://infosys.esy.es/ion/json_outbox.php',
    {'student_number' : $scope.studentNumber})
  .success(function(data){
    console.log('has message outbox? ' + data[0]['has_message']);
    if(data[0]['has_message'] == true)
    { 
      console.log('has outbox message');
      console.log(data);
      $scope.has_message = true;
      $scope.messages_outbox = data;
    }else{
      console.log('no outbox message');
      $scope.no_message = true;
    }
  })

  $scope.passOutboxValue = function(id, to, from, message, date){ //pass value
    sessionStorage.setItem('passedOutboxId', id);
    sessionStorage.setItem('passedOutboxTo', to);
    sessionStorage.setItem('passedOutboxFrom', from);
    sessionStorage.setItem('passedOutboxMessage', message);
    sessionStorage.setItem('passedOutboxDate', date);

    $scope.passedOutboxId = sessionStorage.getItem('passedOutboxId');
    $scope.passedOutboxTo = sessionStorage.getItem('passedOutboxTo');
    $scope.passedOutboxFrom = sessionStorage.getItem('passedOutboxFrom');
    $scope.passedOutboxMessage = sessionStorage.getItem('passedOutboxMessage');
    $scope.passedOutboxDate = sessionStorage.getItem('passedOutboxDate');
    console.log('Outbox session passed: '+ $scope.passedOutboxId + $scope.passedOutboxTo + $scope.passedOutboxFrom + $scope.passedOutboxMessage + $scope.passedOutboxDate);
    $state.go('app.messages_expand_outbox');
  }

})


app.controller('expandOutboxCtrl', function($scope, $stateParams, $http) {
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log('Expand Message Outbox Logged Status: ' + $scope.get_logged_status);
  if($scope.get_logged_status == 'false')
  {  window.location ='#/login'; }

  $scope.passedOutboxId = sessionStorage.getItem('passedOutboxId');
  $scope.passedOutboxTo = sessionStorage.getItem('passedOutboxTo');
  $scope.passedOutboxFrom = sessionStorage.getItem('passedOutboxFrom');
  $scope.passedOutboxMessage = sessionStorage.getItem('passedOutboxMessage');
  $scope.passedOutboxDate = sessionStorage.getItem('passedOutboxDate');

  console.log('Passed From outbox ID: ' + $scope.passedOutboxId);
  console.log('Passed From outbox to: ' + $scope.passedOutboxTo);
  console.log('Passed From outbox from: ' + $scope.passedOutboxFrom);
  console.log('Passed From outbox message: ' + $scope.passedOutboxMessage);
  console.log('Passed From outbox date: ' + $scope.passedOutboxDate);

})


app.controller('dashboardCtrl', function($scope, $stateParams, $http) {

  $scope.displaySN = '';
  $scope.studentNumber = sessionStorage.getItem('student_number');
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log("Dashboard Page Logged Status: " + $scope.get_logged_status);

  if($scope.get_logged_status == 'false')
    window.location ='#/login';

})

app.controller('eventsCtrl', function($scope, $stateParams, $http) {
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log('Events Logged Status: ' + $scope.get_logged_status);
  if($scope.get_logged_status == 'false')
    window.location ='#/login';

  $http.get('http://infosys.esy.es/ion/json_events.php')
  .success(function(response){
    $scope.events = response.event_data;
      $scope.studentNumber = sessionStorage.getItem('student_number');
      //console.log( $scope.studentNumber);
  });
})

app.controller('boardCtrl', function($scope, $stateParams, $http) {
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log('Board Logged Status: ' + $scope.get_logged_status);
  if($scope.get_logged_status == 'false')
    window.location ='#/login';

  $http.get('http://infosys.esy.es/ion/json_board.php')
  .success(function(response){
    $scope.boards = response.announcement_data;
      $scope.studentNumber = sessionStorage.getItem('student_number');
      //console.log( $scope.studentNumber);
  });
})

app.controller('signInCtrl', function($scope, $stateParams, $http, $cordovaToast) {
  $scope.get_logged_status = sessionStorage.getItem('logged_status');

  console.log('Sign In Page Logged Status: '+ $scope.get_logged_status);
  if($scope.get_logged_status == 'true')
    //console.log('should redirect');
  {  window.location ='#/app/dashboard'; }
 //sessionStorage.removeItem('logged_status');
  //sessionStorage.removeItem('student_number');
  $scope.txtUsername = '';
  $scope.txtPassword = '';

  $scope.signIn = function(message, duration, location){
    $http.post('http://infosys.esy.es/ion/json_login.php',
      {'username' : this.txtUsername, 'password': this.txtPassword})
    .success(function(data){
      if(data[0]['logged'] === true)
      {
        $scope.unable = false;
        sessionStorage.setItem('student_number', data[0]['student_number']);
        $scope.studentNumber = sessionStorage.getItem('student_number');
        $scope.logged_status = sessionStorage.setItem('logged_status', true);
        window.location = '#/app/dashboard';
      }else{
        console.log('Unable to Login. Logged Status: '+$scope.get_logged_status);
        //show toast
        $cordovaToast.show(message, duration, location).then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
        //$scope.unable = true;
        // var popup = $ionicPopup.alert({
        //   title : 'Login failed!',
        //   template : 'Unable to Login. Incorrect details.'
        // });

      }
      //console.log(data[0]['logged']);
    })
  }//end sign in function

}) //end controller

app.controller('landingCtrl', function($scope, $stateParams, $cordovaNetwork) {
  sessionStorage.setItem('logged_status', false);
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log('Landing Page Logged Status: '+$scope.get_logged_status);
  if($cordovaNetwork.isOffline()){ //Toast of no connection if offline
    $cordovaToast.show('No Internet Connection!', 'long', 'bottom').then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
  }
})

app.controller('studentProfileCtrl', function($scope, $stateParams, $http, $cordovaToast) {
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log('Profile Logged Status: ' + $scope.get_logged_status);
  if($scope.get_logged_status == 'false')
  {  window.location ='#/login'; }

  $scope.studentNumber = sessionStorage.getItem('student_number');
  console.log('Profile student number: ' + $scope.studentNumber);
  
  $http.post('http://infosys.esy.es/ion/json_profile.php',
  { 'student_number' : $scope.studentNumber})
  .success(function(data){
    console.log(data.profile[0]); // get returned object
    $scope.profile_data = data.profile[0];
    $scope.txtBirthdate = $scope.profile_data.birthdate;
    $scope.txtAddress = $scope.profile_data.address;
  })
  $scope.txtBirthdate = '';
  $scope.txtAddress = '';

  $scope.update = function(message, duration, location){
    console.log('value from txtbox' + this.txtBirthdate);
    console.log('value from txtbox' + this.txtAddress);
    console.log('Update student number: ' + $scope.studentNumber);

    $http.post('http://infosys.esy.es/ion/json_update_profile.php',
      { 'student_number' : $scope.studentNumber , 'birthdate' : this.txtBirthdate , 'address' : this.txtAddress})
    .success(function(data){
      console.log(data);
    })

    $cordovaToast.show(message, duration, location).then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
  }

})

app.controller('suggestionsCtrl', function($scope, $stateParams, $http, $cordovaToast) {
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log('Suggesttions Logged Status: ' + $scope.get_logged_status);
  if($scope.get_logged_status == 'false')
    window.location ='#/login';
  
  $scope.studentNumber = sessionStorage.getItem('student_number');
  $scope.suggest = function(message, duration, location){
    if($scope.txtSuggestion == null || $scope.txtSuggestion == ''){
      console.log('suggestion field empty');
      $cordovaToast.show('Sending failed! Suggestion feild empty.', 'long', 'bottom').then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    }else{
      console.log('has value');

      $http.post('http://infosys.esy.es/ion/json_suggestions.php',
        { 'student_number' : $scope.studentNumber , 'message' : $scope.txtSuggestion })
      .success(function(data){
        console.log(data);
      })

        $cordovaToast.show(message, duration, location).then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });

      

    }
    
  }
})


app.controller('expandCtrl', function($scope, $stateParams, $http, $cordovaToast) {
  $scope.get_logged_status = sessionStorage.getItem('logged_status');
  console.log('Expand Message Logged Status: ' + $scope.get_logged_status);
  if($scope.get_logged_status == 'false')
  {  window.location ='#/login'; }
  
  $scope.studentNumber = sessionStorage.getItem('student_number');
  $scope.getPassedId = sessionStorage.getItem('passedId');
  $scope.getPassedFrom = sessionStorage.getItem('passedFrom');
  $scope.getPassedMessage = sessionStorage.getItem('passedMessage');
  $scope.getPassedDate = sessionStorage.getItem('passedDate');

  console.log('Passed id: ' + $scope.getPassedId);
  console.log('Passed from: ' + $scope.getPassedFrom);
  console.log('Passed message: ' + $scope.getPassedMessage);
  console.log('Passed date: ' + $scope.getPassedDate);
  console.log('logged Student number: ' + $scope.studentNumber);
  $scope.sendReply = function(message, duration, location){
    if($scope.txtReply == null) //check if empty reply
    { 
      console.log('empty');
      $cordovaToast.show('Message is empty!', 'short', 'bottom').then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    }
    else{
      $http.post('http://infosys.esy.es/ion/json_send_reply.php',
      { 
        'from' : $scope.studentNumber,
        'to' : $scope.getPassedFrom,
        'message' : $scope.txtReply
      })
      .success(function(data) {
        console.log(data[0]['replied']);
        if(data[0]['replied'])
        {
          console.log('replied success');
          $scope.txtReply = null;
            $cordovaToast.show(message, duration, location).then(function(success) {
              console.log("The toast was shown");
            }, function (error) {
                console.log("The toast was not shown due to " + error);
            });
        }  
        else
          console.log('unreplied');
      })
    } // end else
  }

})


app.controller('PlaylistCtrl', function($scope, $stateParams) {
});

