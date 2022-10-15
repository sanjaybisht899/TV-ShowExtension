chrome.runtime.onInstalled.addListener((details) =>{
    chrome.contextMenus.create({
        title: "Test context menu",
        id: "contextMenu1",
        contexts: ["page","selection"]
    })
    chrome.contextMenus.onClicked.addListener((event) =>{
        console.log(event)
        chrome.tabs.create({
            url: `https://www.imdb.com/find?q=${event.selectionText}`
        })
    })
})

chrome.runtime.onMessage.addListener((msg,sender,sendResponse) =>{
    console.log(msg)
    console.log(sender)
    sendResponse("recieved message from background")
    chrome.tabs.sendMessage(sender.tab.id, "Got your message from background")
})