namespace $ {

	/**
	 * Every route argument, cleared. Spread it into a jump so the destination never
	 * inherits arguments left over from the page you came from.
	 */
	export function $realworld_app_route(): Record< string, string | null > {
		return { page: null, slug: null, user: null, tab: null, tag: null, num: null }
	}

}
