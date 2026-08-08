namespace $.$$ {

	/**
	 * Paginated article list. `mode` picks the endpoint and the extra filter:
	 * `global` (optionally narrowed by the `tag` argument), `following`,
	 * `author` and `favorited` (both keyed by `author`).
	 */
	export class $realworld_app_feed extends $.$realworld_app_feed {

		limit() {
			return 10
		}

		num() {
			return Number( this.$.$mol_state_arg.value( 'num' ) ) || 1
		}

		tag() {
			return this.$.$mol_state_arg.value( 'tag' ) ?? ''
		}

		@ $mol_mem
		filter(): $realworld_api_filter {

			const filter: $realworld_api_filter = {
				limit: this.limit(),
				offset: ( this.num() - 1 ) * this.limit(),
			}

			if( this.mode() === 'author' ) filter.author = this.author()
			if( this.mode() === 'favorited' ) filter.favorited = this.author()
			if( this.mode() === 'global' && this.tag() ) filter.tag = this.tag()

			return filter
		}

		@ $mol_mem
		result(): $realworld_api_page {
			const filter = this.filter()
			if( this.mode() === 'following' ) return this.$.$realworld_api.feed( filter )
			return this.$.$realworld_api.articles( filter )
		}

		@ $mol_mem
		override rows(): readonly $mol_view[] {
			const articles = this.result().articles
			if( !articles.length ) return [ this.Empty() ]
			return articles.map( article => this.Preview( article.slug ) )
		}

		/** Your Feed stays empty until you follow somebody, so it points at the way out. */
		@ $mol_mem
		override empty_note(): readonly ( $mol_view | string )[] {
			if( this.mode() !== 'following' ) return [ 'No articles are here... yet.' ]
			return [ 'Your feed is empty. Browse the ', this.Global_link(), ' to find authors to follow.' ]
		}

		@ $mol_mem_key
		override article( slug: string ): $realworld_api_article {
			return this.result().articles.find( article => article.slug === slug )!
		}

		pages() {
			return Math.ceil( this.result().articlesCount / this.limit() )
		}

		@ $mol_mem
		override page_items(): readonly $mol_view[] {
			const count = this.pages()
			if( count < 2 ) return []
			return Array.from( { length: count }, ( _, index ) => this.Page( index + 1 ) )
		}

		page_label( num: number ) {
			return String( num )
		}

		override page_class( num: number ) {
			return num === this.num() ? 'page-item active' : 'page-item'
		}

		/** Paging keeps whatever the feed is currently scoped to. */
		@ $mol_mem_key
		page_arg( num: number ): Record< string, string | null > {
			const arg = this.$.$mol_state_arg
			return {
				page: arg.value( 'page' ),
				slug: arg.value( 'slug' ),
				user: arg.value( 'user' ),
				tab: arg.value( 'tab' ),
				tag: arg.value( 'tag' ),
				num: num === 1 ? null : String( num ),
			}
		}

		@ $mol_action
		override page_go( num: number, next?: any ) {
			this.$.$mol_state_arg.go( this.page_arg( num ) )
			return null
		}

	}

}
