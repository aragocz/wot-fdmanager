const fs = require("fs");
const path = require("path")
const unzip = require("unzipper");

require('dotenv').config({
    path:  __dirname+'/.env'
});

const zipname = fs.readdirSync(path.join(__dirname, "/mod/"))[0].split(".zip")[0] + "\\";

if(fs.existsSync(path.join(process.env.wotPath, "/mods")))fs.rmSync(path.join(process.env.wotPath, "/mods"), {recursive:true})
if(fs.existsSync(path.join(process.env.wotPath, "/res_mods")))fs.rmSync(path.join(process.env.wotPath, "/res_mods"), {recursive:true})

fs.createReadStream(path.join(__dirname, "/mod/", fs.readdirSync(path.join(__dirname,"/mod/"))[0])).pipe(unzip.Extract({path: path.join(__dirname,"/modextracted")}))
    .once("close", (e) => {
        fs.renameSync(path.join(__dirname, "/modextracted/", zipname, "mods"), path.join(process.env.wotPath, "/mods"));
        fs.renameSync(path.join(__dirname, "/modextracted/", zipname, "res_mods"), path.join(process.env.wotPath, "/res_mods"));
    })
    .once("close", (e) => {
        fs.rmSync(path.join(__dirname+"/mod/", fs.readdirSync(__dirname+"/mod")[0]));
        fs.rmSync(path.join(__dirname+"/modextracted/", fs.readdirSync(__dirname+"/modextracted")[0]), {recursive: true});
    })


