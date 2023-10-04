export function up (knex) {
    return knex.schema.table('wombles', function (table) {
      table.integer('rubbish_id')
    })
  }
  
  export function down(knex) {
    return knex.schema.table('wombles', function (table) {
      table.dropColumn('rubbish_id')
    })
  }
  