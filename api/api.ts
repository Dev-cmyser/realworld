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

		/**
		 * What to put in front of the visitor for any failed request, including the ones
		 * the API never got to answer — a form that swallows a dropped connection looks
		 * broken, so those get a message of their own.
		 */
		static messages( error: unknown ): readonly string[] {

			if( !( error instanceof $realworld_api_error ) ) {
				return [ 'Unable to connect to the server. Check your connection and try again.' ]
			}

			const list = this.list( error.errors )
			return list.length ? list : [ error.message ]
		}

	}

	/**
	 * Where the app stands with the current visitor. `unavailable` is the case the
	 * other three do not cover: there is a token, and the server is in no state to
	 * say whether it is any good — which is not a reason to throw it away.
	 */
	export type $realworld_api_auth = 'authenticated' | 'unauthenticated' | 'unavailable' | 'loading'

	/**
	 * Thin typed client for the Conduit REST API.
	 * Reads are cached per URL and re-run whenever the token or `version` changes.
	 */
	export class $realworld_api extends $mol_object {

		/** Base URL of the backend. Override to target another Conduit instance. */
		static endpoint() {
			return 'https://api.realworld.show/api'
		}

		/**
		 * JWT of the signed in user.
		 *
		 * Stored raw under the key the spec names, not JSON encoded: the e2e suite
		 * plants and reads `localStorage.jwtToken` itself and expects the bare token
		 * there, so a wrapper of any kind would be a different contract.
		 */
		@ $mol_mem
		static token( next?: string | null ): string | null {

			const store = $mol_dom_context.localStorage

			if( next === undefined ) return store?.getItem( 'jwtToken' ) ?? null

			if( next === null ) store?.removeItem( 'jwtToken' )
			else store?.setItem( 'jwtToken', next )

			return next
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
				// A favourite or a comment posted a moment before the visitor follows a link
				// would otherwise be cancelled along with the page. Reads have nowhere to
				// deliver an answer once that happens, so this is for writes only.
				keepalive: method !== 'GET',
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
					this.signed_out( 'Your session has ended. Sign in again.' )
					this.token( null )
					this.user_known( null )
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

		/**
		 * Why the app stopped being signed in, when it was not the visitor's doing.
		 * Shown on the sign in form they land on, so the trip there is not a mystery.
		 */
		@ $mol_mem
		static signed_out( next?: string ): string {
			return next ?? ''
		}

		/** The last thing the server said about the current user, from whichever endpoint said it. */
		@ $mol_mem
		static user_known( next?: $realworld_api_user | null ): $realworld_api_user | null {
			return next ?? null
		}

		/**
		 * Who is signed in, and how sure we are about it.
		 *
		 * A status the server chose is a verdict on the token — it is spent, whatever
		 * the code. Anything else (5xx, a dropped connection) says nothing about the
		 * token, so it survives and the app carries on signed out for now.
		 */
		@ $mol_mem
		static session(): { auth: $realworld_api_auth, user: $realworld_api_user | null } {

			if( !this.token() ) return { auth: 'unauthenticated', user: null }

			try {
				const user = ( this.get( '/user' ) as { user: $realworld_api_user } ).user
				return { auth: 'authenticated', user }
			} catch( error ) {
				if( $mol_promise_like( error ) ) {
					// Re-reading `/user` after an update must not make the app forget who is
					// signed in for the length of the round trip. The read stays subscribed,
					// so the answer still lands when it arrives.
					const known = this.user_known()
					if( known ) return { auth: 'authenticated', user: known }
					return $mol_fail_hidden( error )
				}
				const rejected = error instanceof $realworld_api_error && error.code < 500
				return { auth: rejected ? 'unauthenticated' : 'unavailable', user: null }
			}

		}

		/** Signed in user, or `null` when there is no token or it is no longer accepted. */
		static user(): $realworld_api_user | null {
			return this.session().user
		}

		static auth(): $realworld_api_auth {
			return this.session().auth
		}

		/**
		 * Drops a token the server has rejected. Lives in a cell of its own because
		 * `session()` may only read: something has to observe this one for the token to
		 * actually go, and that is the app root.
		 */
		@ $mol_mem
		static token_check() {
			if( !this.token() ) return null
			if( this.session().auth !== 'unauthenticated' ) return null
			return new $mol_after_tick( () => $mol_wire_async( this ).logout() )
		}

		// --- authentication ---

		@ $mol_action
		static login( email: string, password: string ) {
			const data = this.send( 'POST', '/users/login', { user: { email, password } } ) as { user: $realworld_api_user }
			this.token( data.user.token )
			this.user_known( data.user )
			this.signed_out( '' )
			return data.user
		}

		@ $mol_action
		static register( username: string, email: string, password: string ) {
			const data = this.send( 'POST', '/users', { user: { username, email, password } } ) as { user: $realworld_api_user }
			this.token( data.user.token )
			this.user_known( data.user )
			this.signed_out( '' )
			return data.user
		}

		@ $mol_action
		static logout() {
			this.token( null )
			this.user_known( null )
			this.refresh()
		}

		@ $mol_action
		static user_update( patch: $realworld_api_patch ) {
			const data = this.send( 'PUT', '/user', { user: patch } ) as { user: $realworld_api_user }
			this.token( data.user.token )
			this.user_known( data.user )
			this.signed_out( '' )
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
