var BG = BOLDGRID.EDITOR;

import enterKeyHtml from './enter-key.html';

export class ConnectKey {

	/**
	 * Set default configuration values.
	 *
	 * @since 1.7.0
	 */
	constructor() {
		this.licenseTypes = [];
		this.activeConfig = {};

		this.newKeyLink =
			BoldgridEditor.plugin_configs.urls.premium_key + '?source=plugin-add-gridblock';

		this.config = {
			free: {
				text: 'Add BoldGrid Connect'
			},
			basic: {
				text: 'Upgrade To Premium'
			},
			premium: {
				text: 'Premium Active'
			}
		};

		this.controlConfig = {
			panel: {
				title: 'BoldGrid Connect',
				height: '310px',
				width: '600px',
				icon: 'dashicons dashicons-admin-network',
				autoCenter: true,
				showOverlay: true
			}
		};

		this.apiKey = BoldgridEditor.boldgrid_settings.api_key;
	}

	/**
	 * After license types are returned.
	 *
	 * WARNING this action occurs after every fetch gridblocks call.
	 *
	 * @since 1.7.0
	 *
	 * @param {array} licenseTypes List of licenses user has.
	 */
	postLicenseCheck( licenseTypes ) {
		this.licenseTypes = licenseTypes instanceof Array ? licenseTypes : [];

		this._setHasPremium();
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
	 * Remove invalid characters from the connect key.
	 *
	 * @since 1.7.0
	 *
	 * @param  {string} key Connect Key.
	 * @return {string}     Connect Key Sanitized.
	 */
	sanitizeKey( key ) {
		return key
			.replace( /[^a-z0-9]/gi, '' )
			.replace( /(.{8})/g, '$1-' )
			.slice( 0, -1 );
	}

	/**
	 * Validate a connect key.
	 *
	 * @since 1.7.0
	 *
	 * @param  {string} key A connect key.
	 *
	 * @return {boolean}    Was this successful?
	 */
	validateKey( key ) {
		const keyLength = 35;

		return keyLength !== this.sanitizeKey( key ).length;
	}

	/**
	 * Show the notice as a modal.
	 *
	 * @since 1.7.0
	 */
	showNotice() {
		const $content = $(
			_.template( enterKeyHtml )( {
				newKeyLink: this.newKeyLink,
				journey: this.licenseTypes.length ? 'existing-key' : '',
				license: this.getLicenseType( this.licenseTypes )
			} )
		);

		// Remove all content from the panel.
		BG.Panel.clear();

		// Set markup for panel.
		BG.Panel.$element.find( '.panel-body' ).html( $content );

		this._bindHandlers( $content );

		// Open Panel.
		BG.Panel.open( this.controlConfig );

		BG.Panel.centerPanel();
	}

	/**
	 * Get the license type name.
	 *
	 * @since 1.7.0
	 *
	 * @param  {array} licenseTypes License types for user.
	 * @return {string}             License type.
	 */
	getLicenseType( licenseTypes ) {
		let type = 'free';

		if ( -1 !== licenseTypes.indexOf( 'premium' ) ) {
			type = 'premium';
		} else if ( -1 !== licenseTypes.indexOf( 'basic' ) ) {
			type = 'basic';
		}

		return type;
	}

	/**
	 * Set has premium as an attribute.
	 *
	 * @since 1.7.0
	 */
	_setHasPremium() {
		BG.GRIDBLOCK.View.$gridblocks.attr(
			'data-requires-premium',
			-1 === this.licenseTypes.indexOf( 'premium' ) ? 1 : 0
		);
	}

	/**
	 * Find the commonly used form handlers.
	 *
	 * @since 1.7.0
	 *
	 * @param  {$} $content Form Handlers.
	 */
	_findFormElements( $content ) {
		this.$content = $content;
		this.$form = $content.find( 'form' );
		this.$tos = this.$form.find( '[name="tos"]' );
		this.$keyEntry = this.$form.find( '[name="boldgrid-connect-key"]' );
		this.$formError = this.$form.find( '.error' );
		this.$formSuccess = $content.find( '.success' );
		this.$formPrompt = $content.find( '.key-entry' );
		this.$changeConnectKey = $content.find( '.change-connect-key' );
	}

	/**
	 * Bind the form handler.
	 *
	 * @since 1.7.0
	 *
	 * @param  {$} $content Content Element.
	 */
	_bindHandlers( $content ) {
		this._findFormElements( $content );

		this._bindFormSubmission();
		this._bindPanelClose();

		// Bind change key.
		this.$changeConnectKey.on( 'click', e => {
			e.preventDefault();
			this.$content.removeAttr( 'data-journey' );
		} );
	}

	/**
	 * Bind the panel closure.
	 *
	 * @since 1.7.0
	 */
	_bindPanelClose() {
		this.$formSuccess.find( 'button' ).on( 'click', () => BG.Panel.closePanel() );
	}

	/**
	 * On form submission, run this process.
	 *
	 * @since 1.7.0
	 */
	_bindFormSubmission() {
		this.$form.on( 'submit', e => {
			e.preventDefault();

			this.$formError.hide().removeClass( 'animated' );
			if ( this._validate() ) {
				BG.Panel.showLoading();

				this._saveKey()
					.done( result => {
						this.licenseTypes = result.data.licenses;
						this.$formSuccess.attr( 'data-key-type', this.getLicenseType( this.licenseTypes ) );
						this.apiKey = result.data.key;
						this.$formPrompt.hide();
						this.$formSuccess.addClass( 'animated zoomIn' ).show();
						this.postLicenseCheck( this.licenseTypes );
					} )
					.fail( () => {
						this._displayError( `
							We were unable to confirm your Connect Key, please check your entry and try again.
						` );
					} )
					.always( () => {
						BG.Panel.hideLoading();
					} );
			}
		} );
	}

	/**
	 * Save a Connect Key.
	 *
	 * @since 1.7.0
	 */
	_saveKey() {
		return $.ajax( {
			type: 'post',
			url: ajaxurl,
			dataType: 'json',
			timeout: 10000,
			data: {
				action: 'boldgrid_editor_save_key',

				// eslint-disable-next-line
				boldgrid_editor_gridblock_save: BoldgridEditor.nonce_gridblock_save,

				// eslint-disable-next-line
				connectKey: this.$keyEntry.val().trim()
			}
		} );
	}

	/**
	 * Bind the click of the add connect action.
	 *
	 * @since 1.7.0
	 */
	_bindClick() {
		this.$actionButton.on( 'click', e => {
			e.preventDefault();

			this.showNotice();
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
		const config = this.config[this.getLicenseType( this.licenseTypes )];

		this.activeConfig = config;
	}

	/**
	 * Display an error on the screen.
	 *
	 * @since 1.7.0
	 *
	 * @param  {string} error Show the error.
	 */
	_displayError( error ) {
		this.$formError
			.html( error )
			.show()
			.addClass( 'animated bounceIn' );
	}

	/**
	 * Validate.
	 *
	 * @since 1.7.0
	 *
	 * @return {boolean} Was this operation a success.
	 */
	_validate() {
		let error = '';

		if ( ! this.$tos.val() || ! this.$keyEntry.val() ) {
			error = 'Please complete all field to continue';
		} else if ( this.validateKey( this.$keyEntry.val() ) ) {
			error = 'Please enter a BoldGrid Connect Key in the correct format';
		}

		if ( error ) {
			this._displayError( error );
		}

		return ! error;
	}
}
