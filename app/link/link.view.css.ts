namespace $.$$ {

	$mol_style_define( $realworld_app_link, {

		color: $realworld_app_theme.brand,
		textDecoration: 'none',
		background: {
			color: 'transparent',
		},
		// $mol styles links as controls; Conduit wants them to read as text.
		padding: 0,
		minHeight: 0,
		borderRadius: '0',
		cursor: 'pointer',

		':hover': {
			textDecoration: 'underline',
		},

	} )

}
