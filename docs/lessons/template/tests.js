function run_tests() {
	write_line( "Tests loaded!\n" );

    // Use write_line to write to the console!
    
	return true;
}

try {
	if( !run_tests() ) write_line( "FAILED." );
} catch( e ) {
	write_line( "ERROR." );
}