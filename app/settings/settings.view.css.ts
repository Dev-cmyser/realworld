namespace $.$$ {

	$mol_style_define( $realworld_app_settings, {

		flex: {
			direction: 'column',
		},
		minWidth: 0,

		Container: {
			width: '100%',
			maxWidth: '540px',
			margin: {
				left: 'auto',
				right: 'auto',
			},
			padding: {
				top: '2rem',
				bottom: '2rem',
				left: '1rem',
				right: '1rem',
			},
			flex: {
				direction: 'column',
			},
			gap: '1rem',
			minWidth: 0,
		},

		Title: {
			margin: 0,
			textAlign: 'center',
			justify: {
				content: 'center',
			},
			font: {
				family: $realworld_app_theme.head,
				size: '2.5rem',
				weight: 500,
			},
			color: $realworld_app_theme.text,
		},

		Errors: {
			margin: 0,
			padding: 0,
			listStyle: 'none',
			flex: {
				direction: 'column',
			},
			color: $realworld_app_theme.danger,
			font: {
				weight: 700,
			},
			minWidth: 0,
		},

		Fields: {
			flex: {
				direction: 'column',
			},
			gap: '1rem',
			minWidth: 0,

			$mol_string: {
				padding: {
					top: '.75rem',
					bottom: '.75rem',
					left: '1.2rem',
					right: '1.2rem',
				},
				border: {
					width: '1px',
					style: 'solid',
					color: '#00000026',
				},
				borderRadius: '.3rem',
				background: {
					color: 'white',
				},
				color: $realworld_app_theme.text,
				font: {
					size: '1.15rem',
				},
				minWidth: 0,
				minHeight: 0,
				':focus': {
					outline: 'none',
					border: {
						color: '#00000059',
					},
				},
			},
		},

		Bio: {
			minHeight: '8rem',
			lineHeight: '1.5',
			resize: 'vertical',
		},

		Submit: {
			align: {
				self: 'flex-end',
			},
			padding: {
				top: '.75rem',
				bottom: '.75rem',
				left: '1.5rem',
				right: '1.5rem',
			},
			border: {
				width: '1px',
				style: 'solid',
				color: $realworld_app_theme.brand,
			},
			borderRadius: '.3rem',
			background: {
				color: $realworld_app_theme.brand,
			},
			color: 'white',
			font: {
				size: '1.15rem',
			},
			':hover': {
				background: {
					color: $realworld_app_theme.brand_dark,
				},
			},
		},

		Divider: {
			height: '1px',
			minHeight: '1px',
			background: {
				color: '#00000019',
			},
		},

		Logout: {
			align: {
				self: 'flex-start',
			},
			padding: {
				top: '.5rem',
				bottom: '.5rem',
				left: '1rem',
				right: '1rem',
			},
			border: {
				width: '1px',
				style: 'solid',
				color: $realworld_app_theme.danger,
			},
			borderRadius: '.3rem',
			background: {
				color: 'transparent',
			},
			color: $realworld_app_theme.danger,
			':hover': {
				background: {
					color: $realworld_app_theme.danger,
				},
				color: 'white',
			},
		},

	} )

}
