
<img src="assets/QlikLogo-RGB.png" alt="Qlik" width="200"/>
<br>
<br>

# qlik-saas-wordpress-plugin
Wordpress plugin for Qlik Saas tenant


### Prepare Installation in Qlik Saas
- Create a public / private key pair for signing JWTs <br>
https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#create-a-public--private-key-pair-for-signing-jwts
- Configure JWT identity provider <br>
https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#configure-jwt-identity-provider
- Add the public key to the configuration <br>
https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#add-the-public-key-to-the-configuration
- Input issuer <br>
https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#input-issuer-and-key-id-values

<br>

### Installation

  1. Login to your WordPress Admin Portal.
  1. On the left hand navigation panel, select "Plugins". 
  1. Towards the top of the plugins list, click the "Add New" button. 
  1. In the search box towards the right hand side, type "Qlik" and hit enter to search.
  1. The Qlik Saas plugin is currently one of only two results returned. Click the "Install Now" button next to it.
  1. WordPress will then download and install the plugin for you. Once complete, "Install Now" button will change to "Activate". Click the "Activate" button to complete the installation.

  
### Configuration

 - Add `Host` of Qlik Saas as `<tenant>.<region>.qlikcloud.com`
 - Add your WebIntegrationID <br>
 https://qlik.dev/tutorials/implement-jwt-authorization#configure-a-web-integration-id
 - Add you AppID
 - Add your Private key from first step (Create a public / private key pair for signing JWTs) <br>
 https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#create-a-public--private-key-pair-for-signing-jwts
 - Add the Key ID created from previous step <br>
 https://qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#input-issuer-and-key-id-values

<br>

![Admin Setup](/assets/admin.PNG)

<br>

### Usage
  - iFrame an entire sheet by adding the shortcode into your page <br>
  `[qlik-saas-single-sheet id="1ff88551-9c4d-41e0-b790-37f4c11d3df8" height="400" width="500"]`

<br>

### Coming up
  - Get Qlik Saas app objects with Nebula.js <br>
  `[qlik-saas-obj id="xYzzR" height="400" width="500"]`

### Changelog
  - 1.0.6
    - Support multiple shortcodes / sheet iframes in one page
  - 1.0.5
    - Init with iframing a sheet
