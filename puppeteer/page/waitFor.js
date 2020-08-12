module.exports = function (RED) {
  function PuppeteerPageWaitFor(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.payloadTypeSelector = config.payloadTypeSelector;
    this.timeout = config.timeout;
    var node = this;

    // Retrieve the config node
    this.on("input", async function (msg) {
      var data = msg.data;
      node.status({
        fill: "yellow",
        shape: "dot",
        text: "finding: " + node.selector.toString().substring(0, 10) + "..."
      });
      var globalContext = this.context().global;
      let puppeteer = globalContext.get("puppeteer");
      async function getValue(value, valueType, msg) {
        return new Promise(function (resolve, reject) {
          if (valueType === "str") {
            resolve(value);
          } else {
            RED.util.evaluateNodeProperty(value, valueType, this, msg,
              function (err, res) {
                if (err) {
                  node.error(err.msg);
                  reject(err.msg);
                } else {
                  resolve(res);
                }
              });
          }
        });
      }
      let selector = await getValue(this.selector, this.payloadTypeSelector, msg);
      puppeteer.page
        .waitFor(selector, { timeout: this.timeout })
        .then(() => {
          globalContext.set("puppeteer", puppeteer);
          node.send([msg, null]);
          node.status({});
        })
        .catch(err => {
          node.status({
            fill: "red",
            shape: "ring",
            text: "error: " + err.toString().substring(0, 10) + "..."
          });
          node.send([null, msg]);
        });
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name);
    }
  }
  RED.nodes.registerType("puppeteer-page-waitFor", PuppeteerPageWaitFor);
};
