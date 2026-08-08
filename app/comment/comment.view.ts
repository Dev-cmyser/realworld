namespace $.$$ {

	export class $realworld_app_comment extends $.$realworld_app_comment {

		override comment(): $realworld_api_comment {
			return super.comment()
		}

		body() {
			return this.comment().body
		}

		author() {
			return this.comment().author.username
		}

		author_image() {
			return this.comment().author.image || $realworld_app_avatar
		}

		date() {
			return $realworld_app_date( this.comment().createdAt )
		}

		@ $mol_mem
		override actions(): readonly $mol_view[] {
			const user = this.$.$realworld_api.user()
			if( user?.username !== this.author() ) return []
			return [ this.Delete() ]
		}

		/**
		 * Both outcomes are reported up to the article, which owns the comment list and
		 * the one error list on the page. Once the server has accepted the delete the
		 * card goes right away, rather than waiting for the list to be fetched again.
		 */
		@ $mol_action
		override delete( next?: any ) {

			const id = this.comment().id

			try {
				this.$.$realworld_api.comment_delete( this.slug(), id )
			} catch( error ) {
				if( $mol_promise_like( error ) ) return $mol_fail_hidden( error )
				this.errors( $realworld_api_error.messages( error ) )
				return null
			}

			this.dropped( id )
			return null
		}

	}

}
