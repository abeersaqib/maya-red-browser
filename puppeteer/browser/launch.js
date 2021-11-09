const puppeteer = require("puppeteer-extra");

module.exports = function (RED) {
  function PuppeteerBrowserLaunch(config) {
    const BROWSER_PATH = process.env.MAYA_BROWSER_PATH;
    RED.nodes.createNode(this, config);
    this.headless = config.headless;
    this.slowMo = config.slowMo;
    this.name = config.name;
    var node = this;
    //this.log = console.log;
    node.status({
      fill: "red",
      shape: "dot",
      text: "not launched",
    });
    // Retrieve the config node
    var globalContext = this.context().global;
    async function setGlobalContextNull(){
      console.log("resetting global context");
      await globalContext.set("puppeteer", null);
      node.status({
        fill: "red",
        shape: "ring",
        text: "disconnected",
      });
    }
    async function startBrowser(globalContext, msg) {
      //let wsEndpoint = await startBrowserAndGetWsEndpoint(this.headless);

        let payload = msg.payload || {};

        let _options = {
          headless: payload.headless || false,
          args: payload.args || [],
        }


        await puppeteer.launch(_options)
        .then((browser) => {
          this.browser = browser;
          this.browser.on("disconnected", setGlobalContextNull)
          globalContext.set("puppeteer", { browser });
          node.send(msg);
          node.status({
            fill: "green",
            shape: "dot",
            text: "connected",
          });
        })
        .catch((err) => {
          console.log(err);
          node.status({
            fill: "red",
            shape: "ring",
            text: "error: " + err.toString().substring(0, 10) + "...",
          });
        });
    }
    this.on("input", async function (msg) {
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "launching",
      });
      var checkPuppeteer = globalContext.get("puppeteer");
      if (checkPuppeteer) {
        async function killBrowser(){
          checkPuppeteer.browser
          .close()
          .then(() => {
            globalContext.set("puppeteer", null);
            node.send(msg);
            node.status({
              fill: "red",
              shape: "dot",
              text:"browser disconnected"
            });
          })
          .catch(err => {
            node.status({
              fill: "red",
              shape: "ring",
              text: "error: " + err.toString().substring(0, 10) + "..."
            });
          });
        }
        checkPuppeteer.browser.on("disconnected", killBrowser);
        globalContext.set("puppeteer", { browser: checkPuppeteer.browser });
        node.send(msg);
        node.status({
          fill: "green",
          shape: "dot",
          text: "connected",
        });
    } else {
      startBrowser(globalContext, msg);
    }
    });
  oneditprepare: function oneditprepare() {
    $("#node-input-headless").val(this.headless === true ? "1" : "0");
    $("#node-input-slowMo").val(this.slowMo);
    $("#node-input-name").val(this.name);
  }
}

RED.nodes.registerType("puppeteer-browser-launch", PuppeteerBrowserLaunch);
};
