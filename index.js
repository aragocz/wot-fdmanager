const fs = require("fs");
const unzip = require("unzipper");

require('dotenv').config({
    path:  __dirname+'/.env'
});

const zip = fs.readdirSync(__dirname+"/mod")[0];
//fs.createReadStream(__dirname+"/mod/"+fs.readdirSync(__dirname+"/mod")[0]).pipe(unzip.Extract({path: __dirname+"/modextracted/"}));
fs.createReadStream(__dirname+"/mod/"+zip)
    .pipe(unzip.Parse())
    .on("entry", (entry) => {
        const fileName = entry.path;
        const fileType = entry.type;
        //entry.pipe(fs.createWriteStream(__dirname+"/modsextracted"))
        if(fileType === "File" && fileName.startsWith(zip.split(".zip")[0]+"/mods/")){
            entry.pipe(fs.createWriteStream(__dirname+"/mods/"+fileName.split(zip.split(".zip")[0]+"/mods/").pop()));
        }else if(fileType === "File" && fileName.startsWith(zip.split(".zip")[0]+"/res_mods/")){
            entry.pipe(fs.createWriteStream(__dirname+"/res_mods/"))
        }else entry.autodrain();
    });

//fs.rmSync(__dirname+"/mod/"+fs.readdirSync(__dirname+"/mod")[0]);
//fs.renameSync(__dirname+"/mod/"+fs.readdirSync(__dirname+"/mod")[0], process.env.wotPath+"/mod.zip");
