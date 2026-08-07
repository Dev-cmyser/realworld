namespace $.$$ {

	/** Sign in and sign up share a form; the `page` argument decides which one this is. */
	export class $realworld_app_auth extends $.$realworld_app_auth {

		page() {
			return this.$.$mol_state_arg.value( 'page' ) ?? ''
		}

		joining() {
			return this.page() === 'register'
		}

		override title() {
			return this.joining() ? 'Sign up' : 'Sign in'
		}

		switch_title() {
			return this.joining() ? 'Have an account?' : 'Need an account?'
		}

		override switch_arg() {
			return { page: this.joining() ? 'login' : 'register' }
		}

		@ $mol_mem
		override fields(): readonly $mol_view[] {
			if( this.joining() ) return [ this.Username(), this.Email(), this.Password() ]
			return [ this.Email(), this.Password() ]
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
			const joining = this.joining()
			const username = this.username()
			const email = this.email()
			const password = this.password()

			try {
				if( joining ) api.register( username, email, password )
				else api.login( email, password )
			} catch( error ) {
				// A suspended request keeps propagating; only a rejected one is a form error.
				if( $mol_promise_like( error ) ) return $mol_fail_hidden( error )
				if( !( error instanceof $realworld_api_error ) ) return $mol_fail_hidden( error )
				this.errors( $realworld_api_error.list( error.errors ) )
				return
			}

			this.errors( [] )
			this.password( '' )
			this.$.$mol_state_arg.go( $realworld_app_route() )
		}

	}

}
