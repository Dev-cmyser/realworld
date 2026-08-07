namespace $.$$ {

	$mol_style_define( $realworld_app_comment, {

		flex: {
			direction: 'column',
		},
		minWidth: 0,
		margin: {
			bottom: '.75rem',
		},
		border: {
			width: '1px',
			style: 'solid',
			color: '#e5e5e5',
		},
		borderRadius: '4px',

		Body: {
			padding: '1rem',
			minWidth: 0,
		},

		Text: {
			margin: 0,
			minWidth: 0,
			wordBreak: 'break-word',
		},

		Foot: {
			gap: '.4rem',
			align: {
				items: 'center',
			},
			flex: {
				wrap: 'wrap',
			},
			padding: {
				top: '.6rem',
				bottom: '.6rem',
				left: '1rem',
				right: '1rem',
			},
			background: {
				color: '#f5f5f5',
			},
			border: {
				top: {
					width: '1px',
					style: 'solid',
					color: '#e5e5e5',
				},
			},
			font: {
				size: '.8rem',
			},
			minWidth: 0,
		},

		Avatar: {
			width: '20px',
			height: '20px',
			minWidth: '20px',
			borderRadius: '50%',
			objectFit: 'cover',
		},

		Author_link: {
			color: $realworld_app_theme.brand,
			font: {
				weight: 500,
			},
			whiteSpace: 'nowrap',
		},

		Date: {
			color: $realworld_app_theme.muted,
			whiteSpace: 'nowrap',
		},

		Actions: {
			gap: '.4rem',
			align: {
				items: 'center',
			},
			flex: {
				grow: 1,
			},
			justify: {
				content: 'flex-end',
			},
			minWidth: 0,
		},

	} )

}
