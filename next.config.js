/* eslint-disable */
const withPlugins = require('next-compose-plugins')
const svg = require("next-svgr")
const images = require('next-images')
const less = require('@zeit/next-less')
const css = require('@zeit/next-css')

const themeVariables = require('./styles/antd-custom.json')

const nextConfig = {
  webpack: function (config, { isServer }) {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      })
    }
    return config
  },
  lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables // make your antd custom effective
  }
}

module.exports = withPlugins(
  [
    svg,
    [
      images,
      {
        fileExtensions: ['jpg', 'jpeg', 'png', 'gif']
      }
    ],
    less,
    css
  ],
  nextConfig
)
