
async function updateIcon()
{
    var read_enabled = (await browser.browserSettings.useDocumentFonts.get({})).value;
    setButtonText(read_enabled);
}
function setButtonText(documentFontEnabled) {
    if (!documentFontEnabled) {
        browser.browserAction.setBadgeBackgroundColor({ color: "#00BF00" });
        browser.browserAction.setBadgeText({ text: "" });
    } else {
        browser.browserAction.setBadgeBackgroundColor({ color: "#dd0000" });
        browser.browserAction.setBadgeText({ text: "no R" });
    }
}


browser.browserAction.setBadgeTextColor({ color: "#FFFFFF" });

//var read_enabled_onload = (await browser.browserSettings.useDocumentFonts.get({})).value;
//setButtonText(read_enabled_onload);

updateIcon();

browser.browserAction.onClicked.addListener(async () => {
    var read_enabled_onclick = (await browser.browserSettings.useDocumentFonts.get({})).value;
    var set_enabled = !read_enabled_onclick ; 
    
    await browser.browserSettings.useDocumentFonts.set({ value: set_enabled });
    
    //var read_enabled_afterclick = (await browser.browserSettings.useDocumentFonts.get({})).value;
    //setButtonText(read_enabled_afterclick);
    updateIcon();
});

browser.browserSettings.useDocumentFonts.onChange.addListener(function() { 
    //console.log("browserSettings change event");
    updateIcon();
});

browser.tabs.onUpdated.addListener(function() { 
    //console.log("tabs.onUpdated  event");
    updateIcon();
});

browser.windows.onFocusChanged.addListener(function() { 
    //console.log("window focus change event");
    updateIcon();
});

