<?php
/**
 * Plugin Name: Post and Page Builder
 * Plugin URI: https://www.boldgrid.com/boldgrid-editor/
 * Description: Customized drag and drop editing for posts and pages. The Post and Page Builder adds functionality to the existing TinyMCE Editor to give you easier control over your content.
 * Version: 1.6
 * Author: BoldGrid.com <support@boldgrid.com>
 * Author URI: https://www.boldgrid.com/
 * Text Domain: boldgrid-editor
 * Domain Path: /languages
 * License: GPLv2 or later
 */

// Prevent direct calls.
if ( ! defined( 'WPINC' ) ) {
	die();
}

// Define Editor version.
if ( ! defined( 'BOLDGRID_EDITOR_VERSION' ) ) {
	define( 'BOLDGRID_EDITOR_VERSION', implode( get_file_data( __FILE__, array( 'Version' ), 'plugin' ) ) );
}

// Define Editor path.
if ( ! defined( 'BOLDGRID_EDITOR_PATH' ) ) {
	define( 'BOLDGRID_EDITOR_PATH', dirname( __FILE__ ) );
}

// Define Editor entry.
if ( ! defined( 'BOLDGRID_EDITOR_ENTRY' ) ) {
	define( 'BOLDGRID_EDITOR_ENTRY', __FILE__ );
}

// Define Editor configuration directory.
if ( ! defined( 'BOLDGRID_EDITOR_CONFIGDIR' ) ) {
	define( 'BOLDGRID_EDITOR_CONFIGDIR', BOLDGRID_EDITOR_PATH . '/includes/config' );
}

/**
* Initialize the editor plugin for Editors and Administrators in the admin section.
*/
if ( ! function_exists( 'boldgrid_editor_setup' ) ) {

	// Load the editor class.
	require_once BOLDGRID_EDITOR_PATH . '/includes/class-boldgrid-editor.php';

	register_activation_hook( __FILE__, array( 'Boldgrid_Editor_Activate', 'on_activate' ) );
	register_activation_hook( __FILE__, 'boldgrid_editor_deactivate' );

	register_deactivation_hook( __FILE__,  array( 'Boldgrid_Editor_Activate', 'on_deactivate' ) );
	register_uninstall_hook( __FILE__, array( 'Boldgrid_Editor_Uninstall', 'on_delete' ) );

	add_action( 'activate_boldgrid-editor/boldgrid-editor.php', 'boldgrid_editor_block_activate' );

	function boldgrid_editor_setup () {
		Boldgrid_Editor_Service::register(
			'main',
			new Boldgrid_Editor()
		);

		Boldgrid_Editor_Service::get( 'main' )->run();
	}

	function boldgrid_editor_block_activate () {
		wp_die(
			'BoldGrid Editor has been renamed to Post and Page Builder. You can delete the '.
			'BoldGrid Editor plugin and continue using the Post and Page Builder plugin.',
			'Plugin Activation Failed',
			array(
				'back_link' => true,
			)
		);
	}

	function boldgrid_editor_deactivate() {
		deactivate_plugins( array( 'boldgrid-editor/boldgrid-editor.php' ), true );
	}

	// Plugin update checks.
	$upgrade = new Boldgrid_Editor_Upgrade();
	add_action( 'upgrader_process_complete', array( $upgrade, 'plugin_update_check' ), 10, 2 );


	$theme = new Boldgrid_Editor_Theme();
	add_filter( 'boldgrid_theme_framework_config', array( $theme, 'BGTFW_config_filters' ) );

	// Load on an early hook so we can tie into framework configs.
	if ( is_admin() ) {
		add_action( 'init', 'boldgrid_editor_setup' );
	} else {
		add_action( 'setup_theme', 'boldgrid_editor_setup' );
	}
}
