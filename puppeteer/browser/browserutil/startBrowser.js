
const {chrome, getWsUrl} = require("./chrome");

async function startBrowserAndGetWsEndpoint(headless){
    await chrome(headless);
    let url = await getWsUrl();
    return url.data.webSocketDebuggerUrl;
}

module.exports = {startBrowserAndGetWsEndpoint};

