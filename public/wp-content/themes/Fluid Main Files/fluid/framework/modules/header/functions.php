<?php

if(!function_exists('fluid_edge_header_register_main_navigation')) {
    /**
     * Registers main navigation
     */
    function fluid_edge_header_register_main_navigation() {
        register_nav_menus(
            array(
                'main-navigation' => esc_html__('Main Navigation', 'fluid'),
                'mobile-navigation' => esc_html__('Mobile Navigation', 'fluid')
            )
        );
    }

    add_action('after_setup_theme', 'fluid_edge_header_register_main_navigation');
}

if(!function_exists('fluid_edge_is_top_bar_transparent')) {
    /**
     * Checks if top bar is transparent or not
     *
     * @return bool
     */
    function fluid_edge_is_top_bar_transparent() {
        $top_bar_enabled = fluid_edge_is_top_bar_enabled();

        $top_bar_bg_color = fluid_edge_options()->getOptionValue('top_bar_background_color');
        $top_bar_transparency = fluid_edge_options()->getOptionValue('top_bar_background_transparency');

        if($top_bar_enabled && $top_bar_bg_color !== '' && $top_bar_transparency !== '') {
            return $top_bar_transparency >= 0 && $top_bar_transparency < 1;
        }

        return false;
    }
}

if(!function_exists('fluid_edge_is_top_bar_completely_transparent')) {
    function fluid_edge_is_top_bar_completely_transparent() {
        $top_bar_enabled = fluid_edge_is_top_bar_enabled();

        $top_bar_bg_color = fluid_edge_options()->getOptionValue('top_bar_background_color');
        $top_bar_transparency = fluid_edge_options()->getOptionValue('top_bar_background_transparency');

        if($top_bar_enabled && $top_bar_bg_color !== '' && $top_bar_transparency !== '') {
            return $top_bar_transparency === '0';
        }

        return false;
    }
}

if(!function_exists('fluid_edge_is_top_bar_enabled')) {
    function fluid_edge_is_top_bar_enabled() {
        $top_bar_enabled = fluid_edge_get_meta_field_intersect('top_bar') === 'yes';

        return $top_bar_enabled;
    }
}

if(!function_exists('fluid_edge_get_top_bar_height')) {
    /**
     * Returns top bar height
     *
     * @return bool|int|void
     */
    function fluid_edge_get_top_bar_height() {
        if(fluid_edge_is_top_bar_enabled()) {
            $top_bar_height = fluid_edge_filter_px(fluid_edge_options()->getOptionValue('top_bar_height'));

            return $top_bar_height !== '' ? intval($top_bar_height) : 44;
        }

        return 0;
    }
}

if(!function_exists('fluid_edge_get_top_bar_background_height')) {
	/**
	 * Returns top bar background height
	 *
	 * @return bool|int|void
	 */
	function fluid_edge_get_top_bar_background_height() {

		$top_bar_height = fluid_edge_filter_px(fluid_edge_options()->getOptionValue('top_bar_height'));
		$header_height = fluid_edge_filter_px(fluid_edge_options()->getOptionValue('menu_area_height'));

		if($top_bar_height == ''){
			$top_bar_height = 44;
		}
		if($header_height == ''){
			$header_height = 80;
		}

		$top_bar_background_height = round($top_bar_height) + round($header_height / 2);
		
		return $top_bar_background_height;
	}
}

if(!function_exists('fluid_edge_get_sticky_header_height')) {
    /**
     * Returns top sticky header height
     *
     * @return bool|int|void
     */
    function fluid_edge_get_sticky_header_height() {
        //sticky menu height, needed only for sticky header on scroll up
        if((fluid_edge_get_meta_field_intersect('header_type') === 'header-standard' || fluid_edge_get_meta_field_intersect('header_type') === 'header-divided') && in_array(fluid_edge_options()->getOptionValue('header_behaviour'), array('sticky-header-on-scroll-up'))) {

            $sticky_header_height = fluid_edge_filter_px(fluid_edge_options()->getOptionValue('sticky_header_height'));

            return $sticky_header_height !== '' ? intval($sticky_header_height) : 60;
        }

        return 0;
    }
}

if(!function_exists('fluid_edge_get_sticky_header_height_of_complete_transparency')) {
    /**
     * Returns top sticky header height it is fully transparent. used in anchor logic
     *
     * @return bool|int|void
     */
    function fluid_edge_get_sticky_header_height_of_complete_transparency() {

        if((fluid_edge_get_meta_field_intersect('header_type') === 'header-standard' || fluid_edge_get_meta_field_intersect('header_type') === 'header-divided')) {
            $stickyHeaderTransparent = fluid_edge_options()->getOptionValue('sticky_header_background_color') !== '' && fluid_edge_options()->getOptionValue('sticky_header_transparency') === '0';

            if($stickyHeaderTransparent) {
                return 0;
            } else {
                $sticky_header_height = fluid_edge_filter_px(fluid_edge_options()->getOptionValue('sticky_header_height'));

                return $sticky_header_height !== '' ? intval($sticky_header_height) : 60;
            }
        }

        return 0;
    }
}

if(!function_exists('fluid_edge_get_sticky_scroll_amount')) {
    /**
     * Returns top sticky scroll amount
     *
     * @return bool|int|void
     */
    function fluid_edge_get_sticky_scroll_amount() {

		//sticky menu scroll amount
	    if((fluid_edge_get_meta_field_intersect('header_type') === 'header-standard' && in_array(fluid_edge_options()->getOptionValue('header_behaviour'), array('sticky-header-on-scroll-up','sticky-header-on-scroll-down-up'))) ) {

			$sticky_scroll_amount = fluid_edge_filter_px(fluid_edge_get_meta_field_intersect('scroll_amount_for_sticky'));

			return $sticky_scroll_amount !== '' ? intval($sticky_scroll_amount) : 0;
		}

        return 0;
    }
}

if(!function_exists('fluid_edge_get_sticky_scroll_amount_per_page')) {
	/**
	 * Returns top sticky scroll amount
	 *
	 * @return bool|int|void
	 */
	function fluid_edge_get_sticky_scroll_amount_per_page() {
		$post_id =  get_the_ID();
		//sticky menu scroll amount
		if((fluid_edge_get_meta_field_intersect('header_type') === 'header-standard' || fluid_edge_get_meta_field_intersect('header_type') === 'header-divided') && in_array(fluid_edge_options()->getOptionValue('header_behaviour'), array('sticky-header-on-scroll-up','sticky-header-on-scroll-down-up'))) {

			$sticky_scroll_amount_per_page = fluid_edge_filter_px(get_post_meta($post_id, "edgtf_scroll_amount_for_sticky_meta", true));

			return $sticky_scroll_amount_per_page !== '' ? intval($sticky_scroll_amount_per_page) : 0;
		}

		return 0;
	}
}