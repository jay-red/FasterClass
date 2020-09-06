function init_learn( user ) {
	var EDITOR_DIV = document.getElementById( "code-editor" ),
		BUTTON_SAVE = document.getElementById( "save-button" ),
		BUTTON_RUN = document.getElementById( "run-button" )
		DIV_IFRAME_DEMO = document.getElementById( "demo-iframe-div" ),
		DIV_IFRAME_TEST = document.getElementById( "test-iframe-div" );

	var name,
		path,
		lesson,
		editor,
		session,
		iframe_demo,
		iframe_test;

	function handle_button_save() {
		firebase.database().ref( path ).set( session.toString() );
	}

	function callback_run( err ) {
		if( err ) {

		} else {
			iframe_demo.setAttribute( "src", iframe_demo.getAttribute( "src" ) );
			iframe_test.setAttribute( "src", iframe_test.getAttribute( "src" ) );
		}
	}

	function handle_button_run() {
		firebase.database().ref( path ).set( session.toString(), callback_run );
	}

	function callback_code( snapshot ) {
		editor = ace.edit( "code-editor" );
		editor.setTheme( "ace/theme/monokai" );

		session = editor.getSession();
		session.setMode( "ace/mode/javascript" );
		if( snapshot.exists() ) {
			session.setValue( snapshot.val() );
		} else {
			session.setValue( "hi" );
		}
		iframe_demo = document.createElement( "iframe" );
		iframe_demo.setAttribute( "class", "iframe" );
		iframe_demo.setAttribute( "frameborder", "0" );
		iframe_demo.src = "../demo/?lesson=" + lesson + "&uid=" + user.uid;
		DIV_IFRAME_DEMO.appendChild( iframe_demo );

		iframe_test = document.createElement( "iframe" );
		iframe_test.setAttribute( "class", "iframe-div" );
		iframe_test.setAttribute( "frameborder", "0" );
		iframe_test.src = "../tester/?lesson=" + lesson + "&uid=" + user.uid;
		DIV_IFRAME_TEST.appendChild( iframe_test );

		BUTTON_SAVE.addEventListener( "click", handle_button_save );
		BUTTON_RUN.addEventListener( "click", handle_button_run );
	}

	function callback_lesson( evt ) {
		name = evt.name;
		path = evt.path;
		lesson = evt.lesson;
		firebase.database().ref( path ).once( "value" ).then( callback_code );
	}

	init_lesson( user.uid, callback_lesson );
}

function callback_secure( user ) {
	init_learn( user );
}

init_secure( callback_secure );