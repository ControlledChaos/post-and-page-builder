import template from './template.html';
import ComponentConfig from '@boldgrid/components/src/components/config';

export class Control {
	constructor() {
		this.template = _.template( template );
		this.config = ComponentConfig.divider.default;
	}

	render() {
		let html;

		html = this.template( {
			config: this.config
		} );

		this.$control = $( html );
		this.$designSelect = this.$control.find( '.design select' );

		this._setup();

		return this.$control;
	}

	_setup() {
		this._setupDesignChange();
	}

	_setupDesignChange() {
		this.$designSelect.on( 'change', () => {
			console.log(
				this.$designSelect.val(),
				ComponentConfig.getComponent( 'divider', this.$designSelect.val() )
			);
		} );
	}
}
