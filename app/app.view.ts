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

	}

}
