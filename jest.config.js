/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': [
      'babel-jest',
      {presets: [['@babel/preset-env', {targets: {node: 'current'}}]]},
    ],
  },
};

module.exports = config;
