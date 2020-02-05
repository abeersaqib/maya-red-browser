module.exports = function(RED) {
  function PuppeteerPageFocus(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    var node = this;

    // Retrieve the config node
    this.on("input", function(msg) {
      node.status({
        fill: "yellow",
        shape: "dot",
        text:
          "focusing on: " + node.selector.toString().substring(0, 10) + "..."
      });
      msg.puppeteer.page
        .focus(node.selector)
        .then(() => {
          node.send(msg);
          node.status({});
        })
        .catch(err => {
          node.error(err);
          node.status({
            fill: "red",
            shape: "ring",
            text: "error: " + err.toString().substring(0, 10) + "..."
          });
        });
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name);
    }
  }
  RED.nodes.registerType("puppeteer-page-focus", PuppeteerPageFocus);
};
