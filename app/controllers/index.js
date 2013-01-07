function doClick(e) {  
    alert($.label.text);
}

$.facebook.addEventListener("click", facebookAuth);

$.fblogout.addEventListener("click", facebookLogout);

$.twitter.addEventListener("click", twitterAuth);

$.google.addEventListener("click", gAuth);



function facebookAuth(){
	Ti.Facebook.appid = '561985213827318';
	// Ti.Facebook.permissions = ['publish_stream']; // Permissions your app needs
	Ti.Facebook.addEventListener('login', function(e) {
		if (e.success) {
			Ti.API.info(':::::::USER ACCESS TOKEN::::::::');
			Ti.API.info(Ti.Facebook.accessToken);
		} else if (e.error) {
			alert(e.error);
		} else if (e.cancelled) {
			alert("Canceled");
		}
	});
	Ti.Facebook.authorize();
}

function facebookLogout(){
	Ti.Facebook.addEventListener('logout', function(e) {
	    alert('Logged out');
	});
	Ti.Facebook.logout();
}

function twitterAuth(){
	var client = require("twitter").Twitter({
		consumerKey: "bdWOI3iLBjkXmDuVMAyvTw",
		consumerSecret: "volQHjvzjlB3zXpkHECplMv3lPQWWWm69F2XHwyR4Q"
	});

	client.authorize(); // Pops up a modal WebView

	client.addEventListener('login', function(e) {
	  if (e.success) {
	    // Your app code goes here... you'll likely want to save the access tokens passed in the event.
	    Ti.API.info(':::::::::::::::User access token:::::::::::::::');
	    Ti.API.info(e);
	    // Here's an example API call:
	    client.request("1/statuses/home_timeline.json", {count: 100}, 'GET', function(e) {
	      if (e.success) {
	        var data = JSON.parse(e.result.text);
	      } else {
	        alert(e.error);
	      }
	    });
	  } else {
	    alert(e.error);
	  }
	});
}

function gAuth(){
	var GoogleAuth = require('googleAuth');
	var googleAuth = new GoogleAuth({
	    clientId : '597936831104.apps.googleusercontent.com',
	    clientSecret : 'w3n3w88IwExfUvyUgQH7YQbc',
	    propertyName : 'googleToken',
	    scope : ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/tasks.readonly']
	});
	//  googleAuth.isAuthorized(function() {
 //        Ti.API.info('Access Token: ' + googleAuth.getAccessToken());
 //        //user is authorized so do something... just dont forget to add accessToken to your requests

 //    }, function() {
 //        //authorize first
 //        googleAuth.authorize();
 //        Ti.API.info('auth::::::::::::::::::::::::::::::::::::::::::');
 //    });

    Ti.API.info('Authorized: ' + googleAuth.isAuthorized());
	googleAuth.isAuthorized(function() {
		Ti.API.info('Access Token: ' + googleAuth.getAccessToken());
		// table.setData([]);
		
	}, function() {
		Ti.API.info('Authorize google account...');
		googleAuth.authorize();
	});
}


$.window.open();