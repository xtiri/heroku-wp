<aside class="edgtf-sidebar">
    <?php
        $edgtf_sidebar = fluid_edge_get_sidebar();
    
        if (is_active_sidebar($edgtf_sidebar)) {
            dynamic_sidebar($edgtf_sidebar);
        }
    ?>
</aside>