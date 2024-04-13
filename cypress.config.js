const { defineConfig, cli} = require('cypress')
const { Client } = require('pg')

module.exports = defineConfig({
  e2e: {
    // Configure your E2E tests here
    baseUrl:"https://pushing-it.vercel.app",
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    setupNodeEvents(on, config) {
      on("task", {
            async connectDB(query) {
              const client = new Client({
                user: "pushingit",
                password: "E6gcqTtuRGliO02Wg3Gs8fqyQNK1fLjE",
                host: "dpg-cngrs0da73kc73c91170-a.oregon-postgres.render.com",
                database: "pushingit_j4z6",
                ssl: true,
                port: 5432
              })
              await client.connect()
              const res = await  client.query(query)
              await client.end()
              return res.rows;

            }

          }
      )
    }
  },
   env:{
     usuario: "pushingit",
     password:"123456!",
     token: '',
     sellId:''
   }


})