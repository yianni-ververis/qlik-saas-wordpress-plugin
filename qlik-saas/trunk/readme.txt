=== Plugin Name ===
Contributors: yianniververis
Tags: qlik, saas,
Requires at least: 5.0
Tested up to: 5.8.1
Stable tag: 1.0.7
License: MIT
License URI: https://opensource.org/licenses/MIT

Allows you to create a mashup by embedding Qlik Saas sheets inside WordPress pages.

== Description ==

This is a simple plugin to connect to your Qlik Saas tenant and create a mashup by getting the sheet with a shortcode inside a page within the admin panel

== How to Configure ==

Before the plugin can be used, it must be configured as follows:
1. Login to your WordPress Admin Portal.
1. On the left hand navigation panel, select "Qlik Saas". 
1. Enter the relevant Qlik Saas server URL, WebIntegrationID, App ID, Private Key and KeyID to connect to your Qlik Saas tenant.

== Prepare Installation in Qlik Saas ==
- Create a public / private key pair for signing JWTs <br>
https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#create-a-public--private-key-pair-for-signing-jwts
- Configure JWT identity provider <br>
https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#configure-jwt-identity-provider
- Add the public key to the configuration <br>
https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#add-the-public-key-to-the-configuration
- Input issuer <br>
https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#input-issuer-and-key-id-values

== Installation ==
 - Add `Host` of Qlik Saas as `<tenant>.<region>.qlikcloud.com`
 - Add your WebIntegrationID <br>
 https://qlik.dev/tutorials/implement-jwt-authorization#configure-a-web-integration-id
 - Add you AppID
 - Add your Private key from first step (Create a public / private key pair for signing JWTs) <br>
 https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#create-a-public--private-key-pair-for-signing-jwts
 - Add the Key ID created from previous step <br>
 https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#input-issuer-and-key-id-values

== How to Use ==

The plugin utilizes a WordPress shortcode to insert Qlik Saas objects into a page. There are currently 1 shortcode available to insert Qlik Sense sheet.

=== Qlik Saas Sheet ===

This shortcode allows you to iframe a sheet. The shortcode syntax is as follows:

`[qlik-saas-single-sheet id="1ff88551-9c4d-41e0-b790-37f4c11d3df8" height="400" width="500"]`

Parameters are as follows:
* id="": Is the object id as found in the "dev-hub/single-configurator" or the Qlik Explorer for Developers
* height="": The height of the visualization in pixels.
* appid="" (optional): The variable qs_appid is added to store the value from the custom field appid. The custom field is used to be able to use a separate app for each page rather than the apps defined in the plugin config.

=== Qlik Saas Object ===

This shortcode allows you to embed objects for mashup. The shortcode syntax is as follows:

`[qlik_saas_object id="selections" height="50"]`
`[qlik_saas_object id="CSxZqS" height="400"]`

Parameters are as follows:
* id="": Is the object id as found in the "dev-hub/single-configurator" or the Qlik Explorer for Developers. Add "selections" to get current selections toolbar
* height="": The height of the visualization in pixels.
* appid="" (optional)

== Installation ==

It is strongly advised to install the plugin from the WordPress plugins manager to receive notifications of future updates. This can be done as follows:

1. Login to your WordPress Admin Portal.
2. On the left hand navigation panel, select "Plugins". 
3. Towards the top of the plugins list, click the "Add New" button. 
4. In the search box towards the right hand side, type "Qlik" and hit enter to search.
5. The Qlik Saas plugin is currently one of only two results returned. Click the "Install Now" button next to it.
6. WordPress will then download and install the plugin for you. Once complete, "Install Now" button will change to "Activate". Click the "Activate" button to complete the installation.
7. The plugin is now installed and ready to Configure.

== Frequently Asked Questions ==

== Screenshots ==

1. Admin Settings Page
2. Shortcode with the sheet id
3. Preview iframed sheet
4. Shortcodes for mashup with object ids
5. Helpdesk sheet 1 with object ids
5. Helpdesk sheet 2 with object ids

== Changelog ==

= 1.0.7 =
* Add object ids for mashups

= 1.0.6 =
* Support multiple shortcodes / sheet iframes in one page

= 1.0.5 =
* Init with iframing a sheet
