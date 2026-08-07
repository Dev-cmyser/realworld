namespace $ {

	/** Renders an API timestamp the way Conduit shows article and comment dates. */
	export function $realworld_app_date( iso: string ) {
		return new Date( iso ).toLocaleDateString( 'en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		} )
	}

}
