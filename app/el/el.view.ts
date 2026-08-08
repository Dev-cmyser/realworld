namespace $.$$ {

	/**
	 * $mol marks every node it renders with a `mol_view` attribute and styles all of
	 * them through it — flex layout, scrollbars, transitions. Conduit ships its own
	 * stylesheet written against plain HTML, so these elements drop that marker and
	 * arrive unstyled, leaving `class` as the only thing that decides how they look.
	 *
	 * Names of the component itself stay on the element, so `$mol_style_define` and
	 * the browser inspector still work as usual.
	 */
	export class $realworld_app_el extends $.$realworld_app_el {

		override attr_static() {
			const attrs = super.attr_static()
			delete attrs.mol_view
			return attrs
		}

	}

}
