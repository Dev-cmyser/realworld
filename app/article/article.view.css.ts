namespace $.$$ {

	$mol_style_define( $realworld_app_article, {

		flex: {
			direction: 'column',
		},
		minWidth: 0,
		flexShrink: '1',

		Banner: {
			padding: {
				top: '2rem',
				bottom: '2rem',
				left: '1rem',
				right: '1rem',
			},
			background: {
				color: '#333333',
			},
			color: 'white',
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
			gap: '1.5rem',
			minWidth: 0,
			flexShrink: '1',
		},

		Title: {
			margin: 0,
			font: {
				family: $realworld_app_theme.head,
				size: '2.8rem',
				weight: 600,
			},
			lineHeight: '1.1',
			minWidth: 0,
			flexShrink: '1',
			wordBreak: 'break-word',
		},

		Container: {
			width: '100%',
			maxWidth: '1140px',
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
			gap: '1.5rem',
			minWidth: 0,
			flexShrink: '1',
		},

		Body: {
			font: {
				size: '1.2rem',
			},
			lineHeight: '1.8',
			minWidth: 0,
			flexShrink: '1',
			wordBreak: 'break-word',

			$mol_text_header: {
				font: {
					weight: 600,
				},
				color: $realworld_app_theme.text,

				// $mol_text italicises h2/h4/h6 through element-qualified rules.
				// Conduit renders every heading upright, and `:not(:root)` is a no-op
				// filter that lifts this rule above them — a heading is never the root.
				':not(:root)': {
					fontStyle: 'normal',
				},
			},
		},

		Tags: {
			gap: '.2rem',
			flex: {
				wrap: 'wrap',
			},
			minWidth: 0,
			flexShrink: '1',
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

		Divider: {
			height: '1px',
			minHeight: '1px',
			background: {
				color: '#00000019',
			},
		},

		Meta_bottom: {
			justify: {
				content: 'center',
			},
		},

		Comments: {
			width: '100%',
			maxWidth: '730px',
			margin: {
				left: 'auto',
				right: 'auto',
			},
			flex: {
				direction: 'column',
			},
			gap: '1rem',
			minWidth: 0,
			flexShrink: '1',
		},

		Comment_box: {
			flex: {
				direction: 'column',
			},
			minWidth: 0,
			flexShrink: '1',
		},

		Form: {
			flex: {
				direction: 'column',
			},
			border: {
				width: '1px',
				style: 'solid',
				color: '#00000019',
			},
			borderRadius: '4px',
			minWidth: 0,
			flexShrink: '1',
		},

		Comment_text: {
			padding: '1rem',
			minHeight: '6rem',
			minWidth: 0,
			flexShrink: '1',
			border: {
				width: 0,
			},
			borderRadius: '0',
			background: {
				color: 'white',
			},
			color: $realworld_app_theme.text,
			lineHeight: '1.5',
			resize: 'vertical',
			':focus': {
				outline: 'none',
			},
		},

		Form_foot: {
			gap: '.5rem',
			align: {
				items: 'center',
			},
			justify: {
				content: 'space-between',
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
					color: '#00000019',
				},
			},
			minWidth: 0,
			flexShrink: '1',
		},

		Comment_avatar: {
			width: '30px',
			height: '30px',
			minWidth: '30px',
			borderRadius: '50%',
			objectFit: 'cover',
		},

		Post: {
			padding: {
				top: '.4rem',
				bottom: '.4rem',
				left: '.9rem',
				right: '.9rem',
			},
			border: {
				width: '1px',
				style: 'solid',
				color: $realworld_app_theme.brand,
			},
			borderRadius: '.2rem',
			background: {
				color: $realworld_app_theme.brand,
			},
			color: 'white',
			font: {
				size: '.85rem',
			},
			minHeight: 0,
			whiteSpace: 'nowrap',
			':hover': {
				background: {
					color: $realworld_app_theme.brand_dark,
				},
			},
		},

		Guest_note: {
			gap: '.25rem',
			flex: {
				wrap: 'wrap',
			},
			align: {
				items: 'baseline',
			},
			color: $realworld_app_theme.meta,
			minWidth: 0,
			flexShrink: '1',
		},

		Comment_list: {
			minWidth: 0,
			flexShrink: '1',
		},

		'@media': {
			'(max-width: 768px)': {
				Title: {
					font: {
						size: '2rem',
					},
				},
				Body: {
					font: {
						size: '1.05rem',
					},
					lineHeight: '1.6',
				},
			},
		},

	} )

}
