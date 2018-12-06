/**
 * @author wuaixiaoyao
 * @date 2018/12/5
 * @Description: postcss.config
*/

module.exports = {
    "plugins": [
        require('postcss-flexbugs-fixes'),
        require("autoprefixer")({
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
        }),
        require("postcss-aspect-ratio-mini"),
        require("postcss-write-svg")({ utf8: false }),
        require("postcss-cssnext"),
        require("postcss-px-to-viewport")({
            viewportWidth:375,
            viewportHeight:667,
            unitPrecision: 3,
            viewportUnit: 'vw',
            selectorBlackList: ['.ignore', '.hairlines'],
            minPixelValue: 1,
            mediaQuery: false
        }),
        require("postcss-viewport-units"),
        require("cssnano")({
            preset: "advanced",
            autoprefixer: false,
            "postcss-zindex": false
        }),
        require("postcss-cssnext")({
            features: {
                autoprefixer: false,
            }
        })

    ]
}
