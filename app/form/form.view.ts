namespace $.$$ {

	/**
	 * Real `<form>`, so a submit button and the Enter key both work the way the
	 * browser already knows how. The page reload that would normally follow is what
	 * gets cancelled here — everything past that point is the app's own business.
	 */
	export class $realworld_app_form extends $.$realworld_app_form {

		@ $mol_action
		override event_submit( next?: Event ) {
			next?.preventDefault()
			this.submit( null )
			return null
		}

	}

}
