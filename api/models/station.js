module.exports = (sequelize, DataTypes) => {
  const Station = sequelize.define(
    'Station',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: 'tbl_mast_meteo_stations',
      timestamps: false,
    }
  )

  return Station
}
