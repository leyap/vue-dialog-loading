module.exports = {
    outputDir: 'demo',
    productionSourceMap: false,
    css: {
        extract: false
    },
    configureWebpack: {
        output: {
            libraryExport: 'default'
        }
    }
}
