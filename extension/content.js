chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action !== "Download") return;

  let resp = await fetch("/prehled/api/regions", {
    credentials: "include",
    referrerPolicy: "origin",
    headers: new Headers([["Accept", "application/json"]]),
  });

  if (!resp.ok) return;
  let data = await resp.json();

  console.group("Hlídač Státu");
  console.log(data)
  console.groupEnd();

  return sendResponse(data);
});
