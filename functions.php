<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function simple_landing_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'simple-landing'),
    ));
}
add_action('after_setup_theme', 'simple_landing_setup');

// Enqueue scripts and styles
function simple_landing_scripts() {
    // Enqueue main stylesheet
    wp_enqueue_style('simple-landing-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Enqueue custom JavaScript
    wp_enqueue_script('simple-landing-script', get_template_directory_uri() . '/script.js', array('jquery'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'simple_landing_scripts'); 

// Disable WordPress admin bar for all users
function disable_admin_bar() {
    return false;
}
add_filter('show_admin_bar', 'disable_admin_bar');