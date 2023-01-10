//prods controllers
import ProductsAPi from '../api/apiProds.js';

const Products = new ProductsAPi();

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    let prod = await Products.getOne(id);
    prod ? res.status(200).json({ success: true, prod }) : error;
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const getAll = async (req, res) => {
  try {
    const prods = await Products.getAll();
    res.status(200).json({ success: true, prods });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const addOne = async (req, res) => {
  try {
    const data = req.body
    if(!data)  throw new Error
    const prod = await Products.addOne(data)
    res.status(200).json({success: true, prod})
  } catch (error) {
    res.status(500).json({success: false, error})
  }
}

export const putProd = async (req, res) => {
  try {
    const {id} = req.params
    const data = req.body
    const prod = await Products.putProd(id, data)
    res.status(200).json({success: true, prod})
  } catch (error) {
    res.status(500).json({success: false})
  }
}

export const deleteOne = async (req, res) => {
  try {
    const {id} = req.params
    await Products.deleteOne(id)
    res.status(200).json({success: true, deleted: id})
  } catch (error) {
    res.status(500).json({success: false})
  }
}
export const deleteAll = async (req, res) => {
  try {
    await Products.deleteAll()
    res.status(200).json({success: true})
  } catch (error) {
    res.status(500).json({success: false})
  }
}