namespace $ {

	/**
	 * Routing over `location.pathname`, in the shape the RealWorld spec asks for:
	 * `/login`, `/tag/js?page=2`, `/profile/jane/favorites`. Drop-in replacement for
	 * `$mol_state_arg` once `activate()` has installed it, so every `$mol_link`
	 * builds spec addresses without knowing anything about routing.
	 *
	 * Server contract: any unknown path under the mount must serve the app's
	 * `index.html`. Without that fallback a deep link 404s on first hit. GitHub
	 * Pages has no such rule, so `404.html` redirects through `?/` and the
	 * original path is restored here on load.
	 */
	export class $realworld_app_route extends $mol_state_arg {

		/** Where the app is mounted. Starts and ends with a slash. */
		static mount = '/'

		/** Subclass anchored at another mount. One bundle can host several. */
		static at( mount: string ): typeof $realworld_app_route {
			if( !mount.startsWith( '/' ) ) mount = '/' + mount
			if( !mount.endsWith( '/' ) ) mount = mount + '/'
			const base = this
			return class extends base {
				static override mount = mount
			}
		}

		@ $mol_mem
		static override href( next?: string ): string {

			if( next === undefined ) return $mol_dom.location.href

			const target = new URL( next, $mol_dom.location.href ).toString()

			new $mol_after_frame( () => {
				if( this.href() !== target ) return
				if( $mol_dom.location.href === target ) return
				const history = $mol_dom.history
				history.replaceState( history.state, $mol_dom.document.title, target )
			} )

			return target
		}

		@ $mol_mem
		static override dict( next?: { [ key: string ]: string | null } ) {

			const url = new URL( this.href( next && this.make_link( next ) ), $mol_dom.location.href )
			const path = url.pathname.startsWith( this.mount ) ? url.pathname.slice( this.mount.length ) : ''

			return $realworld_app_route_parse( { path, search: url.search } ) as Readonly< Record< string, string > >
		}

		/**
		 * Root relative, not absolute: the spec pins link targets down to the exact
		 * attribute value, `href="/login"` rather than `href="http://host/login"`.
		 */
		@ $mol_mem_key
		static override make_link( next: { [ key: string ]: string | null } ) {
			const { path, search } = $realworld_app_route_make( next )
			return this.mount + path + search
		}

		@ $mol_action
		static override go( next: Record< string, string | null > ) {
			const link = this.link( next )
			$mol_dom.history.pushState( null, '', link )
			this.href( link )
		}

		/**
		 * Take over navigation for this bundle: become `$mol_state_arg`, follow the
		 * back button, and turn clicks on in-app links into history entries.
		 *
		 * Without an argument the mount is read off the `web.js` script tag, which
		 * covers both a site root and a project page like `/mol-realworld/`.
		 *
		 * Stays out of the way on the MAM dev server: its artifacts live under
		 * `/-/` and are served by a plain file server, so path routing there would
		 * 404 on the first jump. Hash routing keeps working in that case.
		 */
		static activate( mount?: string ): typeof $realworld_app_route {

			if( typeof window === 'undefined' ) return this
			if( /\/-\/|\.html$/.test( $mol_dom.location.pathname ) ) return this

			if( mount ) return this.at( mount ).activate()

			if( this.mount === '/' ) {
				const script = $mol_dom.document.querySelector( 'script[src$="web.js"]' ) as HTMLScriptElement | null
				const detected = script?.src
					? new URL( script.src ).pathname.replace( /web\.js$/, '' )
					: $mol_dom.location.pathname.replace( /[^/]*$/, '' )
				if( detected !== '/' ) return this.at( detected ).activate()
			}

			if( !$mol_dom.location.pathname.startsWith( this.mount ) ) return this
			if( this.$.$mol_state_arg === this ) return this

			;( this.$ as { $mol_state_arg: typeof $mol_state_arg } ).$mol_state_arg = this

			const doc = $mol_dom.document
			const base = doc.querySelector( 'base' ) ?? doc.head.insertBefore( doc.createElement( 'base' ), doc.head.firstChild )
			base.setAttribute( 'href', this.mount )

			this.restore()

			self.addEventListener( 'popstate', () => this.href( $mol_dom.location.href ) )
			self.addEventListener( 'click', event => this.click( event ), true )

			return this
		}

		/**
		 * Undo the GitHub Pages `404.html` bounce: it turns `/mount/article/x` into
		 * `/mount/?/article/x`, which is the only way that host can hand a deep link
		 * to a single page app.
		 */
		@ $mol_action
		static restore() {

			const search = $mol_dom.location.search
			if( search.length < 2 || search[1] !== '/' ) return

			const [ path, ... rest ] = search.slice( 2 ).replace( /~and~/g, '&' ).split( '?' )
			const link = this.mount + path + ( rest.length ? '?' + rest.join( '?' ) : '' )

			$mol_dom.history.replaceState( null, '', link )
			this.href( link )
		}

		/** Follows an in-app link without letting the browser reload the bundle. */
		static click( event: MouseEvent ) {

			if( event.defaultPrevented ) return
			if( event.button !== 0 ) return
			if( event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) return

			const link = ( event.target as Element | null )?.closest?.( 'a' ) as HTMLAnchorElement | null
			if( !link ) return

			if( link.hasAttribute( 'download' ) ) return
			if( link.target && link.target !== '_self' ) return
			if( link.origin !== $mol_dom.location.origin ) return
			if( !link.pathname.startsWith( this.mount ) ) return

			event.preventDefault()

			const target = link.pathname + link.search
			if( target === $mol_dom.location.pathname + $mol_dom.location.search ) return

			$mol_dom.history.pushState( null, '', target )
			this.href( target )
		}

	}

}
