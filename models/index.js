const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack");

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    max: 64,
    notNull: true,
  },
  slug: {
    type: Sequelize.STRING,
    notNull: true,
  },
  content: {
    type: Sequelize.TEXT,
    notNull: true,
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
  },
});
Page.beforeCreate((page) => {
  page.slug = page.title.split(" ").join("_").toLowerCase();
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    max: 32,
    notNull: true,
  },
  email: {
    type: Sequelize.STRING,
    notNull: true,
    isEmail: true,
  },
});

module.exports = { db, Page, User };
