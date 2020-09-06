function init_demo() {
	var CURR_URL = window.location.href,
		EXT_CODE = "https://fasterclass.herokuapp.com/code/";

	var uid = CURR_URL.split( "uid=" );
	if( uid.length != 2 ) return;
	uid = uid[ 1 ];
	uid = uid.split( "&" )[ 0 ];

	var idx = 0,
		int_code,
		lesson,
		files;

	function load_next() {
		if( idx >= files.length ) {
			console.log( "all loaded chief" );
			return;
		}
		var file = files[ idx++ ];
		var src = file.src;
		var name = src.split( "/" );
		name = name[ name.length - 1 ];
		var ext = name.split( "." );
		ext = ext[ 1 ];
		var tag;
		console.log( name );
		switch( ext ) {
			case "css":
				tag = document.createElement( "link" );
				tag.setAttribute( "rel", "stylesheet" );
				tag.setAttribute( "type", "text/css" );
				tag.onload = callback_load_tag;
				if( file.user ) {
					tag.setAttribute( "href", EXT_CODE + uid + "/" + lesson + "/" + name );
				} else {
					tag.setAttribute( "href", int_code + src );
				}
				document.head.appendChild( tag );
				break;
			case "js":
				tag = document.createElement( "script" );
				tag.setAttribute( "type", "text/javascript" );
				tag.onload = callback_load_tag;
				if( file.user ) {
					tag.setAttribute( "src", EXT_CODE + uid + "/" + lesson + "/" + name );
				} else {
					tag.setAttribute( "src", int_code + src );
				}
				document.body.appendChild( tag );
				break;
		}
	}

	function callback_load_tag() {
		load_next();
	}

	function callback_lesson( evt ) {
		files = evt.files;
		var file,
			script;
		lesson = evt.lesson;
		int_code = "../lessons/" + lesson + "/";
		load_next();
	}

	init_lesson( uid, callback_lesson );
}

init_demo();