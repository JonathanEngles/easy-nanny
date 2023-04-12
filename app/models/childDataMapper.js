const client = require('../database')

const childDataMapper = {

    async createChildren(name, first_name, sexe, birthday, parentId, nannyId) {
    const result =  await client.query(`INSERT INTO "children" ("name", "first_name", "sexe", "birthday", "parent_id", "nanny_id") VALUES ($1, $2, $3, $4, $5, $6)`, [name, first_name, sexe, birthday, parentId, nannyId]);
    return result;
},

async modifyChildren(id, name, first_name, sexe, birthday, userId) {
    const result = await client.query(`UPDATE "children" SET "name" = $1, "first_name" = $2, "sexe" = $3, "birthday" = $4 WHERE "id" = $5 AND "parent_id" = $6`, [ name, first_name, sexe, birthday, id, userId]);

    return result;
  },

  async removeChildren(id, userId) {
  const result = await client.query(`DELETE FROM "children" WHERE "id"=$1 AND "parent_id"=$2`, [id, userId]);
  return result;
  }

}
module.exports = childDataMapper;