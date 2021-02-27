module.exports = {
    "devServer": {
      "port": 8080,
      "proxy": {
        "/api": {
          "target": "http://localhost:9999",
          "changeOrigin": true
        }
      }
    }
  }