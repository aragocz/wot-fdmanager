const fs = require("fs");
const unzip = require("unzipper");

require('dotenv').config({
    path:  __dirname+'/.env'
});

fs.createReadStream(__dirname+"/mod/"+fs.readdirSync(__dirname+"/mod")[0]).pipe(unzip.Extract({path: __dirname+"/modextracted/"}));

//fs.rmSync(__dirname+"/mod/"+fs.readdirSync(__dirname+"/mod")[0]);
//fs.renameSync(__dirname+"/mod/"+fs.readdirSync(__dirname+"/mod")[0], process.env.wotPath+"/mod.zip");
