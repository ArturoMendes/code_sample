module.exports = (sequelize, DataTypes) => {
  const MasterVariable = sequelize.define(
    'MasterVariable',
    {
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: 'tbl_mast_meteo_variables',
      timestamps: false,
    }
  )

  return MasterVariable
}
