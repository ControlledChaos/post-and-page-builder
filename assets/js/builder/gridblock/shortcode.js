var $ = jQuery;

export class Shortcode {

	/**
	 * Given a chunk of html, convert all shortcodes into html.
	 *
	 * @since 1.7
	 *
	 * @param  {string} html HTML to process.
	 * @return {object}      Content, spit into DOM parts.
	 */
	convert( html ) {
		const markedHtml = wp.mce.views.setMarkers( html, BOLDGRID.EDITOR.mce ),
			$html = $( markedHtml );

		$html.find( '[data-wpview-marker]' ).each( ( index, el ) => {
			const $el = $( el ),
				instanceEncodedId = $el.attr( 'data-wpview-marker' ),
				instance = wp.mce.views.getInstance( decodeURIComponent( instanceEncodedId ) );

			if ( instance && instance.content && instance.shortcode && instance.shortcode.tag ) {
				let $viewTranslated = $( this.getInstanceHTML( instance ) );
				$el.replaceWith( $viewTranslated );
			}
		} );

		return {
			head: '',
			body: $html[0].outerHTML
		};
	}

	/**
	 * This a hack fix to allow the shorcodes instances to initiallize.
	 *
	 * @since 1.7
	 */
	prefetch() {
		wp.mce.views.setMarkers(
			'[embed width="560" height="315"]https://www.youtube.com/embed/1w1fJkUkv6M[/embed]',
			BOLDGRID.EDITOR.mce
		);
		wp.mce.views.setMarkers(
			'[embed]http://s.w.org/images/core/3.9/Louisiana_Five-Dixie_Blues-1919.mp3[/embed]',
			BOLDGRID.EDITOR.mce
		);
	}

	/**
	 * Get the HTMl for a mce view instance.
	 *
	 * @since 1.7
	 *
	 * @param  {object} instance MCE view instance.
	 * @return {string}          Html for a view instance.
	 */
	getInstanceHTML( instance ) {
		return `<div class="wpview wpview-wrap" data-wpview-text="${instance.encodedText}"
			data-wpview-type="${instance.shortcode.tag}" contenteditable="false">${
			instance.content.body
		}</div>`;
	}
}

export { Shortcode as default };
