<?php
	/*
	Plugin Name: Qlik Saas
	Plugin URI: https://github.com/yianni-ververis/qlik-saas-wordpress-plugin
	Description: A plugin to connect to Qlik Saas tenant and get the objects. 
		- Unzip the plugin into your plugins directory
		- Activate from the admin panel
	Version: 1.0.6
	Author: yianni.ververis@qlik.com
	License: MIT
	Text Domain: qlik-saas
	Domain Path: /
	*/
	require __DIR__ . '/auth.php';

	defined('ABSPATH') or die("No script kiddies please!"); //Block direct access to this php file

  define( 'QLIK_SAAS_PLUGIN_VERSION', '1.0.6' );
  define( 'QLIK_SAAS_PLUGIN_MINIMUM_WP_VERSION', '5.1' );
	define( 'QLIK_SAAS_PLUGIN_PLUGIN_DIR', plugin_dir_url( __FILE__ ) );
	
	add_action('admin_menu', 'qlik_saas_plugin_menu');
	function qlik_saas_plugin_menu() {
		add_menu_page( esc_attr__('Qlik Saas Plugin Settings', 'qlik-saas'), 'Qlik Saas', 'administrator', 'qlik_saas_plugin_settings', 'qlik_saas_plugin_settings_page', plugin_dir_url( __FILE__ ) . 'assets/qlik.png', null );
	}
	
	// Create the options to be saved in the Database
	add_action( 'admin_init', 'qlik_saas_plugin_settings' );	
	function qlik_saas_plugin_settings() {
		register_setting( 'qlik_saas-plugin-settings-group', 'qs_host' );
		register_setting( 'qlik_saas-plugin-settings-group', 'qs_webintegrationid' );
		register_setting( 'qlik_saas-plugin-settings-group', 'qs_appid' );
		register_setting( 'qlik_saas-plugin-settings-group', 'qs_privatekey' );
		register_setting( 'qlik_saas-plugin-settings-group', 'qs_keyid' );
	}

	// Create the Admin Setting Page
	function qlik_saas_plugin_settings_page() {
		?>
		<div class="wrap">
			<h2><?php esc_html__('Qlik Saas Plugin Settings', 'qlik-saas'); ?></h2>
			<form method="post" action="options.php">
				<?php settings_fields( 'qlik_saas-plugin-settings-group' ); ?>
				<?php do_settings_sections( 'qlik_saas-plugin-settings-group' ); ?>
				<table class="form-table">
					<tr valign="top">
						<th scope="row"><?php esc_html_e('Host', 'qlik-saas'); ?>:</th>
						<td><input type="text" name="qs_host" size="50" value="<?php echo esc_attr( get_option('qs_host') ); ?>" /></td>
					</tr>
					<tr valign="top">
						<th scope="row"><?php esc_html_e('WebIntegrationID', 'qlik-saas'); ?>:</th>
						<td><input type="text" name="qs_webintegrationid" size="50" value="<?php echo esc_attr( get_option('qs_webintegrationid') ); ?>" /></td>
					</tr>
					<tr valign="top">
						<th scope="row"><?php esc_html_e('App ID', 'qlik-saas'); ?>:</th>
						<td><input type="text" name="qs_appid" size="50" value="<?php echo esc_attr( get_option('qs_appid') ); ?>" /></td>
					</tr>
					<tr valign="top">
						<th scope="row"><?php esc_html_e('Private Key for JWT auth', 'qlik-saas'); ?>:</th>
						<td><textarea name="qs_privatekey" cols="90" rows="20"><?php echo esc_attr( get_option('qs_privatekey') ); ?></textarea></td>
					</tr>
					<tr valign="top">
						<th scope="row"><?php esc_html_e('Key ID', 'qlik-saas'); ?>:</th>
						<td><input type="text" name="qs_keyid" size="50" value="<?php echo esc_attr( get_option('qs_keyid') ); ?>" /></td>
					</tr>
					<tr valign="top">
						<th scope="row">&nbsp;</th>
						<td><?php submit_button(); ?></td>
					</tr>
				</table>
				
				<div style="border-top:1px solid #ccc;padding-top:35px;"><a href="https://www.qlik.com/us/"><img src="<?php echo QLIK_SAAS_PLUGIN_PLUGIN_DIR . "/assets/QlikLogo-RGB.png"?>" width="200"></a></div>
			</form>
		</div>
		<?php
	}

  // Register Javascripts
	add_action( 'wp_enqueue_scripts', 'qlik_saas_enqueued_assets', 20 );
	function qlik_saas_enqueued_assets() {
		if( ! wp_script_is( 'qlik-saas-iframe-sheet-js', 'enqueued' ) ) {
      wp_register_script( 'qlik-saas-iframe-sheet-js', QLIK_SAAS_PLUGIN_PLUGIN_DIR . 'js/iframe-sheet.js', QLIK_SAAS_PLUGIN_VERSION, $in_footer = false );
		}
  }

	// qlik-saas-single - Injects an iframe based on Qlik Saas Single API
	// [qlik-saas-single-sheet id="1ff88551-9c4d-41e0-b790-37f4c11d3df8" height="600"]
	// [qlik-saas-single-sheet id="kHgmg" height="600"]
	function qlik_saas_single_sheet_func( $atts ) {
		global $wp_scripts;
		wp_enqueue_script( 'qlik-saas-iframe-sheet-js' );
		$settings = array(	
			'version'						=> QLIK_SAAS_PLUGIN_VERSION,
			'host'							=> esc_attr( get_option('qs_host') ),
			'webIntegrationID'	=> esc_attr( get_option('qs_webintegrationid') ),
			'appID'							=> esc_attr( get_option('qs_appid') ),	
		);
		$tokenSettings = array(
			'host'							=> esc_attr( get_option('qs_host') ),
			'privateKey'				=> esc_attr( get_option('qs_privateKey') ),		
			'keyID'							=> esc_attr( get_option('qs_keyid') ),
		);
		$settings['token'] = qlik_saas_jwt($tokenSettings);
			wp_localize_script( 'qlik-saas-iframe-sheet-js', 'settings', $settings );
		return "<div qlik-saas-sheet-id=\"{$atts['id']}\" width=\"100%\" height=\"{$atts['height']}\" style=\"display: block;\"></div>";
	}
	add_shortcode( 'qlik-saas-single-sheet', 'qlik_saas_single_sheet_func' );

	// Uninstall the settings when the plugin is uninstalled
	function qlik_saas_uninstall() {
		unregister_setting( 'qlik_saas-plugin-settings-group', 'qs_host' );
		unregister_setting( 'qlik_saas-plugin-settings-group', 'qs_webintegrationid' );
		unregister_setting( 'qlik_saas-plugin-settings-group', 'qs_appid' );
		unregister_setting( 'qlik_saas-plugin-settings-group', 'qs_privatekey' );
		unregister_setting( 'qlik_saas-plugin-settings-group', 'qs_keyid' );
	}
	register_uninstall_hook(  __FILE__, 'qlik_saas_uninstall' );
?>
