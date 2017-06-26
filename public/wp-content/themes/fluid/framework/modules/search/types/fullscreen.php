<?php

if( !function_exists('fluid_edge_search_body_class') ) {
    /**
     * Function that adds body classes for different search types
     *
     * @param $classes array original array of body classes
     *
     * @return array modified array of classes
     */
    function fluid_edge_search_body_class($classes) {

        $classes[] = 'edgtf-fullscreen-search';
        $classes[] = 'edgtf-search-fade';

        return $classes;

    }

    add_filter('body_class', 'fluid_edge_search_body_class');
}

if ( ! function_exists('fluid_edge_get_search') ) {
    /**
     * Loads search HTML based on search type option.
     */
    function fluid_edge_get_search() {
        fluid_edge_load_search_template();
    }

    add_action('fluid_edge_action_before_page_header', 'fluid_edge_get_search', 9);
}

if ( ! function_exists('fluid_edge_load_search_template') ) {
    /**
     * Loads search HTML based on search type option.
     */
    function fluid_edge_load_search_template() {
        fluid_edge_get_module_template_part('templates/types/fullscreen', 'search');
    }
}