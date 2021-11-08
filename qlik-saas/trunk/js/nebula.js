
const login = async () => {
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

const getCsrfTokenInfo = async () => {
  const response = await fetch(`https://${settings.host}/api/v1/csrf-token`, {
    credentials: "include",
    headers: { "qlik-web-integration-id": settings.webIntegrationID },
  });
  return response.headers.get("qlik-csrf-token");
}

const init = async () => {
  try {
    await login();
    const csrfToken = await getCsrfTokenInfo();
    
    const url = `wss://${settings.host}/app/${settings.appID}?qlik-web-integration-id=${settings.webIntegrationID}&qlik-csrf-token=${csrfToken}`;
    const schema = await ( await fetch("https://unpkg.com/enigma.js/schemas/3.2.json") ).json();
    const session = window.enigma.create({ schema, url });
    const app = await (await session.open()).openDoc(settings.appID);

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
    
    // render viz
    const kpis = document.querySelectorAll('[qlik-saas-object-id]');
    for (i = 0; i < kpis.length; ++i) {
      const id = kpis[i].getAttribute('qlik-saas-object-id')
      if (id === 'selections') {
        (await nuked.selections()).mount(kpis[i])
      } else 
      await nuked.render({
        element: kpis[i],
        id,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

init();
