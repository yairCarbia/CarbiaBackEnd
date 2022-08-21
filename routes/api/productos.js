const router = require('express').Router();

const productos = [

];

const getById = (id) => {
    const p = productos.find(item => item.id === id);
    return p;
}

const getPosById = (id) => {
    const pos = productos.findIndex(item => item.id === id);
    return pos;
}

const getMaxId = () => {
    const ids = productos.map(item => item.id);
    if (ids.length === 0) {
        return 0;
    }
    return Math.max(...ids);
}

router.get('/', (req, res) => {
    if (productos.length === 0) {
        res.status(200).json({ error: 'producto no encontrado' });
    } else {
        res.status(200).json(productos);
    }
});

router.get('/:id', (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        res.status(400).json({ "error": "El parámetro no es un número" });
    } else {
        const id = parseInt(req.params.id);
        const maxId = getMaxId();
        if (id > maxId || id < 1) {
            res.status(400).json({ "error": "El parámetro está fuera de rango" });
        } else {
            const p = getById(id);
            if (p) {
                res.status(200).json(getById(id));
            } else {
                res.status(200).json({ error: 'producto no encontrado' });
            }
        }
    }
});

router.post('/', (req, res) => {
    if (req.body.title && req.body.price && req.body.thumbnail) {
        const id = getMaxId() + 1;
        const p = {
            "title": req.body.title,
            "price": req.body.price,
            "thumbnail": req.body.thumbnail,
            "id": id
        };
        productos.push(p);
        res.status(200).json(p);
    }

});

router.put('/:id', (req, res) => {
    let reqOk = true;
    let msgError = '';
    let errorCode = 400;
    let pos;

    if (isNaN(parseInt(req.params.id))) {
        reqOk = false;
        msgError = "El parámetro no es un número";
    } else {
        pos = getPosById(parseInt(req.params.id));
        if (pos === -1) {
            reqOk = false;
            msgError = "Producto no encontrado";
            errorCode = 200;
        } else if (!(req.body.title || req.body.price || req.body.thumbnail)) {
            reqOk = false;
            msgError = "La petición no es correcta";
        }
    }

    if (reqOk) {
        const oldProduct = productos[pos];
        const newProduct = {
            "title": req.body.title ? req.body.title : oldProduct.title,
            "price": req.body.price ? req.body.price : oldProduct.price,
            "thumbnail": req.body.thumbnail ? req.body.thumbnail : oldProduct.thumbnail,
            "id": oldProduct.id
        };
        productos[pos] = newProduct;
        res.status(200).json(newProduct);
    } else {
        res.status(errorCode).json({ "error": msgError });
    }
});

router.delete('/:id', (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        res.status(400).json({ "error": "El parámetro no es un número" });
    } else {
        const id = parseInt(req.params.id);
        const maxId = getMaxId();
        if (id > maxId || id < 1) {
            res.status(400).json({ "error": "El parámetro está fuera de rango" });
        } else {
            const pos = getPosById(id);
            if (pos !== -1) {
                const prod = getById(id);
                productos.splice(pos, 1);
                res.status(200).json({ deleted: prod });
            } else {
                res.status(200).json({ error: 'producto no encontrado' });
            }
        }
    }
});

module.exports = router;