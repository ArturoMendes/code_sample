module.exports = (app) => {
  const Station = app.db.sequelize.models.Station

  app.get('/station', (req, res) => {
    // TODO: query parameters
    let id = req.query.id

    if (id) {
      if (Number(id)) {
        Station.findByPk(id)
          .then((station) => res.status(200).send(station))
          .catch((err) => res.status(500).send(err.json()))
      } else {
        res.sendStatus(412)
      }
    } else {
      Station.findAll()
        .then((stations) => {
          res.status(200).send(stations)
        })
        .catch((err) => res.status(500).send(err.json()))
    }
  })
}
