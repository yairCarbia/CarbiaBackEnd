import ProductosApi from '../api/productosApi.js';

const apiProds = new ProductosApi();

export const getAll = async (req, res) => {
  try {
    let prods = await apiProds.getAll();
    res.status(200).json({ prods });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    let prod = await apiProds.getOne(id);
    res.status(200).json({ prod });
  } catch (error) {
    res.status(500).json({ success: false, err });
  }
};

export const addProd = async (req, res) => {
  try {
    const data = req.body;
    const newProd = await apiProds.addProd(data);
    res.status(200).json({ prod: newProd });
  } catch (error) {
    res.status(500).json({ success: false, err });
  }
};

export const updateProd = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedProd = await apiProds.updateProd(id, data);
    res.status(200).json({ prod: updatedProd });
  } catch (error) {
    res.status(500).json({ success: false, err });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await apiProds.deleteOne(id);
    res.status(200).json({ message: `product id ${id} deleted` });
  } catch (error) {
    res.status(500).json({ success: false, err });
  }
};

export const deleteAll = async (req, res) => {
  try {
    await apiProds.deleteAll()
    res.status(200).json({success: true})
  } catch (error) {
    res.status(500).json({ success: false, err });
    
  }
};
