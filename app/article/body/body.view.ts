namespace $.$$ {

	/**
	 * Markdown from the API, rendered by $mol_text.
	 *
	 * The one change is the element a paragraph lands in: $mol_text builds them from
	 * `$mol_paragraph`, which is a `div`, and both the Conduit stylesheet and the
	 * test contract address article text as `.article-content p`. Retyping the
	 * paragraph in view.tree would shadow the base implementation of its content, so
	 * the element name is set on the instance instead.
	 */
	export class $realworld_app_article_body extends $.$realworld_app_article_body {

		override Paragraph( index: number ) {
			const paragraph = super.Paragraph( index )
			paragraph.dom_name = () => 'p'
			return paragraph
		}

	}

}
