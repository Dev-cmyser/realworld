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

	}

}
