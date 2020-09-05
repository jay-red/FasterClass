function init_learn( user ) {
	var editor = ace.edit( "code-editor" );
	editor.setTheme( "ace/theme/monokai" );

	var session = editor.getSession();
	session.setMode( "ace/mode/javascript" );
}

function callback_secure( user ) {
	init_learn( user );
}

init_secure( callback_secure );