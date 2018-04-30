<script type="text/html" id="tmpl-boldgrid-editor-panel">
<div class='editor-panel ui-widget-content'>
	<div class='panel-title'>
		<span data-id="icon"></span>
		<span class="name"></span>
		<span class="info"></span>
		<span class="dashicons dashicons-no-alt close-icon"></span>
	</div>
	<div class='panel-body'></div>
	<div class='panel-footer'>
		<div class='customize'>
			<a class='panel-button customize-design' href="#"><span class="dashicons dashicons-admin-customizer"></span> Customize Design</a>
			<a class='panel-button add-media' href="#"><span class="dashicons dashicons-images-alt"></span> Add Image</a>
		</div>
	</div>
	<span class="bg-loading-spinner"></span>
</div>
</script>
<script type="text/html" id="tmpl-boldgrid-editor-mce-tools">
<div id="boldgrid-draggable-resizing-overlay"></div>
<div class="delete-icon delete-icon-wrap"><span class="dashicons dashicons-trash delete-icon"></span></div>
</script>
<script type="text/html" id="tmpl-boldgrid-editor-control-menu">
<div id='boldgrid-instance-menu' class='boldgrid-instance-menu'>
	<ul>
	</ul>
</div>
</script>
<script type="text/html" id="tmpl-boldgrid-editor-tooltip">
<div class='boldgrid-tooltip-wrap'>
<span class="dashicons dashicons-editor-help boldgrid-help-icon"></span>
<div class="boldgrid-tooltip">
	<div class="boldgrid-tooltip-arrow"></div>
	<div class="boldgrid-tooltip-inner">
		{{{data.message}}}
	</div>
</div>
</div>
</script>
<script type="text/html" id="tmpl-boldgrid-editor-empty-section">
<div class="boldgrid-section"  style='background-color: #ddd'>
	<div class="container">
		<div class="row" style='padding-top:75px;padding-bottom:75px'><div class="col-md-12"></div></div>
	</div>
</div>
</script>
<script type="text/html" id="tmpl-boldgrid-editor-zoom-tools">
<div class='bg-zoom-controls'>
	<div class='bg-zoom-slider'>
		<i class="fa fa-search-plus zoom-in" aria-hidden="true"></i>
		<div class="slider"></div>
		<i class="fa fa-search-minus zoom-out" aria-hidden="true"></i>
	</div>
</div>
</script>
<div class='bg-editor-loading'></div>
<style>
	.iframe-modal-wrap {
		position: fixed;
		top: 0;
		z-index: 99999;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255,255,255,.7);
	}

	.iframe-modal {
		position: absolute;
		top: 50%;
		transform: translateY(-50%) translateX(-50%);
		left: 50%;
		padding: 20px;
		background: white;
		box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.4);
		width: 85%;
	}

	.iframe-modal h1 {
		font-weight: 100;
		margin-top: 0;
		margin-bottom: 30px;
	}

	.iframe-modal .close {
		position: absolute;
		top: 5px;
		right: 45px;
		height: 43px;
		padding-left: 10px;
	}

	.iframe-modal .close .dashicons {
		font-size: 45px;
	}

	.iframe-modal .name {
		margin-right: 10px;
	}

	.iframe-modal .category {
		margin-left: 10px;
	}

	.iframe-modal .dashicons-lock {
		font-size: 27px;
		position: relative;
		top: -3px;
		margin-right: 8px;
	}
</style>
<div class="iframe-modal-wrap">
	<div class="iframe-modal">
		<h1><span class="name"><span class="dashicons dashicons-lock"></span> BoldGrid Vault</span> | <span class="category">Blocks</span></h1>
		<span class="close"><span class="dashicons dashicons-no-alt"></span></span>
		<img src="https://i.imgur.com/PoLuOBh.png">
	</div>
</div>
