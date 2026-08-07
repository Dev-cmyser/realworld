namespace $.$$ {

	export class $realworld_app_article extends $.$realworld_app_article {

		slug() {
			return this.$.$mol_state_arg.value( 'slug' ) ?? ''
		}

		@ $mol_mem
		override article(): $realworld_api_article {
			return this.$.$realworld_api.article( this.slug() )
		}

		title() {
			return this.article().title
		}

		body() {
			return this.article().body
		}

		@ $mol_mem
		override tag_pills() {
			return this.article().tagList.map( tag => this.Tag( tag ) )
		}

		tag_name( id: string ) {
			return id
		}

		@ $mol_mem
		comments() {
			return this.$.$realworld_api.comments( this.slug() )
		}

		@ $mol_mem
		override comment_rows(): readonly $mol_view[] {
			return this.comments().map( comment => this.Comment( String( comment.id ) ) )
		}

		@ $mol_mem_key
		override comment( id: string ): $realworld_api_comment {
			return this.comments().find( comment => String( comment.id ) === id )!
		}

	}

}
