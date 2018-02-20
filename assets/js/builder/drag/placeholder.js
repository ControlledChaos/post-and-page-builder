export class Placeholder {

	/**
	 * Setup needed values.
	 *
	 * @since 1.7.0
	 *
	 * @param  {$} $draggedElement Element being dragged.
	 */
	constructor( $draggedElement ) {
		this.iframes = [];
		this.$draggedElement = $draggedElement;
	}

	/**
	 * Replaces all iframes with placeholders while dragging.
	 *
	 * @since 1.7.0
	 */
	setContent() {
		this.$draggedElement.find( 'iframe' ).each( ( index, el ) => {
			let $iframe = $( el ),
				$placeHolder = this.createPlaceholder( $iframe );

			this.iframes.push( {
				$element: $iframe,
				$placholder: $placeHolder
			} );

			$iframe.replaceWith( $placeHolder );
		} );
	}

	/**
	 * Replace the placeholder items with the iframes again.
	 *
	 * @since 1.7.0
	 */
	revertContent() {
		for ( let iframe of this.iframes ) {
			iframe.$placholder.replaceWith( iframe.$element );
		}
	}

	/**
	 * Create a placeholder for iframes while dragging.
	 *
	 * @since 1.7.0
	 *
	 * @param  {$} $iframe An Iframe element.
	 * @return {$}         Placeholder element.
	 */
	createPlaceholder( $iframe ) {
		let $placeHolder = $( '<div class="media-placeholder">' ),
			height = $iframe.height() || $iframe[0].height,
			width = $iframe.width() || $iframe[0].width;

		$placeHolder.css( {
			height: height,
			width: '100%',
			'background-color': '#ccc'
		} );

		return $placeHolder;
	}
}
