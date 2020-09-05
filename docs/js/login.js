function init_login() {
	var URL = window.location.href;

	var redirect = URL.split( "?redirect=" );
	if( redirect.length == 1 ) {
		redirect = null;
	} else {
		redirect = decodeURIComponent( redirect[ 1 ] );
	}

	var login_shown = false;

	function success() {
		localStorage.setItem( "fasterclass.signedIn", 1 );
		if( redirect ) {
			window.location.replace( redirect );
		} else {
			window.location.replace( "../lessons" );
		}
	}

	function show_login() {
		if( login_shown ) return;
		login_shown = true;
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup( provider ).then( function( result ) {
			success();
		} ).catch( function( error ) {

		} );
	}

	function callback_auth_success( user ) {
		success();
	}

	function callback_auth_fail() {
		show_login();
	}

	init_auth( callback_auth_success, callback_auth_fail );
}

init_login();