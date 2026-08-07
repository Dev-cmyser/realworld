namespace $.$$ {

	/** Author strip shown under the article title and again below the body. */
	export class $realworld_app_article_meta extends $.$realworld_app_article_meta {

		override article(): $realworld_api_article {
			return super.article()
		}

		author() {
			return this.article().author.username
		}

		author_image() {
			return this.article().author.image || $realworld_app_avatar
		}

		date() {
			return $realworld_app_date( this.article().createdAt )
		}

		following() {
			return this.article().author.following
		}

		favorited() {
			return this.article().favorited
		}

		follow_title() {
			return `${ this.following() ? 'Unfollow' : 'Follow' } ${ this.author() }`
		}

		favorite_title() {
			return `${ this.favorited() ? 'Unfavorite' : 'Favorite' } Article (${ this.article().favoritesCount })`
		}

		override slug() {
			return this.article().slug
		}

		@ $mol_mem
		override actions(): readonly $mol_view[] {
			const user = this.$.$realworld_api.user()
			if( user && user.username === this.author() ) return [ this.Edit(), this.Delete() ]
			return [ this.Follow(), this.Favorite() ]
		}

		@ $mol_action
		override delete( next?: any ) {
			this.$.$realworld_api.article_delete( this.slug() )
			this.$.$mol_state_arg.go( $realworld_app_route() )
		}

		@ $mol_action
		override follow( next?: any ) {

			const api = this.$.$realworld_api
			if( !api.user() ) {
				this.$.$mol_state_arg.go( { ... $realworld_app_route(), page: 'login' } )
				return
			}

			api.follow( this.author(), !this.following() )
		}

		@ $mol_action
		override favorite( next?: any ) {

			const api = this.$.$realworld_api
			if( !api.user() ) {
				this.$.$mol_state_arg.go( { ... $realworld_app_route(), page: 'login' } )
				return
			}

			api.favorite( this.article().slug, !this.favorited() )
		}

	}

}
