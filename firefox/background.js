let currentTab;

function remark() {
  console.log("https://remark.itsmethemojo.eu/?remark=" + encodeURIComponent(currentTab.url))
  browser.tabs.create({
    "url": "https://remark.itsmethemojo.eu/?remark=" + encodeURIComponent(currentTab.url)
  });
}

browser.browserAction.onClicked.addListener(remark);

/*
 * Switches currentTab and currentBookmark to reflect the currently active tab
 */
function updateAddonStateForActiveTab(tabs) {

  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
       } else {
        console.log('Looks like the current tab url can not be used for reMARK')
      }
  }

  let gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}

// listen to tab URL changes
browser.tabs.onUpdated.addListener(updateAddonStateForActiveTab);

// listen to tab switching
browser.tabs.onActivated.addListener(updateAddonStateForActiveTab);

// listen for window switching
browser.windows.onFocusChanged.addListener(updateAddonStateForActiveTab);

// update when the extension loads initially
updateAddonStateForActiveTab();