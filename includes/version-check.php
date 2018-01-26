<?php

// Check that PHP is installed at our required version or deactivate and die:
$required_php_version = '5.3';
if ( version_compare( phpversion(), $required_php_version, '<' ) ) {
	if ( ! function_exists( 'deactivate_plugins' ) ) {
		require_once ABSPATH . '/wp-admin/includes/plugin.php';
	}

	deactivate_plugins( BOLDGRID_EDITOR_PATH . '/post-and-page-builder.php' );
	wp_die(
		'<p><center><strong>Post and Page Builder</strong> requires PHP ' . $required_php_version .
		' or greater.</center></p>', 'Plugin Activation Error',
		array (
			'response' => 200,
			'back_link' => true
		) );
}
