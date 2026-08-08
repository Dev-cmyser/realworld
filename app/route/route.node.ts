namespace $ {

	/** There is no address bar outside the browser. The real router lives in `route.web.ts`. */
	export class $realworld_app_route extends $mol_state_arg {

		static mount = '/'

		static at( mount: string ): typeof $realworld_app_route {
			return this
		}

		static activate( mount?: string ): typeof $realworld_app_route {
			return this
		}

	}

}
