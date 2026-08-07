namespace $.$$ {

	export class $realworld_app_settings extends $.$realworld_app_settings {

		user() {
			return this.$.$realworld_api.user()
		}

		// Each field falls back to the stored profile until the visitor edits it.

		@ $mol_mem
		override username( next?: string ): string {
			return next ?? this.user()?.username ?? ''
		}

		@ $mol_mem
		override email( next?: string ): string {
			return next ?? this.user()?.email ?? ''
		}

		@ $mol_mem
		override bio( next?: string ): string {
			return next ?? this.user()?.bio ?? ''
		}

		@ $mol_mem
		override image( next?: string ): string {
			return next ?? this.user()?.image ?? ''
		}

		@ $mol_mem
		errors( next?: readonly string[] ): readonly string[] {
			return next ?? []
		}

		@ $mol_mem
		override error_rows(): readonly $mol_view[] {
			return this.errors().map( ( _, index ) => this.Error( index ) )
		}

		error_text( index: number ) {
			return this.errors()[ index ]
		}

		@ $mol_action
		override submit( next?: any ) {

			const api = this.$.$realworld_api

			const patch: $realworld_api_patch = {
				username: this.username(),
				email: this.email(),
				bio: this.bio(),
				image: this.image(),
			}

			const password = this.password()
			if( password ) patch.password = password

			try {
				api.user_update( patch )
			} catch( error ) {
				if( $mol_promise_like( error ) ) return $mol_fail_hidden( error )
				if( !( error instanceof $realworld_api_error ) ) return $mol_fail_hidden( error )
				this.errors( $realworld_api_error.list( error.errors ) )
				return
			}

			this.errors( [] )
			this.password( '' )
			this.$.$mol_state_arg.go( { ... $realworld_app_route(), page: 'profile', user: patch.username ?? null } )
		}

		@ $mol_action
		override logout( next?: any ) {
			this.$.$realworld_api.logout()
			this.$.$mol_state_arg.go( $realworld_app_route() )
		}

	}

}
