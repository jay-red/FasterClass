function init_lesson( uid, cb_lesson ) {
	var CURR_URL = window.location.href;

	var lesson = CURR_URL.split( "lesson=" );
	if( lesson.length != 2 ) window.location.replace( "../lessons" );
	lesson = lesson[ 1 ].toLowerCase();
	lesson = lesson.split( "&" )[ 0 ];

	function add_callback_xhr( xhr ) {
		xhr.onreadystatechange = function() {
			if( xhr.readyState == 4 && xhr.status == 200 ) {
				var data = JSON.parse( xhr.responseText );
				var files = data[ "files" ];
				var file;
				var name;
				var path;
				var clean_name;
				for( var i = 0; i < files.length; ++i ) {
					file = files[ i ];
					if( file.user ) {
						name = file.src;
						clean_name = file.src.split( "/" );
						clean_name = clean_name[ clean_name.length - 1 ];
						path = "/code/" + uid + "/" + lesson + "/" + clean_name.replace( ".", "" );
						break;
					}
				}
				var evt = {};
				evt[ "data" ] = data;
				evt[ "files" ] = files;
				evt[ "name" ] = name;
				evt[ "path" ] = path;
				evt[ "lesson" ] = lesson;
				cb_lesson( evt );
			}
		}
	}

	var xhr = new XMLHttpRequest();
	add_callback_xhr( xhr );
	xhr.open( "GET", "../lessons/" + lesson + "/lesson.json", true );
	xhr.send();
}