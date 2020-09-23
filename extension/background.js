const apiV2 = new URL("https://www.hlidacstatu.cz/api/v2/");

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tab.sendMessage(tab.id, { action: "Download" }, async (message) => {
    console.group("Hlídač Státu");
    console.log("Got response", message);
    try {
      const resp = await fetch(new URL("nemocnice", apiV2), {
        method: "POST",
        body: JSON.stringify(message),
        headers: new Headers([["Content-Type", "application/json"]]),
      });
      if (!resp.ok) {
        console.warn("Sending failed", resp.statusText);
      } else {
        console.log("All done", resp.statusText);
      }
    } catch (err) {
      console.error(err);
    } finally {
      console.groupEnd();
    }
  });
});
