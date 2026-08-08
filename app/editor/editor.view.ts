namespace $.$$ {

	/** Writes a new article, or edits an existing one when the `slug` argument is set. */
	export class $realworld_app_editor extends $.$realworld_app_editor {

		slug() {
			return this.$.$mol_state_arg.value( 'slug' ) ?? ''
		}

		@ $mol_mem
		source(): $realworld_api_article | null {
			const slug = this.slug()
			if( !slug ) return null
			return this.$.$realworld_api.article( slug )
		}

		submit_title() {
			return this.slug() ? 'Update Article' : 'Publish Article'
		}

		// Each field mirrors the stored article until the author edits it.

		@ $mol_mem
		override form_title( next?: string ): string {
			return next ?? this.source()?.title ?? ''
		}

		@ $mol_mem
		override form_about( next?: string ): string {
			return next ?? this.source()?.description ?? ''
		}

		@ $mol_mem
		override form_body( next?: string ): string {
			return next ?? this.source()?.body ?? ''
		}

		@ $mol_mem
		tags( next?: readonly string[] ): readonly string[] {
			return next ?? this.source()?.tagList ?? []
		}

		@ $mol_mem
		override tag_pills(): readonly $mol_view[] {
			return this.tags().map( tag => this.Tag( tag ) )
		}

		tag_name( id: string ) {
			return id
		}

		@ $mol_action
		override tag_add( next?: any ) {
			const tag = this.tag_draft().trim()
			if( !tag ) return
			if( !this.tags().includes( tag ) ) this.tags( [ ... this.tags(), tag ] )
			this.tag_draft( '' )
		}

		@ $mol_action
		override tag_remove( id: string, next?: any ) {
			this.tags( this.tags().filter( tag => tag !== id ) )
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
			const slug = this.slug()

			const draft = {
				title: this.form_title(),
				description: this.form_about(),
				body: this.form_body(),
				tagList: this.tags(),
			}

			let article: $realworld_api_article

			try {
				article = slug ? api.article_update( slug, draft ) : api.article_create( draft )
			} catch( error ) {
				if( $mol_promise_like( error ) ) return $mol_fail_hidden( error )
				this.errors( $realworld_api_error.messages( error ) )
				return
			}

			this.errors( [] )
			// Editing the title changes the slug, so navigate to whatever came back.
			this.$.$mol_state_arg.go( { ... $realworld_app_route_clean(), page: 'article', slug: article.slug } )
		}

	}

}
