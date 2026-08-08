namespace $ {

	/**
	 * Test hook the shared RealWorld e2e suite reads through `window.__conduit_debug__`.
	 * It lets a test wait for the app to settle on an answer about the current user
	 * instead of racing the network.
	 */
	export class $realworld_app_debug extends $mol_object {

		static token() {
			return $realworld_api.token()
		}

		/** Whoever is signed in, in the shape the API returns them. */
		static user(): $realworld_api_user | null {
			try {
				return $realworld_api.user()
			} catch( error ) {
				$mol_fail_log( error )
				return null
			}
		}

		static state(): $realworld_api_auth {
			try {
				return $realworld_api.auth()
			} catch( error ) {
				// The request is still out; the answer is not known yet, not missing.
				if( $mol_promise_like( error ) ) return 'loading'
				$mol_fail_log( error )
				return 'unavailable'
			}
		}

		static install() {

			const scope = globalThis as typeof globalThis & {
				__conduit_debug__?: {
					getToken(): string | null
					getAuthState(): $realworld_api_auth
					getCurrentUser(): $realworld_api_user | null
				}
			}

			if( typeof scope.document === 'undefined' ) return

			scope.__conduit_debug__ = {
				getToken: () => this.token(),
				getAuthState: () => this.state(),
				getCurrentUser: () => this.user(),
			}
		}

	}

}
