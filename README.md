# qlik-saas-wordpress-plugin
Wordpress plugin for Qlik Saas

<br>

### Prepare Installation in Qlik Saas
- Create a public / private key pair for signing JWTs <br>
https://internal.qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#create-a-public--private-key-pair-for-signing-jwts
- Configure JWT identity provider <br>
https://internal.qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#configure-jwt-identity-provider
- Add the public key to the configuration <br>
https://internal.qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#add-the-public-key-to-the-configuration
- Input issuer <br>
https://internal.qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#input-issuer-and-key-id-values

<br>

### Installation
 - Copy Files into `wp-content/plugins/qlik-saas` (until its officially released into the wp plugins directory)
 - Activate from Admin
 - Add `Host` of Qlik Saas as `<tenant>.<region>.qlikcloud.com`
 - Add your WebIntegrationID <br>
 https://internal.qlik.dev/tutorials/implement-jwt-authorization#configure-a-web-integration-id
 - Add you AppID
 - Add your Private key from first step (Create a public / private key pair for signing JWTs) <br>
 https://internal.qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#create-a-public--private-key-pair-for-signing-jwts
 - Add the Key ID created from previous step <br>
 https://internal.qlik.dev/tutorials/create-signed-tokens-for-jwt-authorization#input-issuer-and-key-id-values

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
