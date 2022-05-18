async function isLoggedIn() {
  console.log('Check if logged in...');
  return await fetch(`https://${qs_settings.host}/api/v1/users/me`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
          'qlik-web-integration-id': qs_settings.webIntegrationID,
      },
  });
}


async function getJWT() {
  return await fetch('/wp-json/qs/v1/token', {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      },
  })
};

async function login_sheet(jwt) {
  console.log('Logging in ...');
  var authHeader = `Bearer ${jwt}`;
  return await fetch(`https://${qs_settings.host}/login/jwt-session?qlik-web-integration-id=${qs_settings.webIntegrationID}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
      headers: {
          'Authorization': authHeader,
          'qlik-web-integration-id': qs_settings.webIntegrationID,
          'Content-Type': 'application/json'
      },
      rejectunAuthorized: false
  });
};



const init = async () => {
  try {
    const loggedIn = await isLoggedIn();  
    if(loggedIn.status != 200) {
      console.log('Not logged in...');
      const tokenRes = await getJWT();
        if (tokenRes.status == 200) {
          const respJson = await tokenRes.json();
          var loginRes = await login_sheet(respJson);
          if (loginRes.status != 200) {
              console.log('Something went wrong while logging in.')
          } else {
              const loggedIn = await isLoggedIn();
              if (loggedIn.status != 200) {
                  console.log('Third-party cookie blocking is preventing this site from loading. Try another browser or adjust your browser settings.')
              }
          }
      } else {
        const error =  await tokenRes.json();
          console.log('Something went wrong: ', error.message);
      }
    }
  } catch (err) {
      throw new Error(err)
  }

  console.log('Render Sheets...');
  var sheets = document.querySelectorAll('[qlik-saas-sheet-id]');
  // Loop over all selected elements
  for (i = 0; i < sheets.length; ++i) {
    const iframe = document.createElement('iframe');
    const sheetID = sheets[i].getAttribute('qlik-saas-sheet-id');
    const theAppId = sheets[i].getAttribute('app-id') !== '' ? sheets[i].getAttribute('app-id') : qs_settings.appID;
    const width = sheets[i].getAttribute('width');
    const height = sheets[i].getAttribute('height');
    // set iframe config
    iframe.src = `https://${qs_settings.host}/single/?appid=${theAppId}&sheet=${sheetID}&opt=ctxmenu`;
    iframe.height = height;
    iframe.width = width;
    // append iframed sheets to the DOM
    sheets[i].appendChild(iframe);
  }
};

init();