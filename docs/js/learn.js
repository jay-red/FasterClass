function init_learn( user ) {
	var URL = window.location.href,
		EDITOR_DIV = document.getElementById( "code-editor" ),
		BUTTON_SAVE = document.getElementById( "save-button" ),
		BUTTON_RUN = document.getElementById( "run-button" );

	var lesson = URL.split( "lesson=" );
	if( lesson.length != 2 ) window.location.replace( "../lessons" );
	lesson = lesson[ 1 ].toLowerCase();

	var name,
		path,
		editor,
		session;

	function handle_button_save() {
		firebase.database().ref( path ).set( session.toString() );
	}

	function handle_button_run() {
		
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
		BUTTON_SAVE.addEventListener( "click", handle_button_save );
		BUTTON_RUN.addEventListener( "click", handle_button_run );
	}

	function add_callback_xhr( xhr ) {
		xhr.onreadystatechange = function() {
			if( xhr.readyState == 4 && xhr.status == 200 ) {
				var data = JSON.parse( xhr.responseText );
				var files = data[ "files" ];
				var file;
				var clean_name;
				for( var i = 0; i < files.length; ++i ) {
					file = files[ i ];
					if( file.user ) {
						name = file.src;
						clean_name = file.src.split( "/" );
						clean_name = clean_name[ clean_name.length - 1 ];
						path = "/code/" + user.uid + "/" + lesson + "/" + clean_name.replace( ".", "" );
						firebase.database().ref( path ).once( "value" ).then( callback_code );
						break;
					}
				}
			}
		}
	}

	var xhr = new XMLHttpRequest();
	add_callback_xhr( xhr );
	xhr.open( "GET", "../lessons/" + lesson + "/lesson.json", true );
	xhr.send();

	//firebase.database().ref( "/code/" + user.uid ).once( "value" ).then( callback_user );
}

function callback_secure( user ) {
	init_learn( user );
}

init_secure( callback_secure );