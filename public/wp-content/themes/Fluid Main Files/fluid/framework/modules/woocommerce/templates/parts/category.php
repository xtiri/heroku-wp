<?php

if($display_category === 'yes') {
	$product      = wc_get_product( get_the_ID() );
	$categories   = ! empty( $product ) ? wc_get_product_category_list( $product->get_id(), ', ' ) : '';
	
	if (!empty($categories)) { ?>
		<p class="edgtf-<?php echo esc_attr($class_name); ?>-category"><?php print $categories; ?></p>
	<?php } ?>
<?php } ?>