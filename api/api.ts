namespace $ {

	export type $realworld_api_profile = {
		username: string
		bio: string | null
		image: string | null
		following: boolean
	}

	export type $realworld_api_article = {
		slug: string
		title: string
		description: string
		body: string
		tagList: readonly string[]
		createdAt: string
		updatedAt: string
		favorited: boolean
		favoritesCount: number
		author: $realworld_api_profile
	}

	export type $realworld_api_comment = {
		id: number
		createdAt: string
		updatedAt: string
		body: string
		author: $realworld_api_profile
	}

	export type $realworld_api_user = {
		email: string
		token: string
		username: string
		bio: string | null
		image: string | null
	}

	export type $realworld_api_page = {
		articles: readonly $realworld_api_article[]
		articlesCount: number
	}

	export type $realworld_api_filter = {
		tag?: string
		author?: string
		favorited?: string
		limit?: number
		offset?: number
	}

	export type $realworld_api_draft = {
		title: string
		description: string
		body: string
		tagList: readonly string[]
	}

	export type $realworld_api_patch = {
		email?: string
		username?: string
		password?: string
		bio?: string
		image?: string
	}

	/** Field-keyed validation messages, as returned by the Conduit API. */
	export type $realworld_api_errors = Record< string, readonly string[] >

	/** Non-2xx answer carrying the `errors` object the API responded with. */
	export class $realworld_api_error extends Error {

		constructor(
			readonly code: number,
			readonly errors: $realworld_api_errors | undefined,
		) {
			super( $realworld_api_error.list( errors ).join( '\n' ) || `HTTP Error ${ code }` )
		}

		/** Flattens `{ email: [ "can't be blank" ] }` into `[ "email can't be blank" ]`. */
		static list( errors: $realworld_api_errors | undefined ): string[] {
			if( !errors ) return []
			return Object.entries( errors ).flatMap(
				( [ field, messages ] ) => messages.map( message => `${ field } ${ message }` )
			)
		}

	}

	/**
	 * Thin typed client for the Conduit REST API.
	 * Reads are cached per URL and re-run whenever the token or `version` changes.
	 */
	export class $realworld_api extends $mol_object {

		/** Base URL of the backend. Override to target another Conduit instance. */
		static endpoint() {
			return 'https://api.realworld.show/api'
		}

		/** JWT of the signed in user, persisted between sessions. */
		static token( next?: string | null ) {
			return this.$.$mol_state_local.value< string >( 'jwtToken', next ) ?? null
		}

		/** Options applied to every request. Override to change auth or headers. */
		static fetch_init( method: string, body?: unknown ): RequestInit {

			const headers: Record< string, string > = {}

			const token = this.token()
			if( token ) headers[ 'Authorization' ] = `Token ${ token }`
			if( body !== undefined ) headers[ 'Content-Type' ] = 'application/json'

			return {
				method,
				headers,
				body: body === undefined ? undefined : JSON.stringify( body ),
			}
		}

		/** Bumped after every mutation to invalidate cached reads. */
		@ $mol_mem
		static version( next?: number ) {
			return next ?? 0
		}

		@ $mol_action
		static refresh() {
			this.version( this.version() + 1 )
		}

		static call( method: string, path: string, body?: unknown ): unknown {

			const response = this.$.$mol_fetch.response( this.endpoint() + path, this.fetch_init( method, body ) )
			if( response.code() === 204 ) return null

			const data = response.json()
			if( response.ok() ) return data

			throw new $realworld_api_error( response.code(), ( data as { errors: $realworld_api_errors } )?.errors )
		}

		/**
		 * Mutating request. A token the server rejects here is spent — tokens can be
		 * revoked or rotated server side — so drop it and fall back to signed out
		 * instead of leaving the app looking signed in.
		 */
		@ $mol_action
		static send( method: string, path: string, body?: unknown ): unknown {
			try {
				return this.call( method, path, body )
			} catch( error ) {
				if( $mol_promise_like( error ) ) return $mol_fail_hidden( error )
				if( error instanceof $realworld_api_error && error.code === 401 && this.token() ) {
					this.token( null )
					this.refresh()
				}
				return $mol_fail_hidden( error )
			}
		}

		/** Cached GET. The token is read so that `favorited`/`following` flags refresh on sign in. */
		@ $mol_mem_key
		static get( path: string ): unknown {
			this.version()
			this.token()
			return this.call( 'GET', path )
		}

		static query( params: Record< string, string | number | undefined > ) {
			const pairs = Object.entries( params )
				.filter( ( [ , value ] ) => value !== undefined && value !== '' )
				.map( ( [ key, value ] ) => `${ encodeURIComponent( key ) }=${ encodeURIComponent( String( value ) ) }` )
			return pairs.length ? '?' + pairs.join( '&' ) : ''
		}

		static filter_query( filter: $realworld_api_filter ) {
			return this.query( {
				tag: filter.tag,
				author: filter.author,
				favorited: filter.favorited,
				limit: filter.limit,
				offset: filter.offset,
			} )
		}

		// --- reads ---

		static articles( filter: $realworld_api_filter = {} ) {
			return this.get( '/articles' + this.filter_query( filter ) ) as $realworld_api_page
		}

		static feed( filter: $realworld_api_filter = {} ) {
			return this.get( '/articles/feed' + this.filter_query( filter ) ) as $realworld_api_page
		}

		static article( slug: string ) {
			return ( this.get( `/articles/${ encodeURIComponent( slug ) }` ) as { article: $realworld_api_article } ).article
		}

		static comments( slug: string ) {
			return ( this.get( `/articles/${ encodeURIComponent( slug ) }/comments` ) as { comments: readonly $realworld_api_comment[] } ).comments
		}

		static tags() {
			return ( this.get( '/tags' ) as { tags: readonly string[] } ).tags
		}

		static profile( username: string ) {
			return ( this.get( `/profiles/${ encodeURIComponent( username ) }` ) as { profile: $realworld_api_profile } ).profile
		}

		/** Signed in user, or `null` when there is no token or it is no longer accepted. */
		@ $mol_mem
		static user(): $realworld_api_user | null {

			if( !this.token() ) return null

			try {
				return ( this.get( '/user' ) as { user: $realworld_api_user } ).user
			} catch( error ) {
				// A suspended read must keep propagating, only a rejected token means "signed out".
				if( $mol_promise_like( error ) ) return $mol_fail_hidden( error )
				if( error instanceof $realworld_api_error && error.code === 401 ) return null
				return $mol_fail_hidden( error )
			}

		}

		// --- authentication ---

		@ $mol_action
		static login( email: string, password: string ) {
			const data = this.send( 'POST', '/users/login', { user: { email, password } } ) as { user: $realworld_api_user }
			this.token( data.user.token )
			return data.user
		}

		@ $mol_action
		static register( username: string, email: string, password: string ) {
			const data = this.send( 'POST', '/users', { user: { username, email, password } } ) as { user: $realworld_api_user }
			this.token( data.user.token )
			return data.user
		}

		@ $mol_action
		static logout() {
			this.token( null )
			this.refresh()
		}

		@ $mol_action
		static user_update( patch: $realworld_api_patch ) {
			const data = this.send( 'PUT', '/user', { user: patch } ) as { user: $realworld_api_user }
			this.token( data.user.token )
			this.refresh()
			return data.user
		}

		// --- mutations ---

		@ $mol_action
		static article_create( draft: $realworld_api_draft ) {
			const data = this.send( 'POST', '/articles', { article: draft } ) as { article: $realworld_api_article }
			this.refresh()
			return data.article
		}

		@ $mol_action
		static article_update( slug: string, draft: Partial< $realworld_api_draft > ) {
			const data = this.send( 'PUT', `/articles/${ encodeURIComponent( slug ) }`, { article: draft } ) as { article: $realworld_api_article }
			this.refresh()
			return data.article
		}

		@ $mol_action
		static article_delete( slug: string ) {
			this.send( 'DELETE', `/articles/${ encodeURIComponent( slug ) }` )
			this.refresh()
		}

		@ $mol_action
		static favorite( slug: string, next: boolean ) {
			const data = this.send(
				next ? 'POST' : 'DELETE',
				`/articles/${ encodeURIComponent( slug ) }/favorite`,
			) as { article: $realworld_api_article }
			this.refresh()
			return data.article
		}

		@ $mol_action
		static follow( username: string, next: boolean ) {
			const data = this.send(
				next ? 'POST' : 'DELETE',
				`/profiles/${ encodeURIComponent( username ) }/follow`,
			) as { profile: $realworld_api_profile }
			this.refresh()
			return data.profile
		}

		@ $mol_action
		static comment_create( slug: string, body: string ) {
			const data = this.send(
				'POST',
				`/articles/${ encodeURIComponent( slug ) }/comments`,
				{ comment: { body } },
			) as { comment: $realworld_api_comment }
			this.refresh()
			return data.comment
		}

		@ $mol_action
		static comment_delete( slug: string, id: number ) {
			this.send( 'DELETE', `/articles/${ encodeURIComponent( slug ) }/comments/${ id }` )
			this.refresh()
		}

	}

}
