/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

 require('dotenv').config();
 const path = require("path");
 
 const {
   DATABASE_URL = "postgres://cnftpmbx:rQz0GP90gD69VTRIt7ziQS6Tk3CmIGjB@heffalump.db.elephantsql.com/cnftpmbx",
   DATABASE_URL_DEVELOPMENT = "postgres://cysbvbcq:mE2tqaVLxT7STm6U2hABW9Z--h7mumq5@heffalump.db.elephantsql.com/cysbvbcq",
   DATABASE_URL_TEST = "postgres://fumdhplh:76CqEhQI6WXs4-RLkE3s0Ky0WLGMR75q@heffalump.db.elephantsql.com/fumdhplh",
   DATABASE_URL_PREVIEW = "postgres://zdmzrhdi:b7LhUG76AsdxN9e__wvZEETDQ1rjnZBK@heffalump.db.elephantsql.com/zdmzrhdi",
   DEBUG,
 } = process.env;
 
 module.exports = {
   development: {
     client: "postgresql",
     pool: { min: 1, max: 5 },
     connection: DATABASE_URL_DEVELOPMENT,
     migrations: {
       directory: path.join(__dirname, "src", "db", "migrations"),
     },
     seeds: {
       directory: path.join(__dirname, "src", "db", "seeds"),
     },
     debug: !!DEBUG,
   },
   test: {
     client: "postgresql",
     pool: { min: 1, max: 5 },
     connection: DATABASE_URL_TEST,
     migrations: {
       directory: path.join(__dirname, "src", "db", "migrations"),
     },
     seeds: {
       directory: path.join(__dirname, "src", "db", "seeds"),
     },
     debug: !!DEBUG,
   },
   preview: {
     client: "postgresql",
     pool: { min: 1, max: 5 },
     connection: DATABASE_URL_PREVIEW,
     migrations: {
       directory: path.join(__dirname, "src", "db", "migrations"),
     },
     seeds: {
       directory: path.join(__dirname, "src", "db", "seeds"),
     },
     debug: !!DEBUG,
   },
   production: {
     client: "postgresql",
     pool: { min: 1, max: 5 },
     connection: DATABASE_URL,
     migrations: {
       directory: path.join(__dirname, "src", "db", "migrations"),
     },
     seeds: {
       directory: path.join(__dirname, "src", "db", "seeds"),
     },
     debug: !!DEBUG,
   },
 };