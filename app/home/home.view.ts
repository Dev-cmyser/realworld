namespace $.$$ {

	export class $realworld_app_home extends $.$realworld_app_home {

		override tag() {
			return this.$.$mol_state_arg.value( 'tag' ) ?? ''
		}

		tab() {
			return this.$.$mol_state_arg.value( 'tab' ) ?? ''
		}

		override feed_mode() {
			if( this.tab() !== 'following' ) return 'global'
			// A signed out visitor is on the way to the sign in form; asking the API for
			// their feed in the meantime only answers with an error.
			return this.$.$realworld_api.user() ? 'following' : 'global'
		}

		@ $mol_mem
		override feed_tabs(): readonly $mol_view[] {

			const tabs = [] as $mol_view[]

			if( this.$.$realworld_api.user() ) tabs.push( this.Feed_tab() )
			tabs.push( this.Global_tab() )
			if( this.tag() ) tabs.push( this.Tag_tab() )

			return tabs
		}

		feed_active() {
			return this.tab() === 'following'
		}

		global_active() {
			return this.tab() !== 'following' && !this.tag()
		}

		tag_tab_title() {
			return '#' + this.tag()
		}

		@ $mol_mem
		override tag_links(): readonly $mol_view[] {
			return this.$.$realworld_api.tags().map( tag => this.Tag_link( tag ) )
		}

		tag_name( id: string ) {
			return id
		}

		/**
		 * Your Feed is an address a signed out visitor can type in, and there is no
		 * feed to show them. The spec sends them to sign in.
		 */
		@ $mol_mem
		guard() {
			if( this.tab() !== 'following' ) return null
			if( this.$.$realworld_api.user() ) return null
			// Changing the address mid render leaves the page half drawn: the model moves
			// on to the sign in form while the DOM keeps the feed. Waiting a tick lets
			// this render finish and the next one start from the new address. A frame is
			// no good here — a background tab never paints, and the jump would never happen.
			// The timer is the value of the cell so that it outlives the calculation.
			return new $mol_after_tick( () => $mol_wire_async( this ).sign_in() )
		}

		@ $mol_action
		sign_in() {
			this.$.$mol_state_arg.go( { ... $realworld_app_route_clean(), page: 'login' } )
		}

		override auto() {
			this.guard()
			return []
		}

	}

}
