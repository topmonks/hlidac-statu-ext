chrome.pageAction.onClicked.addListener(function (tab) {
  chrome.runtime.sendMessage({ action: "Download" }, () =>
    fetch(new URL("nemocnice", "https://www.hlidacstatu.cz/api/v2/"), {
      method: "POST",
      body: JSON.stringify(message),
      headers: new Headers([["Content-Type", "application/json"]]),
    })
  );
});
