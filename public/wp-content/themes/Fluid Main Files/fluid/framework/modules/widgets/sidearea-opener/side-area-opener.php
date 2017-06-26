<?php

class FluidEdgeClassSideAreaOpener extends FluidEdgeClassWidget {
    public function __construct() {
        parent::__construct(
            'edgtf_side_area_opener',
	        esc_html__('Edge Side Area Opener', 'fluid'),
	        array( 'description' => esc_html__( 'Display a "hamburger" icon that opens the side area', 'fluid'))
        );

        $this->setParams();
    }
	
	protected function setParams() {
		$this->params = array(
			array(
				'type'        => 'textfield',
				'name'        => 'icon_color',
				'title'       => esc_html__('Side Area Opener Color', 'fluid'),
				'description' => esc_html__('Define color for side area opener', 'fluid')
			),
			array(
				'type'        => 'textfield',
				'name'        => 'icon_hover_color',
				'title'       => esc_html__('Side Area Opener Hover Color', 'fluid'),
				'description' => esc_html__('Define hover color for side area opener', 'fluid')
			),
			array(
				'type'        => 'textfield',
				'name'        => 'widget_margin',
				'title'       => esc_html__('Side Area Opener Margin', 'fluid'),
				'description' => esc_html__('Insert margin in format: top right bottom left (e.g. 10px 5px 10px 5px)', 'fluid')
			),
			array(
				'type' => 'textfield',
				'name' => 'widget_title',
				'title' => esc_html__('Side Area Opener Title', 'fluid')
			)
		);
	}
	
	public function widget($args, $instance) {
		$holder_styles = array();
		if (!empty($instance['icon_color'])) {
			$holder_styles[] = 'color: ' . $instance['icon_color'].';';
		}
		if (!empty($instance['widget_margin'])) {
			$holder_styles[] = 'margin: ' . $instance['widget_margin'];
		}
		?>
		<a class="edgtf-side-menu-button-opener edgtf-icon-has-hover" <?php echo fluid_edge_get_inline_attr($instance['icon_hover_color'], 'data-hover-color'); ?> href="javascript:void(0)" <?php fluid_edge_inline_style($holder_styles); ?>>
			<?php if (!empty($instance['widget_title'])) { ?>
				<h5 class="edgtf-side-menu-title"><?php echo esc_html($instance['widget_title']); ?></h5>
			<?php } ?>
			<span class="edgtf-side-menu-icon">
        		<?php echo fluid_edge_icon_collections()->renderIcon('ion-android-menu', 'ion_icons'); ?>
        	</span>
		</a>
	<?php }
}