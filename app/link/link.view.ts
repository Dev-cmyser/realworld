namespace $.$$ {

	/**
	 * Link that navigates to exactly the state it declares.
	 * Every route argument is listed, so the destination never depends on which
	 * arguments happen to already sit in the address, and following a link to the
	 * current page keeps you there instead of toggling the arguments off.
	 */
	export class $realworld_app_link extends $.$realworld_app_link {

		@ $mol_mem
		override uri() {
			const next = $realworld_app_route_clean()
			Object.assign( next, this.arg() )
			return this.$.$mol_state_arg.link( next )
		}

		override uri_toggle() {
			return this.uri()
		}

		/** Conduit marks the link of the page you are on, `.nav-link.active` and friends. */
		override class_names() {
			const base = this.class_base()
			if( !this.active() ) return base
			return base ? base + ' active' : 'active'
		}

		override attr_static() {
			const attrs = super.attr_static()
			delete attrs.mol_view
			delete attrs.mol_link
			return attrs
		}

	}

}
