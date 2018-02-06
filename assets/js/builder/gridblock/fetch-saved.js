window.BOLDGRID = window.BOLDGRID || {};
BOLDGRID.EDITOR = BOLDGRID.EDITOR || {};
BOLDGRID.EDITOR.GRIDBLOCK = BOLDGRID.EDITOR.GRIDBLOCK || {};

const BGGB = BOLDGRID.EDITOR.GRIDBLOCK;

export class FetchSaved {
	constructor() {
		this.status = '';
	}

	fetch() {
		if ( this.status ) {
			return false;
		}

		this.status = 'fetching';
		BGGB.Generate.gridblockLoadingUI.start();

		return this._call()
			.done( gridblocks => {
				this.status = 'done';
				BGGB.Filter.savedBlocksConfigs( gridblocks );
				BGGB.View.createGridblocks();
			} )
			.always( () => {
				this.status = 'fetching';
				BGGB.Generate.gridblockLoadingUI.finish();
				this.setGridblockCount();
			} )
			.fail( () => {
				this.status = 'failed';
				BGGB.View.$gridblockSection.append( wp.template( 'boldgrid-editor-gridblock-error' )() );
			} );
	}

	/**
	 * Set Gridblock count.
	 *
	 * @since 1.5
	 */
	setGridblockCount() {
		let types = _.countBy( BGGB.configs.gridblocks || [], 'type' );

		BGGB.View.$gridblockSection
			.find( '.gridblocks' )
			.attr( 'my-gridblocks-count', ( types.saved || 0 ).toString() )
			.attr( 'library-gridblocks-count', ( types.library || 0 ).toString() );
	}

	_call() {
		return $.ajax( {
			type: 'post',
			url: ajaxurl,
			dataType: 'json',
			timeout: 10000,
			data: {
				/*eslint-disable */
				action: 'boldgrid_get_saved_blocks',
				boldgrid_editor_gridblock_save: BoldgridEditor.nonce_gridblock_save
				/*eslint-enable */
			}
		} );
	}
}
