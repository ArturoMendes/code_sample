const { Sequelize, DataTypes } = require('sequelize')
const path = require('path')
const fs = require('fs')

let db = null

module.exports = app => {
  if (!db) {
    const config = app.libs.config

    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        host: config.host,
        dialect: config.dialect
      }
    )

    db = {
      sequelize: sequelize
    }

    const modelsDir = path.join(__dirname, 'models')

    fs.readdirSync(modelsDir).forEach(model => {
      const modelFile = path.join(modelsDir, model)
      require(modelFile)(sequelize, DataTypes)
    })
  }

  return db
}
