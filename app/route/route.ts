namespace $ {

	/**
	 * Address of a page, split the way the browser keeps it.
	 * `path` is relative to wherever the app is mounted and never starts with a slash.
	 */
	export type $realworld_app_route_address = {
		path: string
		search: string
	}

	/**
	 * Every route argument, cleared. Spread it into a jump so the destination never
	 * inherits arguments left over from the page you came from.
	 */
	export function $realworld_app_route_clean(): Record< string, string | null > {
		return { page: null, slug: null, user: null, tab: null, tag: null, num: null }
	}

	/**
	 * Reads an address from the RealWorld routing spec into the argument dictionary
	 * the views work with.
	 *
	 * `/`, `/?feed=following`, `/?page=2`, `/tag/js`, `/login`, `/register`,
	 * `/settings`, `/editor`, `/editor/some-slug`, `/article/some-slug`,
	 * `/profile/jane`, `/profile/jane/favorites`
	 */
	export function $realworld_app_route_parse( address: $realworld_app_route_address ): Record< string, string > {

		const steps = address.path.split( '/' ).filter( Boolean ).map( decodeURIComponent )
		const query = new URLSearchParams( address.search )

		const dict = {} as Record< string, string >

		switch( steps[0] ) {

			case 'login':
			case 'register':
			case 'settings':
				dict.page = steps[0]
				break

			case 'editor':
				dict.page = 'editor'
				if( steps[1] ) dict.slug = steps.slice( 1 ).join( '/' )
				break

			case 'article':
				dict.page = 'article'
				dict.slug = steps.slice( 1 ).join( '/' )
				break

			case 'profile':
				dict.page = 'profile'
				dict.user = steps[1] ?? ''
				if( steps[2] === 'favorites' ) dict.tab = 'favorites'
				break

			case 'tag':
				if( steps[1] ) dict.tag = steps.slice( 1 ).join( '/' )
				break

			// The home feed, and anything the spec does not name.
			default:
				break

		}

		// Only the home feed has a Your Feed tab, so the flag means nothing elsewhere.
		if( !dict.page && query.get( 'feed' ) === 'following' ) dict.tab = 'following'

		const num = query.get( 'page' )
		if( num && Number( num ) > 1 ) dict.num = num

		return dict
	}

	/** Writes the argument dictionary back into an address. The inverse of the parser. */
	export function $realworld_app_route_make( dict: Record< string, string | null | undefined > ): $realworld_app_route_address {

		const step = ( value: string | null | undefined ) => encodeURIComponent( value ?? '' )

		let path = ''

		switch( dict.page ) {

			case 'login':
			case 'register':
			case 'settings':
				path = dict.page
				break

			case 'editor':
				path = dict.slug ? `editor/${ step( dict.slug ) }` : 'editor'
				break

			case 'article':
				path = `article/${ step( dict.slug ) }`
				break

			case 'profile':
				path = `profile/${ step( dict.user ) }`
				if( dict.tab === 'favorites' ) path += '/favorites'
				break

			default:
				if( dict.tag ) path = `tag/${ step( dict.tag ) }`
				break

		}

		const query = new URLSearchParams()
		if( !dict.page && dict.tab === 'following' ) query.set( 'feed', 'following' )
		if( dict.num && Number( dict.num ) > 1 ) query.set( 'page', dict.num )

		const search = query.toString()

		return { path, search: search ? '?' + search : '' }
	}

}
