async function isLoggedIn_nebula() {
  console.log('Check if logged in - nebula');
  return await fetch(`https://${settings.host}/api/v1/users/me`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
          'qlik-web-integration-id': settings.webIntegrationID,
      },
  });
}

async function login_nebula() {
  console.log('Logging in - nebula');
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
      rejectunAuthorized: false,
  });
};

const getCsrfTokenInfo = async () => {
  const response = await fetch(`https://${settings.host}/api/v1/csrf-token`, {
    credentials: "include",
    headers: { "qlik-web-integration-id": settings.webIntegrationID },
  });
  return response.headers.get("qlik-csrf-token");
}

const initNebula = async () => {
  try {
    const loggedIn = await isLoggedIn_nebula();
    if (loggedIn.status != 200) {
      var loginRes = await login_nebula();
      if (loginRes.status != 200) {
        console.log('Something went wrong while logging in.')
      } else {
        const loggedIn = await isLoggedIn();
        if (loggedIn.status != 200) {
          console.log('Third-party cookie blocking is preventing this site from loading. Try another browser or adjust your browser settings.')
        }
      }
    }
  } catch (err) {
      throw new Error(err)
  }

  const csrfToken = await getCsrfTokenInfo();
  var objects = document.querySelectorAll('[qlik-saas-object-id]');

  console.log('Render nebula objects...');

  // Loop through all selected objects
  for (i = 0; i < objects.length; ++i) {
    const id = objects[i].getAttribute('qlik-saas-object-id')
    const theAppId = settings.appID !== '' ? settings.appID : objects[i].getAttribute('app-id');

    const url = `wss://${settings.host}/app/${theAppId}/identity/${qs_identity}/?qlik-web-integration-id=${settings.webIntegrationID}&qlik-csrf-token=${csrfToken}`;
    const schema = await ( await fetch("https://unpkg.com/enigma.js/schemas/3.2.json") ).json();
    const session = window.enigma.create({ schema, url });
    const app = await (await session.open()).openDoc(theAppId);
    
    const nuked = await window.stardust.embed(app, {
      types: [
        {
          name: "kpi",
          load: () => Promise.resolve(window["sn-kpi"])
        },
        {
          name: "scatterplot",
          load: () => Promise.resolve(window["sn-scatter-plot"])
        },
        {
          name: "distributionplot",
          load: () => Promise.resolve(window["sn-distributionplot"])
        },
        {
          name: "barchart",
          load: () => Promise.resolve(window["sn-bar-chart"])
        },
        {
          name: "linechart",
          load: () => Promise.resolve(window["sn-line-chart"])
        },
        {
          name: "table",
          load: () => Promise.resolve(window["sn-table"])
        },
        {
          name: "piechart",
          load: () => Promise.resolve(window["sn-pie-chart"])
        },
        {
          name: "sankeychart",
          load: () => Promise.resolve(window["sn-sankey-chart"])
        },
        {
          name: "funnelchart",
          load: () => Promise.resolve(window["sn-funnel-chart"])
        },
        {
          name: "mekkochart",
          load: () => Promise.resolve(window["sn-mekko-chart"])
        },
        {
          name: "gridchart",
          load: () => Promise.resolve(window["sn-grid-chart"])
        },
        {
          name: "bulletchart",
          load: () => Promise.resolve(window["sn-bullet-chart"])
        },
        {
          name: "combochart",
          load: () => Promise.resolve(window["sn-combo-chart"])
        },
      ]
    });

    // render
    if (id === 'selections') {
      (await nuked.selections()).mount(objects[i])
    } else 
    await nuked.render({
      element: objects[i],
      id,
    });
  }
  
};

initNebula();