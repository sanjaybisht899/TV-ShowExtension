chrome.runtime.onInstalled.addListener((details) =>{
    chrome.storage.local.set({
        shows: [],
    })
    chrome.contextMenus.create({
        title: "TV Search",
        id: "contextMenu1",
        contexts: ["page","selection"]
    })
    chrome.contextMenus.create({
        title: "Voice",
        id: "contextMenu2",
        contexts: ["page","selection"]
    })
    chrome.contextMenus.onClicked.addListener((event) =>{

        if(event.menuItemId === "contextMenu1"){
            fetch(`https://api.tvmaze.com/search/shows?q=${event.selectionText}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                chrome.storage.local.set({
                    shows: data,
                })
            })
        }
        else {
            // event.menuItemId === "contextMenu2"
            chrome.tts.speak(event.selectionText,{
                'lang': 'en-IN',
                 'rate': 1.0,
            }
                )
        }
        
    })
    
})

chrome.runtime.onMessage.addListener((msg,sender,sendResponse) =>{
    console.log(msg)
    console.log(sender)
    sendResponse("recieved message from background")
    chrome.tabs.sendMessage(sender.tab.id, "Got your message from background")
})