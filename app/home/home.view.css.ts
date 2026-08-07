namespace $.$$ {

	$mol_style_define( $realworld_app_home, {

		flex: {
			direction: 'column',
		},
		minWidth: 0,

		Banner: {
			flex: {
				direction: 'column',
			},
			align: {
				items: 'center',
			},
			padding: {
				top: '2rem',
				bottom: '2rem',
				left: '1rem',
				right: '1rem',
			},
			background: {
				color: $realworld_app_theme.brand,
			},
			color: 'white',
			textShadow: '0 1px 3px rgba(0,0,0,.3)',
			boxShadow: 'inset 0 8px 8px -8px rgba(0,0,0,.3), inset 0 -8px 8px -8px rgba(0,0,0,.3)',
			textAlign: 'center',
		},

		Logo: {
			margin: 0,
			font: {
				family: $realworld_app_theme.head,
				size: '3.5rem',
				weight: 700,
			},
			lineHeight: '1.1',
		},

		Slogan: {
			margin: {
				top: '.5rem',
			},
			font: {
				size: '1.5rem',
				weight: 300,
			},
		},

		Container: {
			width: '100%',
			maxWidth: '1140px',
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
			gap: '1.5rem',
			align: {
				items: 'flex-start',
			},
			minWidth: 0,
		},

		Feed: {
			flex: {
				grow: 1,
				shrink: 1,
			},
			minWidth: 0,
		},

		Sidebar: {
			flex: {
				direction: 'column',
				grow: 0,
				shrink: 0,
			},
			width: '255px',
			maxWidth: '100%',
			padding: '.5rem',
			background: {
				color: $realworld_app_theme.sand,
			},
			borderRadius: '4px',
		},

		Sidebar_title: {
			margin: 0,
			padding: {
				bottom: '.3rem',
			},
			font: {
				size: '1rem',
			},
		},

		Tag_list: {
			gap: '.2rem',
			flex: {
				wrap: 'wrap',
			},
		},

		Tag_link: {
			display: 'inline-block',
			padding: {
				top: '.1rem',
				bottom: '.1rem',
				left: '.6rem',
				right: '.6rem',
			},
			borderRadius: '10rem',
			background: {
				color: $realworld_app_theme.pill,
			},
			color: 'white',
			font: {
				size: '.8rem',
			},
			whiteSpace: 'nowrap',
			':hover': {
				background: {
					color: '#687077',
				},
				color: 'white',
				textDecoration: 'none',
			},
		},

		'@media': {
			'(max-width: 768px)': {
				Container: {
					flex: {
						direction: 'column',
					},
				},
				Sidebar: {
					width: '100%',
				},
				Logo: {
					font: {
						size: '2.5rem',
					},
				},
				Slogan: {
					font: {
						size: '1.2rem',
					},
				},
			},
		},

	} )

}
