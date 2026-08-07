namespace $.$$ {

	$mol_style_define( $realworld_app_footer, {

		padding: {
			top: '1rem',
			bottom: '1rem',
			left: '1rem',
			right: '1rem',
		},
		background: {
			color: $realworld_app_theme.sand,
		},

		Inner: {
			width: '100%',
			maxWidth: '1140px',
			margin: {
				left: 'auto',
				right: 'auto',
			},
			gap: '.4rem',
			align: {
				items: 'baseline',
			},
			flex: {
				wrap: 'wrap',
			},
		},

		Brand: {
			color: $realworld_app_theme.brand,
			font: {
				family: $realworld_app_theme.head,
				size: '1.2rem',
				weight: 700,
			},
		},

		// Laid out as text, not as flex items: the note mixes bare strings with a link.
		Note: {
			display: 'block',
			// Without this the note keeps its max-content width and overflows narrow screens.
			minWidth: 0,
			flexShrink: '1',
			color: $realworld_app_theme.pill,
			font: {
				size: '.8rem',
				weight: 300,
			},
		},

		Source: {
			display: 'inline',
			padding: 0,
			minHeight: 0,
			marginLeft: '.25rem',
			color: $realworld_app_theme.pill,
			textDecoration: 'none',
			font: {
				size: '.8rem',
			},
			':hover': {
				textDecoration: 'underline',
			},
		},

	} )

}
