namespace $.$$ {

	export class $realworld_app_article extends $.$realworld_app_article {

		override slug() {
			return this.$.$mol_state_arg.value( 'slug' ) ?? ''
		}

		@ $mol_mem
		override article(): $realworld_api_article {
			return this.$.$realworld_api.article( this.slug() )
		}

		override title() {
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

		@ $mol_mem_key
		override comment( id: string ): $realworld_api_comment {
			return this.comments().find( comment => String( comment.id ) === id )!
		}

		user() {
			return this.$.$realworld_api.user()
		}

		user_image() {
			return this.user()?.image || $realworld_app_avatar
		}

		@ $mol_mem
		override comment_box(): readonly $mol_view[] {
			return [
				this.user() ? this.Form() : this.Guest_note(),
				... this.comments().map( comment => this.Comment( String( comment.id ) ) ),
			]
		}

		@ $mol_mem
		override errors( next?: readonly string[] ): readonly string[] {
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
		override post( next?: any ) {

			const text = this.comment_text().trim()
			if( !text ) return null

			try {
				this.$.$realworld_api.comment_create( this.slug(), text )
			} catch( error ) {
				if( $mol_promise_like( error ) ) return $mol_fail_hidden( error )
				this.errors( $realworld_api_error.messages( error ) )
				return null
			}

			this.errors( [] )
			this.comment_text( '' )
			return null
		}

	}

}
