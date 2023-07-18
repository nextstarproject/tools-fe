const baseConfig = require('nsp-styling/tailwind.config.js');

module.exports = {
    ...baseConfig,
    important: false,
    theme: {
        minHeight: {
            '1/2': '50%',
        },
        colors:{
            "antColorText":"rgba(0,0,0,.88)",
            "antDarkColorText":"rgba(255, 255, 255, 0.85)"
        },
        extend: {},
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
