import axios from 'axios';
let url = 'http://localhost:8080/prods';

const getProds = async () => {
  try {
    const prods = await axios.get(url);
    console.log(prods.data.prods);
  } catch (error) {
    console.log(error);
  }
};

const getProd = async (id) => {
  try {
    const prods = await axios.get(`${url}/${id}`);
    console.log(prods.data.prods);
  } catch (error) {
    console.log(error);
  }
};

const prod = {
  title: 'asjdasda',
  price: 88,
  description: ' asjdnaskdbhasbdjasbda',
  stock: 99,
};
const addProd = async () => {
  try {
    const addOne = await axios.post(url, prod);
    console.log(addOne);
  } catch (error) {
    console.log(error);
  }
};

const delProd = async (id) => {
  try {
    await axios.delete(`${url}/${id}`).then((res) => console.log(res.data));
  } catch (error) {
    console.log(error);
  }
};

const delAll = async () => {
  try {
    await axios.delete(url).then((res) => console.log(res.data));
  } catch (error) {
    console.log(error);
  }
};

const putProd = async (id, data) => {
  try {
    await axios
      .put(`${url}/${id}`, { data })
      .then((res) => console.log(res.data));
  } catch (error) {
    console.log(error);
  }
};

// getProds()
// getProd(id)
// addProd(prod)
// putProd(id, data)
// delProd(id)
// delAll()
