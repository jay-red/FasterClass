function init_secure( cb_succ ) {
	var user = null;

	function callback_user_create( err ) {
		if( err ) {

		} else {
			cb_succ( user );
		}
	}

	function callback_user( snapshot ) {
		if( snapshot.exists() ) {
			cb_succ( user );
		} else {
			var data = {};
			data[ "active" ] = true;
			firebase.database().ref( "/users/" + user.uid ).set( data, callback_user_create );
		}
	}

	function callback_auth_success( u ) {
		user = u;
		firebase.database().ref( "/users/" + user.uid ).once( "value" ).then( callback_user );
	}

	function callback_auth_fail() {
		window.location.replace( "../login?redirect=" + encodeURIComponent( window.location.href ) );
	}

	init_auth( callback_auth_success, callback_auth_fail );
}