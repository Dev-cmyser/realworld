namespace $.$$ {

	/**
	 * Link that navigates to exactly the state it declares.
	 * Every route argument is listed, so the destination never depends on which
	 * arguments happen to already sit in the URL, and following a link to the
	 * current page keeps you there instead of toggling the arguments off.
	 */
	export class $realworld_app_link extends $.$realworld_app_link {

		route(): Record< string, string | null > {
			return { page: null, slug: null, user: null, tab: null, tag: null, num: null }
		}

		@ $mol_mem
		override uri() {
			const next = this.route()
			Object.assign( next, this.arg() )
			return this.$.$mol_state_arg.link( next )
		}

		override uri_toggle() {
			return this.uri()
		}

	}

}
