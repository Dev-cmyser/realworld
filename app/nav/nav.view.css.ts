namespace $.$$ {

	$mol_style_define( $realworld_app_nav, {

		padding: {
			left: '1rem',
			right: '1rem',
		},
		background: {
			color: 'white',
		},

		Inner: {
			width: '100%',
			minWidth: 0,
			flexShrink: '1',
			maxWidth: '1140px',
			margin: {
				left: 'auto',
				right: 'auto',
			},
			padding: {
				top: '.7rem',
				bottom: '.7rem',
			},
			gap: '1rem',
			align: {
				items: 'center',
			},
			justify: {
				content: 'space-between',
			},
			flex: {
				wrap: 'wrap',
			},
		},

		Menu: {
			minWidth: 0,
			flexShrink: '1',
			gap: '1rem',
			align: {
				items: 'center',
			},
			flex: {
				wrap: 'wrap',
			},
		},

		// Every menu entry looks the same; Brand below re-styles the one exception.
		$realworld_app_link: {
			color: '#00000080',
			padding: {
				top: '.4rem',
				bottom: '.4rem',
			},
			gap: '.3rem',
			align: {
				items: 'center',
			},
			font: {
				size: '1rem',
			},
			':hover': {
				color: '#000000b3',
				textDecoration: 'none',
			},
			'@': {
				realworld_active: {
					true: {
						color: '#000000d9',
					},
				},
			},
		},

		Brand: {
			color: $realworld_app_theme.brand,
			font: {
				family: $realworld_app_theme.head,
				size: '1.5rem',
				weight: 700,
			},
			padding: 0,
			':hover': {
				color: $realworld_app_theme.brand,
				textDecoration: 'none',
			},
		},

		Avatar: {
			width: '26px',
			height: '26px',
			minWidth: '26px',
			borderRadius: '50%',
			objectFit: 'cover',
		},

		Editor_icon: {
			width: '1rem',
			height: '1rem',
		},

		Settings_icon: {
			width: '1rem',
			height: '1rem',
		},

	} )

}
