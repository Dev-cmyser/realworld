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

		@ $mol_action
		override delete( next?: any ) {
			this.$.$realworld_api.comment_delete( this.slug(), this.comment().id )
		}

	}

}
