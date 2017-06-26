<?php
include_once EDGE_FRAMEWORK_MODULES_ROOT_DIR.'/woocommerce/woocommerce-functions.php';

if (fluid_edge_is_woocommerce_installed()) {
	include_once EDGE_FRAMEWORK_MODULES_ROOT_DIR.'/woocommerce/admin/options-map/map.php';
	include_once EDGE_FRAMEWORK_MODULES_ROOT_DIR.'/woocommerce/admin/meta-boxes/woocommerce-meta-boxes.php';
	include_once EDGE_FRAMEWORK_MODULES_ROOT_DIR.'/woocommerce/woocommerce-template-hooks.php';
	include_once EDGE_FRAMEWORK_MODULES_ROOT_DIR.'/woocommerce/woocommerce-config.php';
	
	include_once EDGE_FRAMEWORK_MODULES_ROOT_DIR.'/woocommerce/shortcodes/shortcodes-functions.php';
	include_once EDGE_FRAMEWORK_MODULES_ROOT_DIR.'/woocommerce/widgets/woocommerce-dropdown-cart.php';
}