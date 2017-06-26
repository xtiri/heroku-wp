<?php
$title_tag = isset($title_tag) ? $title_tag : 'h2';
?>

<<?php echo esc_attr($title_tag);?> itemprop="name" class="entry-title edgtf-post-title">
    <?php if(fluid_edge_blog_item_has_link()) { ?>
        <a itemprop="url" href="<?php echo get_the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
    <?php } ?>
        <?php the_title(); ?>
    <?php if(fluid_edge_blog_item_has_link()) { ?>
        </a>
    <?php } ?>
</<?php echo esc_attr($title_tag);?>>