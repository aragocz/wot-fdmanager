const fs = require("fs");
const path = require("path")
const unzip = require("unzipper");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const execdirname = path.dirname(process.execPath);

require('dotenv').config({
    path: path.join(execdirname, '/.env')
});

axios.get("https://www.frost-zone.eu/fdmod/").then((res) => {
    const doc = new JSDOM(res.data);
    const link = doc.window.document.querySelector("div.vc_btn3-container a.vc_btn3").href

    axios({
        method: "get",
        url: link,
        responseType: "stream"
    }).then((res) => {
        res.data.pipe(fs.createWriteStream(path.join(execdirname, "/mod/")+link.split("/").pop()))
            .once("close", (e) => extractAndParse())
    })
});

function extractAndParse(){

    const zipname = fs.readdirSync(path.join(execdirname, "/mod/"))[0].split(".zip")[0] + "\\";

    if(fs.existsSync(path.join(process.env.wotPath || "C:\Games\World_of_Tanks_EU", "/mods")))fs.rmSync(path.join(process.env.wotPath || "C:\Games\World_of_Tanks_EU", "/mods"), {recursive:true})
    if(fs.existsSync(path.join(process.env.wotPath || "C:\Games\World_of_Tanks_EU", "/res_mods")))fs.rmSync(path.join(process.env.wotPath || "C:\Games\World_of_Tanks_EU", "/res_mods"), {recursive:true})

    fs.createReadStream(path.join(execdirname, "/mod/", fs.readdirSync(path.join(execdirname,"/mod/"))[0])).pipe(unzip.Extract({path: path.join(execdirname,"/modextracted")}))
        .once("close", (e) => {
            fs.renameSync(path.join(execdirname, "/modextracted/", zipname, "mods"), path.join(process.env.wotPath || "C:\Games\World_of_Tanks_EU", "/mods"));
            fs.renameSync(path.join(execdirname, "/modextracted/", zipname, "res_mods"), path.join(process.env.wotPath || "C:\Games\World_of_Tanks_EU", "/res_mods"));
        })
        .once("close", (e) => {
            fs.rmSync(path.join(execdirname+"/mod/", fs.readdirSync(path.join(execdirname, "/mod"))[0]));
            fs.rmSync(path.join(execdirname+"/modextracted/", fs.readdirSync(path.join(execdirname, "/modextracted"))[0]), {recursive: true});
        })
}