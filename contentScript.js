confirm("Hello Text")

const aTags = document.getElementsByTagName("a")
for (const tag of aTags){
    if(tag.textContent.includes("i")){
        tag.style = "background-color : yellow;"
    }
}