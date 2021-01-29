module.exports = function(sequelize, DataTypes) {
    return sequelize.define('agendas', {
      age_codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement : true,
        primaryKey: true
      },
      age_nombre: {
        type: DataTypes.STRING,
        allowNull: true
      },
      age_telefono: {
        type: DataTypes.STRING,
        allowNull: true
      },
      age_direccion: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'agendas',
      timestamps : false
    });
  };
  