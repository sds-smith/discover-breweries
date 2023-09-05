const mongoose = require('mongoose');

let conn = null;

async function mongoConnect() {
  if (conn == null) {
    // conn = mongoose.createConnection(process.env.MONGO_URL, {
    //   serverSelectionTimeoutMS: 5000
    // });

    // await conn.asPromise();

    conn = mongoose.connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 5000
      }).then(() => mongoose);

      await conn;
  }

  return conn;
};

module.exports = {
    mongoConnect
}