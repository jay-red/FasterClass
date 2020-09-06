function run_tests() {
	var len = -1,
		i,
		j;

	write_line( "Tests loaded!\n" );

	write_line( "Check that 'tiles' is defined..." )
	if( typeof tiles == "undefined" ) return false;
	write_line( "PASSED!\n" )

	write_line( "Check that 'tiles' is a 2D array of numbers..." )
	if( typeof tiles == "object" ) {
		if( typeof tiles.length == "undefined" ) return false;
		if( tiles.length == 0 ) return false;
		for( i = 0; i < tiles.length; ++i ) {
			if( !tiles.hasOwnProperty( i ) ) return false;
			row = tiles[ i ];
			if( typeof row == "object" ) {
				// make sure rows are arrays
				if( typeof row.length == "undefined" ) return false;

				// make sure rows aren't empty
				if( row.length == 0 ) return false;

				// check if ( len x tiles.length ) dimensions
				if( len == -1 ) {
					len = row.length;
				} else {
					if( len != row.length ) return false;
				}

				for( j = 0; j < row.length; ++j ) {
					// check that each index of a row is valid
					if( !row.hasOwnProperty( j ) ) return false;
					tile = row[ j ];

					// check that each index is a number
					if( typeof tile == "number" ) {
						// check that each index is an integer
						if( Math.floor( tile ) != tile ) return false;
					} else {
						return false;
					}
				}
			} else {
				return false;
			}
		}
	}
	write_line( "PASSED!\n" )
	return true;
}

//try {
	if( !run_tests() ) write_line( "FAILED." );
//} catch( e ) {
//	write_line( "ERROR." );
//}