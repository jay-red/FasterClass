function init_lessons( user ) {
	var msnry = new Masonry( "#lesson-showcase", {
		itemSelector: '.lesson-item',
		columnWidth: 280,
		gutter: 40,
		horizontalOrder: true,
		fitWidth: true,
		transitionDuration: '0.35s'
	} );
}

function callback_secure( user ) {
	init_lessons( user );
}

init_secure( callback_secure );