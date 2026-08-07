namespace $.$$ {

	$mol_style_define( $realworld_app_article_meta, {

		gap: '.4rem',
		align: {
			items: 'center',
		},
		flex: {
			wrap: 'wrap',
		},
		minWidth: 0,
		flexShrink: '1',

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
			},
			lineHeight: '1',
			minWidth: 0,
			flexShrink: '1',
		},

		Author_link: {
			font: {
				weight: 500,
			},
			color: 'inherit',
			whiteSpace: 'nowrap',
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

		Actions: {
			gap: '.4rem',
			align: {
				items: 'center',
			},
			flex: {
				wrap: 'wrap',
			},
			padding: {
				left: '.4rem',
			},
			minWidth: 0,
			flexShrink: '1',
		},

		// Follow and Favorite share the outline-until-active look.
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

		Favorite: {
			border: {
				color: $realworld_app_theme.brand,
			},
			color: $realworld_app_theme.brand,
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
						border: {
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

		Delete: {
			border: {
				color: $realworld_app_theme.danger,
			},
			color: $realworld_app_theme.danger,
			':hover': {
				background: {
					color: $realworld_app_theme.danger,
				},
				color: 'white',
			},
		},

		Edit_icon: {
			width: '.9rem',
			height: '.9rem',
			fill: 'currentcolor',
		},

		Delete_icon: {
			width: '.9rem',
			height: '.9rem',
			fill: 'currentcolor',
		},

		// Same strip on the dark article banner.
		'@': {
			realworld_dark: {
				true: {
					Author_link: {
						color: 'white',
					},
					Date: {
						color: '#ffffff80',
					},
					// Favorite keeps its green on the dark banner; the neutral ones go white.
					Follow: {
						border: {
							color: '#ffffff80',
						},
						color: 'white',
						':hover': {
							background: {
								color: 'white',
							},
							color: '#333333',
						},
					},
					Edit: {
						border: {
							color: '#ffffff80',
						},
						color: 'white',
						':hover': {
							background: {
								color: 'white',
							},
							color: '#333333',
						},
					},
				},
			},
		},

	} )

}
