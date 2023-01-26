const setMsgSchema = (table) => {
  table.increments('id');
  table.string("email");
  table.string("firstName");
  table.string("lastName");
  table.integer("age");
  table.string("nickName");
  table.string("avatar");
  table.string("msg");
  table.timestamp('fyh');
  return table;
};

export default setMsgSchema;

