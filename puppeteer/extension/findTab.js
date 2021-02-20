module.exports = function (RED) {
    function MayaBrowserFindTab(config) {

      RED.nodes.createNode(this, config);
      this.url = config.url;
      this.payloadTypeUrl = config.payloadTypeUrl;
      var node = this;
  
      async function getValue(value, valueType, msg) {
        return new Promise(function (resolve, reject) {
          if (valueType === "str") {
            resolve(value);
          } else {
            RED.util.evaluateNodeProperty(value, valueType, this, msg, function (
              err,
              res
            ) {
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

      // Retrieve the config node
      this.on("input", async function (msg) {
        node.status({
          fill: "yellow",
          shape: "dot",
          text:
            "finding: " + node.url !== ""
              ? node.url.toString().substring(0, 15)
              : msg.url.toString().substring(0, 15) + "...",
        });
        var globalContext = this.context().global;
        let maya = globalContext.get("maya");
        let url = await getValue(this.url, this.payloadTypeUrl, msg);
        
        maya.browser.findTab({
            url: node.url
        })
            .then(async (result) => {
                const { data } = result.data
                await globalContext.set("maya", maya);
                msg.tabsFound = data.tabs;
                node.send(msg);
                node.status({
                    fill: "green",
                    shape: "dot",
                    text: "complete"
                })
            })
            .catch((err) => {
                node.error(err);
                node.status({
                    fill: "red",
                    shape: "ring",
                    text: `error: ${err.toString().substring(0, 10)}...`
                });
            });
      });
      oneditprepare: function oneditprepare() {
        $("#node-input-name").val(this.name);
      }
    }
    RED.nodes.registerType("maya-browser-find-tab", MayaBrowserFindTab);
  };
  