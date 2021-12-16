const checkStatus = async () => {
  const response = await fetch(`https://${settings.host}/api/v1/csrf-token`, {
    credentials: "include",
    headers: { "qlik-web-integration-id": settings.webIntegrationID },
  });
  if (response.status === 401) {
    await connect();
  }
}

const connect = async () => {
  await fetch(`https://${settings.host}/login/jwt-session?qlik-web-integration-id=${settings.webIntegrationID}`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${settings.token}`,
      'Qlik-Web-Integration-ID':settings.webIntegrationID,
    },
    rejectUnauthorized: false,
  });
  qs_csrf = true;
};

const init = async () => {
  try {
    if(!qs_csrf) {
      await checkStatus();
    }
    const identity = `${Date.now().toString()}_ANON`;
    var sheets = document.querySelectorAll('[qlik-saas-sheet-id]');
    // Loop over all selected elements
    for (i = 0; i < sheets.length; ++i) {
      const iframe = document.createElement('iframe');
      const sheetID = sheets[i].getAttribute('qlik-saas-sheet-id');
      const theAppId = settings.appID !== '' ? settings.appID : sheets[i].getAttribute('app-id');
      const width = sheets[i].getAttribute('width');
      const height = sheets[i].getAttribute('height');
      iframe.src = `https://${settings.host}/single?appid=${theAppId}&sheet=${sheetID}&opt=currsel&qlik-web-integration-id=${settings.webIntegrationID}&identity=${identity}`;
      iframe.height = height;
      iframe.width = width;
      sheets[i].appendChild(iframe);
    }
  } catch (error) {
    console.error(error);
  }
};

init();