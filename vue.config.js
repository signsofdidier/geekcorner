const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/fullstack/didier/geekcorner/', // Zorgt ervoor dat de paden relatief zijn voor hosting
})

