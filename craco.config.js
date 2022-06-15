
const path = require('path')
const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            '@': path.resolve(__dirname, 'src'),
            '@scss': path.resolve(__dirname, 'src', 'assets', 'styles')
        },
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                customizeTheme: {
                    '@primary-color': '#0c948A',
                },
            },
        },
    ],
}