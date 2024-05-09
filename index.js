const fs = require("fs");
const path = require("path")
const unzip = require("unzipper");
const execdirname = path.dirname(process.execPath);

require('dotenv').config({
    path:  execdirname+'/.env'
});

const zipname = fs.readdirSync(path.join(execdirname, "/mod/"))[0].split(".zip")[0] + "\\";

if(fs.existsSync(path.join(process.env.wotPath, "/mods")))fs.rmSync(path.join(process.env.wotPath, "/mods"), {recursive:true})
if(fs.existsSync(path.join(process.env.wotPath, "/res_mods")))fs.rmSync(path.join(process.env.wotPath, "/res_mods"), {recursive:true})

fs.createReadStream(path.join(execdirname, "/mod/", fs.readdirSync(path.join(execdirname,"/mod/"))[0])).pipe(unzip.Extract({path: path.join(execdirname,"/modextracted")}))
    .once("close", (e) => {
        fs.renameSync(path.join(execdirname, "/modextracted/", zipname, "mods"), path.join(process.env.wotPath, "/mods"));
        fs.renameSync(path.join(execdirname, "/modextracted/", zipname, "res_mods"), path.join(process.env.wotPath, "/res_mods"));
    })
    .once("close", (e) => {
        fs.rmSync(path.join(execdirname+"/mod/", fs.readdirSync(execdirname+"/mod")[0]));
        fs.rmSync(path.join(execdirname+"/modextracted/", fs.readdirSync(execdirname+"/modextracted")[0]), {recursive: true});
    })


