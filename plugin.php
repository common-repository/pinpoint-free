<?php
/**
 * Plugin Name: Pinpoint Free
 * Plugin URI: https://pinpoint.generalsemantics.lt/
 * Description: Add interactive clickable color pins ontop of your photos.
 * Text Domain: pinpoint
 * Domain Path: /languages
 * Author: Justinas B.
 * Author URI: http://just.beinorius.lt/
 * Version: 1.2.0
 * License: GPLv2 or later
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function pinpoint_free_init() {
	wp_register_script(
		'pinner-script',
		plugins_url( 'assets/pinner/pinner.min.js', __FILE__ ),
		array(),
		'1.0.0',
		true
	);

	wp_enqueue_script('pinner-script');

	wp_register_style(
		'pinner-style',
		plugins_url( 'assets/pinner/pinner.min.css', __FILE__ ),
		array()	,
		'1.0.0'
	);

	wp_enqueue_style( 'pinner-style' );

	wp_register_script(
		'pinpoint-free-editor-script',
		plugins_url( 'dist/pinpoint.editor.min.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-api', 'pinner-script'),
		'1.1.1',
		true 
	);

	wp_register_style(
		'pinpoint-free-editor-style',
		plugins_url( 'dist/pinpoint.editor.min.css', __FILE__ ),
		array( 'wp-edit-blocks', 'pinner-style' ),
		'1.1.1'
	);
    
    register_block_type( 'pinpoint/image-free', array(
		'editor_script' => 'pinpoint-free-editor-script',
		'editor_style' => 'pinpoint-free-editor-style'
	));

	wp_set_script_translations( 'pinpoint-free-editor-script', 'pinpoint',  plugin_dir_path( __FILE__ ) . 'languages' );
	wp_set_script_translations( 'pinpoint-free-client-script', 'pinpoint',  plugin_dir_path( __FILE__ ) . 'languages' );
}

function pinpoint_free_client() {
	wp_register_script(
		'pinpoint-free-client-script',
		plugins_url( 'dist/pinpoint.client.min.js', __FILE__ ),
		array( 'pinner-script', 'wp-i18n' ),
		'1.1.1',
		true
	);

	wp_enqueue_script( 'pinpoint-free-client-script' );

	wp_register_style(
		'pinpoint-free-client-style',
		plugins_url( 'dist/pinpoint.client.min.css', __FILE__ ),
		array( 'pinner-style' ),
		'1.1.1'
	);

	wp_enqueue_style( 'pinpoint-free-client-style' );
}

add_action( 'init', 'pinpoint_free_init' );
add_action( 'wp_enqueue_scripts', 'pinpoint_free_client' );