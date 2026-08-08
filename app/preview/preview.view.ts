namespace $.$$ {

	/** Article card as it appears in any feed. */
	export class $realworld_app_preview extends $.$realworld_app_preview {

		override article(): $realworld_api_article {
			return super.article()
		}

		override slug() {
			return this.article().slug
		}

		override title() {
			return this.article().title
		}

		description() {
			return this.article().description
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

		favorites_count() {
			return ' ' + this.article().favoritesCount
		}

		favorited() {
			return this.article().favorited
		}

		/** Conduit fills the heart in by swapping the outline button for a solid one. */
		override favorite_class() {
			const look = this.favorited() ? 'btn-primary' : 'btn-outline-primary'
			return `btn ${ look } btn-sm pull-xs-right`
		}

		@ $mol_action
		override favorite( next?: any ) {

			// The suspending read comes first, so the very first click is not swallowed
			// while the current user is still loading.
			const api = this.$.$realworld_api
			if( !api.user() ) {
				this.$.$mol_state_arg.go( { ... $realworld_app_route_clean(), page: 'login' } )
				return null
			}

			api.favorite( this.slug(), !this.favorited() )
			return null
		}

		@ $mol_mem
		override tag_pills() {
			return this.article().tagList.map( tag => this.Tag( tag ) )
		}

		tag_name( id: string ) {
			return id
		}

	}

}
