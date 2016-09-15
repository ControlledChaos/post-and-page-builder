var BOLDGRID = BOLDGRID || {};
BOLDGRID.EDITOR = BOLDGRID.EDITOR || {};

( function ( $ ) {
	
	var BG = BOLDGRID.EDITOR; 

	BOLDGRID.EDITOR.Controls = {
		$panel : null,
		$menu : null,
		$colorControl : null,
		controls : [],
		$container : null,
		init: function ( $container ) {
			this.$container = $container;

			this.$container.find( 'body' ).css( 'marginTop', '50px' );

			// Init Menu.
			this.$menu = BOLDGRID.EDITOR.Menu.init();

			// Init Panel.
			this.$panel = BOLDGRID.EDITOR.Panel.init();

			// Init Color Control.
			this.colorControl = BOLDGRID.EDITOR.CONTROLS.Color.init();

			this.bindEvents();

			this.setupSliders();

			//Create all controls.
			this.setupControls();
			
			BG.CONTROLS.Generic.setupInputCustomization();
			BG.CONTROLS.Generic.setupInputInitialization();
			
		},
		
		hasThemeFeature : function ( feature ) {
			return -1 !== BoldgridEditor.builder_config.theme_features.indexOf( feature );
		},
		
		addStyle : function ( element, property, value ) {
			element.css( property, value );
			tinymce.activeEditor.dom.setStyle( element, property, value );
		},

		setupSliders : function () {
			this.$panel.on( "slide", '.section .slider', function( event, ui ) {
				var $this = $( this );
				$this.siblings( '.value' ).html( ui.value );
			} );
		},

		/**
		 * Add a control to the list of controls to be created.
		 */
		registerControl : function ( control ) {
			this.controls.push( control );
		},
		
		editorMceInstance : function () {
			var instance = false;
			
			if ( IMHWPB.WP_MCE_Draggable && IMHWPB.WP_MCE_Draggable.instance ) {
				instance = IMHWPB.WP_MCE_Draggable.instance;
			}
			
			return instance;
		},

		bindEvents : function () {
			this.onEditibleClick();
		},
		
		clearMenuItems : function () {
			this.$menu.items = [];

		},

		onEditibleClick : function () {
			var self = this;

			this.$container.on( 'mouseup', function ( e ) {
				self.clearMenuItems();
			} );
			
			this.$container.on( 'click', function ( e ) {

				self.$menu.find( 'li[data-action]' ).hide();

				if ( ! self.$menu.items.length ) {
					self.$menu.hide();
					BOLDGRID.EDITOR.Panel.closePanel();
				} else {
					self.$menu.show();
				}

				$.each( self.$menu.items, function () {
					self.$menu.find( '[data-action="menu-' + this + '"]' ).show();

					//If a panel is open.
					BOLDGRID.EDITOR.Menu.reactivateMenu();
				} );

				self._closeOpenControl();
				BOLDGRID.EDITOR.CONTROLS.Color.closePicker();
			} );
		},
		
		/**
		 * If a control is open and the coresponding menu item is not present
		 */
		_closeOpenControl : function () {
			if ( BG.Panel.currentControl && -1 === this.$menu.items.indexOf( BG.Panel.currentControl.name ) ) {
				BG.Panel.closePanel();
			}
		},

		/**
		 * Setup Controls.
		 */
		setupControls : function () {
			var self = this;

			// Sort Controls by priority.
			var compare = function ( a, b ) {

				if ( a.priority < b.priority ) {
					return -1;
				}

				if ( a.priority > b.priority ) {
					return 1;
				}

				return 0;
			};

			this.controls.sort( compare );

			// Bind each menu control.
			$.each( this.controls, function () {
				self.setupControl( this );
			} );
			
			BOLDGRID.EDITOR.CONTROLS.Section.init( self.$container );
		},

		setupControl : function ( control ) {
			this.bindControlHandler( control );
			BOLDGRID.EDITOR.Menu.createListItem( control );

			if ( control.setup ) {
				control.setup();
			}
		},

		bindControlHandler : function ( control ) {
			var self = this;

			// When the user clicks on an element that has an associated control.
			// Add that control to the list of controls to be made visible.
			this.$container.on( 'click', control.selectors.join(), function ( e ) {
				var $this = $( this );
				
				//@TODO: Move this.
				if ( 'box' == control.name ) {
					if ( e.boxFound ) {
						return;
					}

					if ( $this.closest('.editing-as-row').length ) {
						e.boxFound = true;
					}

					if ( ! e.boxFound && $this.parent().closest('[class*="col-md"]').length ) {
						var $module = BOLDGRID.EDITOR.CONTROLS.Box.findModule( $this );
						var backgroundColor = $module.css('background-color');
						if ( ! BOLDGRID.EDITOR.CONTROLS.Color.isColorTransparent( backgroundColor ) ) {
							e.boxFound = true;
						} else {
							return;
						}
					}

				}
				
				if ( $this.closest('.wpview').length ) {
					return;
				}
				
				// If the user clicks one of the controls exceptions, skip.
				if ( control.exceptionSelector && $( e.toElement ).is( control.exceptionSelector ) ) {
					return;
				}

				self.$menu.targetData = self.$menu.targetData || {};
				self.$menu.targetData[ control.name ] = $this;

				if ( control.elementClick ) {
					control.elementClick();
				}

				self.$menu.items.push( control.name );
			} );

			// When the user clicks on a menu item, perform the corresponding action.
			this.$menu.on( 'click', '[data-action="menu-' + control.name + '"]', control.onMenuClick );
		}

	};

} )( jQuery );