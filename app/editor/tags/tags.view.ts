namespace $.$$ {

	/**
	 * Tag field of the editor. Enter here adds a tag, so it must not reach the form
	 * around it, where Enter means publish.
	 */
	export class $realworld_app_editor_tags extends $.$realworld_app_editor_tags {

		@ $mol_action
		override event_enter( next?: KeyboardEvent ) {
			if( next?.key !== 'Enter' ) return null
			next.preventDefault()
			this.enter( null )
			return null
		}

	}

}
