function init_tester() {
	var CURR_URL = window.location.href,
		EXT_CODE = "https://fasterclass.herokuapp.com/code/",
		DIV_CONTENT = document.getElementById( "content" );

	var uid = CURR_URL.split( "uid=" );
	if( uid.length != 2 ) return;
	uid = uid[ 1 ];
	uid = uid.split( "&" )[ 0 ];

	var idx = 0,
		int_code,
		lesson,
		files,
		name;

	function write_line( msg ) {
		msgs = msg.split( "\n" );

		for( var i = 0; i < msgs.length; ++i ) {
			msg = msgs[ i ];
			if( msg.trim() == "" ) msg = "&nbsp;";
			var tag = document.createElement( "div" );
			tag.setAttribute( "class", "console-line" );
			tag.innerHTML = msg;
			DIV_CONTENT.appendChild( tag );
		}
	}

	window.write_line = write_line;

	function run_tests() {

	}

	function callback_load_tests() {
		write_line( "Finished." );
	}

	function callback_load_tag() {
		write_line( "Loading tester...\n\n\n\n\n\n\n\n" );
		var tag = document.createElement( "script" );
		tag.setAttribute( "type", "text/javascript" );
		tag.setAttribute( "src", int_code + "tests.js" );
		tag.onload = callback_load_tests;
		document.body.appendChild( tag );
	}

	function callback_lesson( evt ) {
		files = evt.files;
		var file,
			script;
		lesson = evt.lesson;
		int_code = "../lessons/" + lesson + "/";
		for( var i = 0; i < files.length; ++i ) {
			file = files[ i ];
			if( file.user ) {
				name = file.src;
				name = name.split( "/" );
				name = name[ name.length - 1 ];
				var ext = name.split( "." );
				ext = ext[ 1 ];
				if( ext == "css" ) {
					run_tests();
					return;
				}
				write_line( "Loading code..." );
				var tag = document.createElement( "script" );
				tag.setAttribute( "type", "text/javascript" );
				tag.setAttribute( "src", EXT_CODE + uid + "/" + lesson + "/" + name );
				tag.onload = callback_load_tag;
				document.body.appendChild( tag );
				break;
			}
		}
	}

	init_lesson( uid, callback_lesson );
}

init_tester();