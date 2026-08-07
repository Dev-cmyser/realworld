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
				},
			},
		},

	} )

}
