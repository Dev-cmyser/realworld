namespace $.$$ {

	/** Text field the e2e contract finds by its `name`, dressed by the shared stylesheet. */
	export class $realworld_app_input extends $.$realworld_app_input {

		override attr_static() {
			const attrs = super.attr_static()
			delete attrs.mol_view
			delete attrs.mol_string
			return attrs
		}

	}

}
