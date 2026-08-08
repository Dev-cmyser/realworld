namespace $.$$ {

	export class $realworld_app extends $.$realworld_app {

		static {
			$realworld_app_route.activate()
			$realworld_app_debug.install()
		}

		page() {
			return this.$.$mol_state_arg.value( 'page' ) ?? ''
		}

		user() {
			return this.$.$realworld_api.user()
		}

		@ $mol_mem
		layout(): readonly $mol_view[] {
			return [ this.Nav(), ... this.body(), this.Foot() ]
		}

		@ $mol_mem
		body(): readonly $mol_view[] {
			switch( this.page() ) {
				case 'article': return [ this.Article() ]
				case 'login': return [ this.Auth() ]
				case 'register': return [ this.Auth() ]
				case 'profile': return [ this.Profile() ]
				// Pages that need an account fall back to the sign in form.
				case 'settings': return this.user() ? [ this.Settings() ] : [ this.Auth() ]
				case 'editor': return this.user() ? [ this.Editor() ] : [ this.Auth() ]
				default: return [ this.Home() ]
			}
		}

		/**
		 * The pages that need an account are addresses anybody can type in. A visitor
		 * the server has no account for belongs on the sign in form, address and all.
		 *
		 * Only a refusal counts. While the server is unreachable the token may still be
		 * good, and throwing somebody out over a connection blip would be worse than
		 * showing them an empty form.
		 */
		@ $mol_mem
		guard() {
			const page = this.page()
			if( page !== 'settings' && page !== 'editor' ) return null
			if( this.$.$realworld_api.auth() !== 'unauthenticated' ) return null
			return new $mol_after_tick( () => $mol_wire_async( this ).sign_in() )
		}

		@ $mol_action
		sign_in() {
			this.$.$mol_state_arg.go( { ... $realworld_app_route_clean(), page: 'login' } )
		}

		override auto() {
			this.guard()
			this.$.$realworld_api.token_check()
			return []
		}

	}

}
