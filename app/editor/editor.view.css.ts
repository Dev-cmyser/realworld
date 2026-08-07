namespace $.$$ {

	$mol_style_define( $realworld_app_editor, {

		flex: {
			direction: 'column',
		},
		minWidth: 0,
		flexShrink: '1',

		Container: {
			width: '100%',
			maxWidth: '740px',
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
			flexShrink: '1',
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
			flexShrink: '1',
		},

		Fields: {
			flex: {
				direction: 'column',
			},
			gap: '1rem',
			minWidth: 0,
			flexShrink: '1',

			$mol_string: {
				padding: {
					top: '.7rem',
					bottom: '.7rem',
					left: '1.1rem',
					right: '1.1rem',
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
				minWidth: 0,
				flexShrink: '1',
				minHeight: 0,
				':focus': {
					outline: 'none',
					border: {
						color: '#00000059',
					},
				},
			},
		},

		Head: {
			font: {
				size: '1.25rem',
			},
		},

		Body: {
			minHeight: '14rem',
			lineHeight: '1.5',
			resize: 'vertical',
		},

		Tags: {
			gap: '.3rem',
			flex: {
				wrap: 'wrap',
			},
			minWidth: 0,
			flexShrink: '1',
		},

		Tag: {
			gap: '.2rem',
			align: {
				items: 'center',
			},
			padding: {
				top: '.15rem',
				bottom: '.15rem',
				left: '.6rem',
				right: '.6rem',
			},
			borderRadius: '10rem',
			background: {
				color: $realworld_app_theme.pill,
			},
			color: 'white',
			font: {
				size: '.85rem',
			},
			whiteSpace: 'nowrap',
		},

		Tag_remove: {
			padding: 0,
			minHeight: 0,
			// $mol sizes buttons for touch; an inline icon must not reserve that width.
			minWidth: 0,
			flexShrink: '1',
			background: {
				color: 'transparent',
			},
			color: 'white',
		},

		Tag_remove_icon: {
			width: '.8rem',
			height: '.8rem',
			fill: 'currentcolor',
		},

		Publish: {
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

	} )

}
