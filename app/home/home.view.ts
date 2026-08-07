namespace $.$$ {

	export class $realworld_app_home extends $.$realworld_app_home {

		override tag() {
			return this.$.$mol_state_arg.value( 'tag' ) ?? ''
		}

		tab() {
			return this.$.$mol_state_arg.value( 'tab' ) ?? ''
		}

		override feed_mode() {
			return this.tab() === 'following' ? 'following' : 'global'
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

	}

}
