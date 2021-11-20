const { DataTypes } = require('sequelize')
const db = require('../database/conn.js')

const Commit = db.define('commit', {
    // Model attributes are defined here
    short_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    author_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Commit