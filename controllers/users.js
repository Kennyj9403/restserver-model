import { response } from 'express';

const usersGet = (req, res = response) => {
    //query params
    const { q, nombre= 'No name', apikey, page=1, limit } = req.query;
    res.json({
        "msg": "get API - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    })
};

const usersPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        "msg": "post API - controlador",
        nombre, edad
    })
};

const usersPut = (req, res = response) => {
    //segmentParams
    const {id} = req.params;

    res.json({
        "msg": "put API - controlador",
        id
    })
};

const usersDelete = (req, res = response) => {
    res.json({
        "msg": "delete API - controlador" 
    })
};

const usersPatch = (req, res = response) => {
    res.json({
        "msg": "patch API - controlador" 
    })
};

export{
    usersGet,
    usersDelete,
    usersPatch,
    usersPost,
    usersPut
}