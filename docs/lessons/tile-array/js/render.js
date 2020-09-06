/* 2 */
function init_render() {
	var DIV_CONTENT = document.getElementById( "content" );

	var i,
		j,
		row,
		tile,
		len = -1;

	// Check that tiles is defined
	if( typeof tiles == "undefined" ) return;
	if( typeof tiles == "object" ) {
		if( typeof tiles.length == "undefined" ) return;
		if( tiles.length == 0 ) return;
		for( i = 0; i < tiles.length; ++i ) {
			if( !tiles.hasOwnProperty( i ) ) return;
			row = tiles[ i ];
			if( typeof row == "object" ) {
				// make sure rows are arrays
				if( typeof row.length == "undefined" ) return;

				// make sure rows aren't empty
				if( row.length == 0 ) return;

				// check if ( len x tiles.length ) dimensions
				if( len == -1 ) {
					len = row.length;
				} else {
					if( len != row.length ) return;
				}

				for( j = 0; j < row.length; ++j ) {
					// check that each index of a row is valid
					if( !row.hasOwnProperty( j ) ) return;
					tile = row[ j ];

					// check that each index is a number
					if( typeof tile == "number" ) {
						// check that each index is an integer
						if( Math.floor( tile ) != tile ) return;
					} else {
						return;
					}
				}
			} else {
				return;
			}
		}
	}

	var THEIGHT = tiles.length,
		TWIDTH = tiles[ 0 ].length;

	var max_width = TWIDTH / THEIGHT,
		height = 100 / max_width;

	max_width = ( Math.round( max_width * 10000 ) / 100 ).toString() + "vh";
	height = ( Math.round( height * 100 ) / 100 ).toString() + "vw";

	var canvas = document.createElement( "canvas" );
	canvas.style.height = height;
	canvas.style.maxWidth = max_width;
	canvas.setAttribute( "id", "game" );
	canvas.width = TWIDTH;
	canvas.height = THEIGHT;

	var ctx = canvas.getContext( "2d" );

	DIV_CONTENT.appendChild( canvas );

	for( j = 0; j < THEIGHT; ++j ) {
		for( i = 0; i < TWIDTH; ++i ) {
			if( tiles[ j ][ i ] == 1 ) {
				ctx.fillStyle = "#000000";
				ctx.fillRect( i, j, 1, 1 );
			} else {
				ctx.fillStyle = "#FFFFFF";
				ctx.fillRect( i, j, 1, 1 );
			}
		}
	}
}

init_render();