namespace $.$$ {

	/** Text field the e2e contract finds by its `name`, dressed by the shared stylesheet. */
	export class $realworld_app_input extends $.$realworld_app_input {

		/**
		 * The three overrides below all undo the same thing.
		 *
		 * $mol_string keeps the caret and the selection in state and pushes them back
		 * into the element on every render. An edit made of several steps — select
		 * everything, then type over it — gets a render in the middle, the selection
		 * collapses to the remembered position, and the new text lands beside the old
		 * instead of replacing it. Anything driving the page does this: a paste, a
		 * password manager, a browser automating a form.
		 *
		 * These fields hold plain text and never need to move the caret themselves, so
		 * the element is left to keep its own. What the visitor typed is read out of it,
		 * and the value is pushed in only when it genuinely differs.
		 */
		@ $mol_action
		override event_change( next?: Event ) {
			if( !next ) return
			this.value( ( this.dom_node() as HTMLInputElement ).value )
		}

		override selection_watcher() {
			return null
		}

		override selection_start() {
			return ( this.dom_node() as HTMLInputElement ).selectionStart ?? 0
		}

		override selection_end() {
			return ( this.dom_node() as HTMLInputElement ).selectionEnd ?? 0
		}

		override attr_static() {
			const attrs = super.attr_static()
			delete attrs.mol_view
			delete attrs.mol_string
			return attrs
		}

	}

}
