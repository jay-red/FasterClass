function run_tests() {
	write_line( "Tests loaded!\n" );

	return true;
}

//try {
	if( !run_tests() ) write_line( "FAILED." );
//} catch( e ) {
//	write_line( "ERROR." );
//}