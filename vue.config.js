const { preserveFunctionNamesWithTerser } = require('typesafe-vuex/helpers')

module.exports = {
  lintOnSave: true,
  configureWebpack: (config) => {
    preserveFunctionNamesWithTerser(config)
  }
}
