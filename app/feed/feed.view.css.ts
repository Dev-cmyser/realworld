namespace $.$$ {

	$mol_style_define( $realworld_app_feed, {

		flex: {
			direction: 'column',
		},
		minWidth: 0,

		Toggle: {
			gap: '1rem',
			flex: {
				wrap: 'wrap',
			},
			border: {
				bottom: {
					width: '1px',
					style: 'solid',
					color: '#00000019',
				},
			},

			// Tabs come from the page that owns the feed, so they are matched by type.
			// Scoped to the toggle bar: article cards below hold links of the same type.
			$realworld_app_link: {
				padding: {
					top: '.5rem',
					bottom: '.5rem',
				},
				color: $realworld_app_theme.meta,
				border: {
					bottom: {
						width: '2px',
						style: 'solid',
						color: 'transparent',
					},
				},
				marginBottom: '-1px',
				whiteSpace: 'nowrap',
				':hover': {
					color: '#5a5a5a',
					textDecoration: 'none',
				},
				'@': {
					realworld_active: {
						true: {
							color: $realworld_app_theme.brand,
							border: {
								bottom: {
									color: $realworld_app_theme.brand,
								},
							},
						},
					},
				},
			},
		},

		List: {
			minWidth: 0,
		},

		Empty: {
			padding: {
				top: '1.5rem',
				bottom: '1.5rem',
			},
			color: $realworld_app_theme.meta,
		},

		Pages: {
			padding: {
				top: '1rem',
				bottom: '1rem',
			},
			flex: {
				wrap: 'wrap',
			},
		},

		Page_link: {
			padding: {
				top: '.4rem',
				bottom: '.4rem',
				left: '.75rem',
				right: '.75rem',
			},
			border: {
				width: '1px',
				style: 'solid',
				color: $realworld_app_theme.line,
			},
			marginBottom: '0',
			marginLeft: '-1px',
			background: {
				color: 'white',
			},
			color: $realworld_app_theme.brand,
			':hover': {
				background: {
					color: '#eceeef',
				},
				color: $realworld_app_theme.brand,
				textDecoration: 'none',
			},
			'@': {
				realworld_active: {
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

	} )

}
