namespace $.$$ {

	/** Article card as it appears in any feed. */
	export class $realworld_app_preview extends $.$realworld_app_preview {

		override article(): $realworld_api_article {
			return super.article()
		}

		slug() {
			return this.article().slug
		}

		title() {
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
			return String( this.article().favoritesCount )
		}

		@ $mol_mem
		tag_pills() {
			return this.article().tagList.map( tag => this.Tag( tag ) )
		}

		tag_name( id: string ) {
			return id
		}

	}

}
