<?php
if(!function_exists('fluid_edge_header_vertical_options_map')) {

	function fluid_edge_header_vertical_options_map($panel_header){


		$vertical_area_container = fluid_edge_add_admin_container_no_style(
			array(
				'parent'          => $panel_header,
				'name'            => 'vertical_area_container',
				'hidden_property' => 'header_type',
				'hidden_values'   => array('header-standard','header-full-screen')
			)
		);

		fluid_edge_add_admin_section_title(
			array(
				'parent' => $vertical_area_container,
				'name' => 'menu_area_style',
				'title' => esc_html__('Vertical Area Style', 'fluid')
			)
		);

		fluid_edge_add_admin_field(array(
			'name'        => 'vertical_header_background_color',
			'type'        => 'color',
			'label'       => esc_html__('Background Color', 'fluid'),
			'description' => esc_html__('Set background color for vertical menu', 'fluid'),
			'parent'      => $vertical_area_container
		));

		fluid_edge_add_admin_field(
			array(
				'name'          => 'vertical_header_background_image',
				'type'          => 'image',
				'default_value' => '',
				'label'         => esc_html__('Background Image', 'fluid'),
				'description'   => esc_html__('Set background image for vertical menu', 'fluid'),
				'parent'        => $vertical_area_container
			)
		);

		fluid_edge_add_admin_field(
			array(
				'parent'        => $vertical_area_container,
				'type'          => 'yesno',
				'name'          => 'vertical_header_shadow',
				'default_value' => 'no',
				'label'         => esc_html__('Shadow', 'fluid'),
				'description'   => esc_html__('Set shadow on vertical header', 'fluid'),
			)
		);

		fluid_edge_add_admin_field(
			array(
				'parent' => $vertical_area_container,
				'type' => 'yesno',
				'name' => 'vertical_header_border',
				'default_value' => 'no',
				'label' => esc_html__('Vertical Area Border', 'fluid'),
				'description' => esc_html__('Set border on vertical area', 'fluid'),
				'args' => array(
					'dependence' => true,
					'dependence_hide_on_yes' => '',
					'dependence_show_on_yes' => '#edgtf_vertical_header_shadow_border_container'
				)
			)
		);

		$vertical_header_shadow_border_container = fluid_edge_add_admin_container(
			array(
				'parent' => $vertical_area_container,
				'name' => 'vertical_header_shadow_border_container',
				'hidden_property' => 'vertical_header_border',
				'hidden_value' => 'no'
			)
		);

		fluid_edge_add_admin_field(
			array(
				'parent' => $vertical_header_shadow_border_container,
				'type' => 'color',
				'name' => 'vertical_header_border_color',
				'default_value' => '',
				'label' => esc_html__('Border Color', 'fluid'),
				'description' => esc_html__('Set border color for vertical area', 'fluid'),
			)
		);

		fluid_edge_add_admin_field(
			array(
				'parent'        => $vertical_area_container,
				'type'          => 'yesno',
				'name'          => 'vertical_header_center_content',
				'default_value' => 'no',
				'label'         => esc_html__('Center Content', 'fluid'),
				'description'   => esc_html__('Set content in vertical center', 'fluid'),
			)
		);


		do_action('fluid_edge_header_vertical_area_additional_options', $panel_header);
	}
	add_action('fluid_edge_header_vertical_options_map', 'fluid_edge_header_vertical_options_map');
}