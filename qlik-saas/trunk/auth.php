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

			$uuid = wp_generate_uuid4();

			$payload = [
					'iss'  						=> $settings['host'],
					"aud"						=> 'qlik.api/login/jwt-session',
					'iat'  						=> $issuedAt->getTimestamp(),
					'nbf'  						=> $issuedAt->getTimestamp(),
					'jti'						=> $uuid,
					'exp'						=> $expire,
					'sub'						=> $uuid,
					'subType'					=> 'user',
					'name'						=> 'Anon_' . $uuid,
					'email'						=> $uuid . '@anonymoususer.anon',
					'email_verified'			=> true,
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
