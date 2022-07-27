import dbManager from "./src/db-manager";


dbManager.then(db => db.users.updateMany({}, {$set: {step: ''}}))