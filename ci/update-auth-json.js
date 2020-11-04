const fs = require("fs");

try {
    console.log("updating file...");
    const relativePathToFE = "../src-fe/auth-config.json";
    const relativePathToBE = "../src-be/auth-config.json";

    const fe = require(relativePathToFE);
    const be = require(relativePathToBE);

    fe["clientId"] = process.env.CLIENT_ID;
    fe["authority"] = process.env.AUTHORITY;
    fe["redirectUri"] = process.env.REDIRECT_URI;

    be["credentials"]["tenantID"] = process.env.TENANT_ID;
    be["credentials"]["clientID"] = process.env.CLIENT_ID;
    be["credentials"]["audience"] = process.env.CLIENT_ID;

    function writeJSON(error) {
        if (error) return console.log(error);
        console.log("done");
    }

    fs.writeFile(relativePathToFE, JSON.stringify(fe), writeJSON);

    fs.writeFile(relativePathToBE, JSON.stringify(be), writeJSON);

} catch (err) {
    console.log(err);
}
