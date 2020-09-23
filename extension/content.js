chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action !== "Download") return;

  try {
    console.group("Hlídač Státu");
    if (location.toString() === "https://dip.mzcr.cz/dip-prihlaseni") {
      console.warn("Nejste přihlášeni");
      return;
    }

    const resp = await fetch("/prehled/api/regions", {
      mode: "same-origin",
      credentials: "same-origin",
      referrerPolicy: "same-origin",
      headers: new Headers([["Accept", "application/json"]]),
    });

    if (!resp.ok) {
      console.warn("Dotaz se nezdařil");
      return;
    }
    const data = await resp.json();

    console.log("Posíláte nám následující data:");
    console.log(data);
    console.log("Děkujeme");

    return sendResponse(data);
  } catch (err) {
    console.error(err);
  } finally {
    console.groupEnd();
  }
});
