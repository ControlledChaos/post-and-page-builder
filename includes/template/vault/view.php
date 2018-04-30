<style>
.boldgrid-vault .notice {
	padding: 15px 10px;
	font-size: 14px;
	position: relative;
}

.bg-lead {
	margin-left: 45px;
}

.dashicons-upload {
	position: relative;
	top: 18px;
}

.notice + img {
	display: block;
	margin: 30px auto;
}
</style>

<div class="boldgrid-vault wrap theme-install-php">
	<h1 class="wp-heading-inline"><?php echo esc_html( get_admin_page_title() ) ?></h1>
	<a href="http://localhost/wordpress/wp-admin/post-new.php?post_type=bg_block"
		class="page-title-action"><span class="dashicons dashicons-upload"></span> Import to WordPress</a>
	<p class="notice">
		<span class="boldgrid-cert"></span>
		<span class="bg-lead">
			BoldGrid Vault allows safe storage of your content on our servers. You can also browse
			content that others have made publicly available. A free BoldGrid Central account is required
			to take full advantage of these features.
		</span>
	</p>
	<img src="https://i.imgur.com/PoLuOBh.png">
</div>
