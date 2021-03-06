window.BOLDGRID = window.BOLDGRID || {};
BOLDGRID.EDITOR = BOLDGRID.EDITOR || {};
BOLDGRID.EDITOR.CONTROLS = BOLDGRID.EDITOR.CONTROLS || {};
BOLDGRID.EDITOR.CONTROLS.GENERIC = BOLDGRID.EDITOR.CONTROLS.GENERIC || {};

( function( $ ) {
	'use strict';

	var self,
		BG = BOLDGRID.EDITOR;

	BOLDGRID.EDITOR.CONTROLS.GENERIC.Blockalignment = {
		template: wp.template( 'boldgrid-editor-horizontal-block-alignment' ),

		render: function() {
			let $control = $( this.template() );

			BG.Panel.$element
				.find( '.panel-body .customize' )
				.find( '.section.horizontal-block-alignment' )
				.remove();
			BG.Panel.$element.find( '.panel-body .customize' ).append( $control );

			return $control;
		},

		bind: function() {
			var $el = BG.Menu.getCurrentTarget(),
				currentAlignment = $el.is( 'hr' ) ? 'center' : 'left',
				$inputs = BG.Panel.$element.find( '.section.horizontal-block-alignment input' ),
				marginLeft = parseInt( $el.css( 'margin-left' ) ),
				marginRight = parseInt( $el.css( 'margin-right' ) );

			if ( 0 === marginLeft && 0 !== marginRight ) {
				currentAlignment = 'left';
			} else if ( 0 === marginRight && 0 !== marginLeft ) {
				currentAlignment = 'right';
			}

			$inputs.filter( '[value="' + currentAlignment + '"]' ).prop( 'checked', true );

			BG.Panel.$element
				.find( '.section [name="horizontal-block-alignment"]' )
				.on( 'change', function() {
					var $this = $( this ),
						value = $this.val();

					self._applyMargin( $el, value );
					BG.Panel.$element.trigger( BG.Panel.currentControl.name + '-css-change' );
				} );
		},

		_applyMargin: function( $el, value ) {
			$el.removeAttr( 'align' );

			if ( 'center' === value ) {
				$el.css( 'margin-left', 'auto' );
				$el.css( 'margin-right', 'auto' );
			} else if ( 'left' === value ) {
				$el.css( 'margin-right', 'auto' );
				$el.css( 'margin-left', '0' );
			} else {
				$el.css( 'margin-right', '0' );
				$el.css( 'margin-left', 'auto' );
			}
		}
	};

	self = BOLDGRID.EDITOR.CONTROLS.GENERIC.Blockalignment;
} )( jQuery );
