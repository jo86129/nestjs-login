module.exports = {
  apps : [{
    name: "nestjs-login",
    script: "dist/main.js",
    // cwd: __dirname,
    env: {
      NODE_ENV: "production",
    }
  }]
}