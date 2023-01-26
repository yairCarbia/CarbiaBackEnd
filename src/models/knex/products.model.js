const setProductSchema = (table) => {
  table.increments('id');
  table.string('title');
  table.float('price');
  table.string('thumbnail');
  return table;
};

export default setProductSchema;
