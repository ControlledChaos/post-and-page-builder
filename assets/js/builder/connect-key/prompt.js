var BG = BOLDGRID.EDITOR;

import enterKeyHtml from './enter-key.html';

export class ConnectKey {
	constructor() {
		this.licenseTypes = [];
		this.activeConfig = {};

		this.config = {
			free: {
				text: 'Add BoldGrid Connect',
				action: () => this.showNotice(),
				html: enterKeyHtml
			},
			basic: {
				text: 'Upgrade To Premium',
				action: () => {
					window.open(
						BoldgridEditor.plugin_configs.urls.premium_key + '?source=plugin-add-gridblock',
						'_blank'
					);
				}
			},
			premium: {
				text: 'Premium Active',
				action: () => this.showNotice(),
				html: enterKeyHtml
			}
		};

		this.controlConfig = {
			panel: {
				title: 'BoldGrid Connect',
				height: '295px',
				width: '600px',
				icon: 'dashicons dashicons-admin-network',
				autoCenter: true,
				showOverlay: true
			}
		};

		this.apiKey = BoldgridEditor.boldgrid_settings.api_key;
	}

	/**
	 * After license types are returned
	 *
	 * @since 1.7.0
	 *
	 * @param {array} licenseTypes List of licenses user has.
	 */
	postLicenseCheck( licenseTypes ) {
		this.licenseTypes = licenseTypes instanceof Array ? licenseTypes : [];

		this._displayBlocksButton();
	}

	/**
	 * Initialize the class.
	 *
	 * This is currently desined to only load after the add blocks sections load.
	 *
	 * @since 1.7.0
	 */
	init() {
		this.$actionButton = BG.GRIDBLOCK.View.$gridblockNav.find( '.connect-key-action' );
		this.$actionText = this.$actionButton.find( '.action-text' );

		this._bindClick();
	}

	/**
	 * Show the notice as a modal.
	 *
	 * @since 1.7.0
	 */
	showNotice() {

		// Remove all content from the panel.
		BG.Panel.clear();

		// Set markup for panel.
		BG.Panel.$element.find( '.panel-body' ).html( this.activeConfig.html );

		// Open Panel.
		BG.Panel.open( this.controlConfig );

		BG.Panel.centerPanel();
	}

	_bindClick() {
		this.$actionButton.on( 'click', e => {
			e.preventDefault();

			this.activeConfig.action();
		} );
	}

	/**
	 * Display the blocks button.
	 *
	 * @since 1.7.0
	 */
	_displayBlocksButton() {
		this._setActiveConfig();

		this.$actionText.html( this.activeConfig.text );
		this.$actionButton.addClass( 'animated slideInLeft' );
		this.$actionButton.css( 'visibility', 'visible' );
	}

	/**
	 * Set the active configuration.
	 *
	 * @since 1.7.0
	 */
	_setActiveConfig() {
		let config = this.config.free;

		if ( -1 !== this.licenseTypes.indexOf( 'basic' ) ) {
			config = this.config.basic;
		} else if ( -1 !== this.licenseTypes.indexOf( 'premium' ) ) {
			config = this.config.premium;
		}

		this.activeConfig = config;
	}

	validate() {}
}
