var BGGB = BOLDGRID.EDITOR.GRIDBLOCK;

export class Industry {

	/**
	 * Bind Events and find element.
	 *
	 * @since 1.7.0
	 */
	init() {
		this.$select = BGGB.View.$gridblockNav.find( '.boldgrid-gridblock-industry select' );

		this._setDefault();
		this.setFilterVal();
		this._onSelectChange();
	}

	/**
	 * Update the UI's filter attribute.
	 *
	 * @since 1.7.0
	 */
	setFilterVal() {
		BGGB.View.$gridblockSection.find( '.gridblocks' ).attr( 'industry', this.$select.val() );
	}

	/**
	 * Setup the action of changing the category filter.
	 *
	 * @since 1.7.0
	 */
	_onSelectChange() {
		this.$select.on( 'change', () => {
			this.setFilterVal();
			BGGB.Category.updateDisplay();
		} );
	}

	/**
	 * Get the users installed category.
	 *
	 * @since 1.7.0
	 *
	 * @return {string} inspiration catgegory.
	 */
	_setDefault() {
		const inspirationCategory = this._getInspirationsCategory(),
			defaultCategory = BoldgridEditor.block_default_industry || inspirationCategory;

		if ( this.$select.find( '[value="' + defaultCategory + '"]' ).length ) {

			// If the select value exists use it.
			this.$select.val( defaultCategory );
		} else {

			// Otherwise preset the first item from the select box.
			this.$select.find( 'option:first-of-type' ).prop( 'checked', true );
		}
	}

	/**
	 * Get the saved inspirations category.
	 *
	 * @since 1.7.0
	 *
	 * @return {string} Inspirations Category.
	 */
	_getInspirationsCategory() {
		let category;

		if ( BoldgridEditor.inspiration && BoldgridEditor.inspiration.subcategory_key ) {
			category = BoldgridEditor.inspiration.subcategory_key;
		}

		return category;
	}
}
