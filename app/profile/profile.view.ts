namespace $.$$ {

	export class $realworld_app_profile extends $.$realworld_app_profile {

		override username() {
			return this.$.$mol_state_arg.value( 'user' ) ?? ''
		}

		tab() {
			return this.$.$mol_state_arg.value( 'tab' ) ?? ''
		}

		@ $mol_mem
		profile(): $realworld_api_profile {
			return this.$.$realworld_api.profile( this.username() )
		}

		/**
		 * Without a profile there is nobody to put in the banner, so the page says so
		 * instead of filling it with an author-shaped hole. A request still in flight is
		 * not a failure and keeps suspending.
		 */
		@ $mol_mem
		override sub(): readonly $mol_view[] {
			try {
				this.profile()
			} catch( error ) {
				if( $mol_promise_like( error ) ) return $mol_fail_hidden( error )
				return [ this.Missing() ]
			}
			return [ this.Banner(), this.Container() ]
		}

		image() {
			return this.profile().image || $realworld_app_avatar
		}

		bio() {
			return this.profile().bio ?? ''
		}

		following() {
			return this.profile().following
		}

		follow_title() {
			return ` ${ this.following() ? 'Unfollow' : 'Follow' } ${ this.username() }`
		}

		override feed_mode() {
			return this.tab() === 'favorites' ? 'favorited' : 'author'
		}

		mine_active() {
			return this.tab() !== 'favorites'
		}

		fav_active() {
			return this.tab() === 'favorites'
		}

		@ $mol_mem
		override feed_tabs(): readonly $mol_view[] {
			return [ this.Mine_tab(), this.Fav_tab() ]
		}

		@ $mol_mem
		override actions(): readonly $mol_view[] {
			const user = this.$.$realworld_api.user()
			if( user?.username === this.username() ) return [ this.Edit() ]
			return [ this.Follow() ]
		}

		@ $mol_action
		override follow( next?: any ) {

			const api = this.$.$realworld_api
			if( !api.user() ) {
				this.$.$mol_state_arg.go( { ... $realworld_app_route_clean(), page: 'login' } )
				return
			}

			api.follow( this.username(), !this.following() )
		}

	}

}
