namespace $.$$ {

	export class $realworld_app_nav extends $.$realworld_app_nav {

		user() {
			return this.$.$realworld_api.user()
		}

		username() {
			return this.user()?.username ?? ''
		}

		avatar() {
			return this.user()?.image || $realworld_app_avatar
		}

		page() {
			return this.$.$mol_state_arg.value( 'page' ) ?? ''
		}

		@ $mol_mem
		override menu(): readonly $mol_view[] {

			if( !this.user() ) return [ this.Home_link(), this.Signin_link(), this.Signup_link() ]

			return [ this.Home_link(), this.Editor_link(), this.Settings_link(), this.Profile_link() ]
		}

		home_active() {
			return this.page() === ''
		}

		signin_active() {
			return this.page() === 'login'
		}

		signup_active() {
			return this.page() === 'register'
		}

		editor_active() {
			return this.page() === 'editor'
		}

		settings_active() {
			return this.page() === 'settings'
		}

		profile_active() {
			return this.page() === 'profile' && this.$.$mol_state_arg.value( 'user' ) === this.username()
		}

	}

}
