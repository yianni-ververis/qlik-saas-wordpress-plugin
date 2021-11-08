<?php
	require __DIR__ . '/vendor/autoload.php';
	
	use Firebase\JWT\JWT;

	// Generatate the JWT token
	function qlik_saas_jwt($settings) {
		$jwt = null;
		if (
			isset($settings['host']) && !empty($settings['host']) && 
			isset($settings['privateKey']) && !empty($settings['privateKey']) && 
			isset($settings['keyID']) && !empty($settings['keyID'])
		) {

			$issuedAt   = new DateTimeImmutable();
			$expire     = $issuedAt->modify('+30 minutes')->getTimestamp();
	
			$payload = [
					'iss'  						=> $settings['host'],									// Issuer
					"aud"							=> 'qlik.api/login/jwt-session',
					'iat'  						=> $issuedAt->getTimestamp(),					// Issued at: time when the token was generated
					'nbf'  						=> $issuedAt->getTimestamp(),					// This is the time that the token can actually be used
					'exp'							=> $expire,
					'sub'							=> 'anon-view-sub',
					'subType'					=> 'user',
					'name'						=> 'Anon Viewer',
					'email'						=> 'anon-viewer@qlik.com',
					'email_verified'	=> true,
					'groups'					=> ['anon-view'],
			];
			
			// Encode the array to a JWT string.
			JWT::$leeway = 30 * 60; // $leeway in seconds
	
			// encode($payload, $key, $alg = 'HS256', $keyId = null, $head = null)
			$jwt = JWT::encode(
				$payload,
				$settings['privateKey'],
				'RS256',
				$settings['keyID']
			);
		}
		
		return $jwt;
	}
  
?>
