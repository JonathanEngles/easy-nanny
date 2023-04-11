const client = require('../database')

const childDataMapper = {

    async createChildren(name, first_name, sexe, birthday, id) {
    const result =  await client.query(`INSERT INTO "children" ("name", "first_name", "sexe", "birthday", "parent_id") VALUES ($1, $2, $3, $4, $5)`, [name, first_name, sexe, birthday, id]);
    return result;
},

async modifyChildren(name, first_name, sexe, birthday, childId, userId) {
    const result = await client.query(`UPDATE "children" SET "name" = $1, "first_name" = $2, "sexe" = $3, "birthday" = $4 WHERE "id" = $5 AND "parent_id" = $6`, [name, first_name, sexe, birthday, childId, userId]);

    return result;
  },

  async removeChildren(childId, userId) {
  const result = await client.query(`DELETE FROM "children" WHERE "id"=$1 AND "parent_id"=$2`, [childId, userId]);
  return result;
  }

}
module.exports = childDataMapper;