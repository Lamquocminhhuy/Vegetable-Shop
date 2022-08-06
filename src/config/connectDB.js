const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "Lamquocminhhuy123", {
  host: "db.jezplnfcoamzlxqzimek.supabase.co",
  dialect: "postgres",
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;
