function init_lessons() {
	var DIV_SHOWCASE = document.getElementById( "lesson-showcase" );

	function add_callback_xhr( xhr ) {
		xhr.onreadystatechange = function() {
			if( xhr.readyState == 4 && xhr.status == 200 ) {
				var data = JSON.parse( xhr.responseText );
				console.log(data)
				var lesson_names = Object.keys( data );
				var lesson,
					link,
					item,
					card,
					thumb,
					title,
					desc,
					name;
				for( var i = 0; i < lesson_names.length; ++i ) {
					name = lesson_names[ i ];
					lesson = data[ name ];
					link = document.createElement( "a" );
					item = document.createElement( "div" );
					card = document.createElement( "div" );
					thumb = document.createElement( "div" )
					title = document.createElement( "h2" );
					desc = document.createElement( "p" );
					item.setAttribute( "class", "lesson-item" );
					card.setAttribute( "class", "lesson-card" );
					thumb.setAttribute( "class", "thumbnail-container" );
					link.setAttribute( "href", "../learn?lesson=" + name );
					link.setAttribute( "target", "_blank" );
					thumb.style.backgroundImage = "url('" + name + "/thumb.png')";
					title.innerHTML = lesson.title;
					desc.innerHTML = lesson.desc;
					card.appendChild( thumb );
					card.appendChild( title );
					card.appendChild( desc );
					item.appendChild( card );
					link.appendChild( item );
					DIV_SHOWCASE.appendChild( link );
				}
				var msnry = new Masonry( "#lesson-showcase", {
					itemSelector: '.lesson-item',
					columnWidth: 306,
					gutter: 40,
					horizontalOrder: true,
					fitWidth: true,
					transitionDuration: '0.35s'
				} );
			}
		}
	}

	function callback_secure( user ) {
		var xhr = new XMLHttpRequest();
		add_callback_xhr( xhr );
		xhr.open( "GET", "lessons.json", true );
		xhr.send();
	}

	init_secure( callback_secure );
}

init_lessons();