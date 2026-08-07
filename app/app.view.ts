namespace $.$$ {

	export class $realworld_app extends $.$realworld_app {

		page() {
			return this.$.$mol_state_arg.value( 'page' ) ?? ''
		}

		@ $mol_mem
		override body(): readonly $mol_view[] {
			switch( this.page() ) {
				case 'article': return [ this.Article() ]
				default: return [ this.Home() ]
			}
		}

	}

}
