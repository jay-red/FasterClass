function run_tests() {
	write_line( "Tests loaded!\n" );

	write_line( "See the sample tester at:" );
	write_line( "/docs/lessons/template/tester.js\n" );

    // Use write_line to write to the console!
    
	return true;
}

try {
	if( !run_tests() ) write_line( "FAILED." );
} catch( e ) {
	write_line( "ERROR." );
}