function init_auth( cb_succ, cb_fail ) {
	var checked = false;

	if( !localStorage.getItem( "fasterclass.signedIn" ) ) cb_fail();

	function callback_auth( user ) {
		if( checked ) return;
		checked = true;
		if( user ) {
			localStorage.setItem( "fasterclass.signedIn", 1 );
			cb_succ( user );
		} else {
			localStorage.removeItem( "fasterclass.signedIn" );
			cb_fail();
		}
	}

	firebase.auth().onAuthStateChanged( callback_auth );
}