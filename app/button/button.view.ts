namespace $.$$ {

	/** Conduit button. Behaviour from $mol, looks from the shared stylesheet. */
	export class $realworld_app_button extends $.$realworld_app_button {

		override attr_static() {
			const attrs = super.attr_static()
			delete attrs.mol_view
			delete attrs.mol_button
			return attrs
		}

	}

}
