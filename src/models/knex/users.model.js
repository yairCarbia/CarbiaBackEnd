const setUserSchema = (table) => {
  table.increments('id');
  table.string('email').unique().notNullable();
  table.string('password').notNullable();
  return table;
};

export default setUserSchema;