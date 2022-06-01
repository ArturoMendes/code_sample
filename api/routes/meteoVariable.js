module.exports = (app) => {
  const MasterVariable = app.db.sequelize.models.MasterVariable

  app.get('/meteo-variable', (req, res) => {
    MasterVariable.findAll()
      .then((variables) => {
        res.status(200).send(variables)
      })
      .catch((err) => res.status(500).send(err.json()))
  })
}
