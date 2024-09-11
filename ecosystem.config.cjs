module.exports = {
    apps: [
      {
        name: 'Frames',
        script: './build/bin/server.js',
        instances: 'max',
        exec_mode: 'cluster',
        autorestart: true,
      },
    ],
  }
  