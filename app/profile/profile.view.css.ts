namespace $.$$ {

	$mol_style_define( $realworld_app_profile, {

		flex: {
			direction: 'column',
		},
		minWidth: 0,
		flexShrink: '1',

		Banner: {
			padding: {
				top: '2rem',
				bottom: '1rem',
				left: '1rem',
				right: '1rem',
			},
			background: {
				color: $realworld_app_theme.sand,
			},
		},

		Banner_inner: {
			width: '100%',
			maxWidth: '1140px',
			margin: {
				left: 'auto',
				right: 'auto',
			},
			flex: {
				direction: 'column',
			},
			align: {
				items: 'center',
			},
			gap: '.6rem',
			textAlign: 'center',
			minWidth: 0,
			flexShrink: '1',
		},

		Avatar: {
			width: '100px',
			height: '100px',
			minWidth: '100px',
			borderRadius: '50%',
			objectFit: 'cover',
		},

		Name: {
			margin: 0,
			font: {
				size: '1.5rem',
				weight: 700,
			},
			color: $realworld_app_theme.text,
			wordBreak: 'break-word',
			minWidth: 0,
			flexShrink: '1',
		},

		Bio: {
			margin: 0,
			maxWidth: '640px',
			color: $realworld_app_theme.meta,
			font: {
				weight: 300,
			},
			lineHeight: '1.4',
			minWidth: 0,
			flexShrink: '1',
		},

		Actions: {
			gap: '.4rem',
			flex: {
				wrap: 'wrap',
			},
			justify: {
				content: 'center',
			},
			minWidth: 0,
			flexShrink: '1',
		},

		$realworld_app_button: {
			gap: '.3rem',
			align: {
				items: 'center',
			},
			padding: {
				top: '.25rem',
				bottom: '.25rem',
				left: '.6rem',
				right: '.6rem',
			},
			border: {
				width: '1px',
				style: 'solid',
				color: $realworld_app_theme.pill,
			},
			borderRadius: '.2rem',
			background: {
				color: 'transparent',
			},
			color: $realworld_app_theme.pill,
			font: {
				size: '.85rem',
			},
			minHeight: 0,
			whiteSpace: 'nowrap',
			':hover': {
				background: {
					color: $realworld_app_theme.pill,
				},
				color: 'white',
			},
			'@': {
				realworld_on: {
					true: {
						background: {
							color: $realworld_app_theme.pill,
						},
						color: 'white',
					},
				},
			},
		},

		Edit: {
			gap: '.3rem',
			align: {
				items: 'center',
			},
			padding: {
				top: '.25rem',
				bottom: '.25rem',
				left: '.6rem',
				right: '.6rem',
			},
			border: {
				width: '1px',
				style: 'solid',
				color: $realworld_app_theme.pill,
			},
			borderRadius: '.2rem',
			color: $realworld_app_theme.pill,
			font: {
				size: '.85rem',
			},
			whiteSpace: 'nowrap',
			':hover': {
				background: {
					color: $realworld_app_theme.pill,
				},
				color: 'white',
				textDecoration: 'none',
			},
		},

		Edit_icon: {
			width: '.9rem',
			height: '.9rem',
			fill: 'currentcolor',
		},

		Container: {
			width: '100%',
			maxWidth: '1140px',
			flex: {
				direction: 'column',
			},
			margin: {
				left: 'auto',
				right: 'auto',
			},
			padding: {
				top: '1.5rem',
				bottom: '1.5rem',
				left: '1rem',
				right: '1rem',
			},
			minWidth: 0,
			flexShrink: '1',
		},

		Feed: {
			flex: {
				grow: 1,
			},
			minWidth: 0,
			flexShrink: '1',
		},

	} )

}
