namespace $.$$ {

	$mol_style_define( $realworld_app_preview, {

		flex: {
			direction: 'column',
		},
		minWidth: 0,
		padding: {
			top: '1.5rem',
			bottom: '1.5rem',
		},
		border: {
			top: {
				width: '1px',
				style: 'solid',
				color: '#00000019',
			},
		},

		Meta: {
			gap: '.3rem',
			align: {
				items: 'center',
			},
			padding: {
				bottom: '1rem',
			},
			minWidth: 0,
		},

		Avatar: {
			width: '32px',
			height: '32px',
			minWidth: '32px',
			borderRadius: '50%',
			objectFit: 'cover',
		},

		Info: {
			flex: {
				direction: 'column',
				grow: 1,
			},
			lineHeight: '1',
			minWidth: 0,
		},

		Author_link: {
			font: {
				weight: 500,
			},
			color: $realworld_app_theme.brand,
			overflow: {
				x: 'hidden',
			},
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			display: 'block',
		},

		Date: {
			color: $realworld_app_theme.muted,
			font: {
				size: '.8rem',
			},
			padding: {
				top: '.2rem',
			},
		},

		Favorite: {
			gap: '.25rem',
			align: {
				items: 'center',
			},
			padding: {
				top: '.25rem',
				bottom: '.25rem',
				left: '.5rem',
				right: '.5rem',
			},
			border: {
				width: '1px',
				style: 'solid',
				color: $realworld_app_theme.brand,
			},
			borderRadius: '.2rem',
			background: {
				color: 'transparent',
			},
			color: $realworld_app_theme.brand,
			font: {
				size: '.85rem',
			},
			minHeight: 0,
			flex: {
				shrink: 0,
			},
			':hover': {
				background: {
					color: $realworld_app_theme.brand,
				},
				color: 'white',
			},
			'@': {
				realworld_on: {
					true: {
						background: {
							color: $realworld_app_theme.brand,
						},
						color: 'white',
					},
				},
			},
		},

		Favorite_icon: {
			width: '.9rem',
			height: '.9rem',
			fill: 'currentcolor',
		},

		Link: {
			flex: {
				direction: 'column',
			},
			color: 'inherit',
			minWidth: 0,
			':hover': {
				textDecoration: 'none',
			},
		},

		Title: {
			margin: 0,
			font: {
				size: '1.5rem',
				weight: 600,
			},
			lineHeight: '1.2',
			color: $realworld_app_theme.text,
		},

		Description: {
			margin: {
				top: '.3rem',
				bottom: '.9rem',
			},
			color: $realworld_app_theme.muted,
			font: {
				weight: 300,
			},
			lineHeight: '1.3',
		},

		Bottom: {
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
			minWidth: 0,
		},

		More: {
			color: $realworld_app_theme.muted,
			font: {
				size: '.8rem',
				weight: 300,
			},
		},

		Tags: {
			gap: '.2rem',
			flex: {
				wrap: 'wrap',
			},
			justify: {
				content: 'flex-end',
			},
			minWidth: 0,
		},

		Tag: {
			padding: {
				top: '.1rem',
				bottom: '.1rem',
				left: '.6rem',
				right: '.6rem',
			},
			border: {
				width: '1px',
				style: 'solid',
				color: $realworld_app_theme.line,
			},
			borderRadius: '10rem',
			color: $realworld_app_theme.muted,
			font: {
				size: '.8rem',
				weight: 300,
			},
			whiteSpace: 'nowrap',
		},

	} )

}
