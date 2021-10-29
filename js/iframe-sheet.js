console.log(settings)
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
};

const init = async () => {
  try {
    await checkStatus();
    const identity = `${Date.now().toString()}_ANON`;
    const iframe = document.createElement('iframe');
    iframe.src = `https://${settings.host}/single?appid=${settings.appID}&sheet=${settings.sheetID}&opt=currsel&qlik-web-integration-id=${settings.webIntegrationID}&identity=${identity}`;
    iframe.setAttribute('onload', `this.width=${settings.width};this.height=${settings.height};`);
    const parentNode = document.querySelector('#qs_sheet');
    parentNode.appendChild(iframe);
  } catch (error) {
    console.error(error);
  }
};

init();
