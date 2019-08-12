module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        'corejs': '2',
        useBuiltIns: 'usage'
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-transform-runtime',
      {
        'regenerator': true
      }
    ],
    ['import', {
      'libraryName': 'antd',
      'libraryDirectory': 'es',
      'style': true // `style: true` 会加载 less 文件
    }]
  ]
}
