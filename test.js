const axios = require("axios")
const fs = require("fs")
const { JSDOM } = require("jsdom")
const path = require("path")

axios.get("https://www.frost-zone.eu/fdmod/").then((res) => {
    const doc = new JSDOM(res.data);
    const link = doc.window.document.querySelector("div.vc_btn3-container a.vc_btn3").href

    axios({
        method: "get",
        url: link,
        responseType: "stream"
    }).then((res) => {
        res.data.pipe(fs.createWriteStream("./mod/"+link.split("/").pop()))
    })
});

console.log(fs.readdirSync(path.join(__dirname + "/mod")))