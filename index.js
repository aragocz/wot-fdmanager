//UNFINISHED VERSION, DOES NOT WORK

const fs = require("fs");
const path = require("path")
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
        if(fileName === path.join(zip, "/mods/")){
            entry.autodrain();
        }
        if(fileType === "File" && fileName.startsWith(zip.split(".zip")[0]+"/mods/")){
            //entry.pipe(fs.createWriteStream(path.join(__dirname,"/mods/",fileName.split(zip.split(".zip")[0]).pop())));
        }else if(fileType === "File" && fileName.startsWith(zip.split(".zip")[0]+"/res_mods/")){
            //entry.pipe(fs.createWriteStream(__dirname+"/res_mods/"))
        }else if(fileType === "Directory" && fileName.startsWith(zip.split(".zip")[0]+"/mods/")){
            console.log(fileName/*.split(zip.split(".zip").pop())*/)
            console.log(path.join(__dirname,"/mods/",fileName.split(zip.split(".zip")[0])))
            //entry.pipe(fs.mkdirSync(__dirname+"/mods/"+fileName.split(zip.split(".zip"))))
            
        }
    });

//fs.rmSync(__dirname+"/mod/"+fs.readdirSync(__dirname+"/mod")[0]); entry.autodrain();
//fs.renameSync(__dirname+"/mod/"+fs.readdirSync(__dirname+"/mod")[0], process.env.wotPath+"/mod.zip");
