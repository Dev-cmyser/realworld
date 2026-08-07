namespace $.$$ {

	$mol_style_define( $realworld_app, {

		flex: {
			direction: 'column',
		},
		// $mol pins its root to the viewport height; Conduit pages scroll the document,
		// so the root has to grow with its content or the page canvas shows through.
		height: 'auto',
		minHeight: '100vh',
		minWidth: 0,
		flexShrink: '1',
		background: {
			color: 'white',
		},
		color: $realworld_app_theme.text,
		font: {
			family: $realworld_app_theme.body,
			size: '16px',
		},
		lineHeight: '1.5',

		Body: {
			flex: {
				direction: 'column',
				grow: 1,
			},
			minWidth: 0,
			flexShrink: '1',
		},

	} )

}
