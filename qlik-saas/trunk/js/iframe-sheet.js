async function isLoggedIn() {
  console.log('Check if logged in');
  return await fetch(`https://${settings.host}/api/v1/users/me`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
          'qlik-web-integration-id': settings.webIntegrationID,
      },
  })
}

async function login_sheet() {
  console.log('Logging in ...');
  var authHeader = `Bearer ${settings.token}`;
  return await fetch(`https://${settings.host}/login/jwt-session?qlik-web-integration-id=${settings.webIntegrationID}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
      headers: {
          'Authorization': authHeader,
          'qlik-web-integration-id': settings.webIntegrationID,
          'Content-Type': 'application/json'
      },
  })
};



const init = async () => {
  try {
    const loggedIn = await isLoggedIn();
    if (loggedIn.status != 200) {
      var loginRes = await login_sheet();
      if (loginRes.status != 200) {
        console.log('Something went wrong while logging in.')
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
    const theAppId = sheets[i].getAttribute('app-id') !== '' ? sheets[i].getAttribute('app-id') : settings.appID;
    const width = sheets[i].getAttribute('width');
    const height = sheets[i].getAttribute('height');
    iframe.src = `https://${settings.host}/single/?appid=${theAppId}&sheet=${sheetID}&opt=ctxmenu&identity=${qs_identity}`;
    iframe.height = height;
    iframe.width = width;
    sheets[i].appendChild(iframe);
  }
};

init();