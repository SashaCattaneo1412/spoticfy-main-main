const conn = require("../db");

const getAlbumes = (_, res) => {
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */
        conn.query("SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artsita FROM albumes INNER JOIN artistas ON artistas.id = albumes.artista", (err, rows) => {
 
 
            if (err) {
                console.error("Error consultando: " + err);
                return;
            }
        
            res.send(rows); 
        });


};

const getAlbum = (req, res) => {
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }

    */ 
        const id = req.params.id; 
        conn.query("SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artsita FROM albumes INNER JOIN artistas ON artistas.id = albumes.artista WHERE albumes.id = ?",[id], (err, rows) => {
 
 
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
    
        res.send(rows); 
    });
        
    

};

const createAlbum = (req, res) => {
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */

        /*
         "nombre": "Album 2",
         "artista": 3
        */
        const id = req.body.artista;
        const CreateAlbum =  req.body.nombre;
        conn.query("INSERT INTO  albumes (nombre, artista) VALUES (?, ?)", [CreateAlbum, id], (err, rows) => {
            if (err) return console.error("Error consultando: " + err)
            res.send("Album creado")
        });

     
 
 
   

};

const updateAlbum = (req, res) => {
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
        const id = req.params.id;
        const updateAlbum = req.body;

        conn.query('UPDATE albumes SET nombre = ?, artista = ? WHERE id= ?', [updateAlbum.nombre,updateAlbum.artista,id] , (err, rows) => {
        if (err) return console.error("Error consultando: " + err)
        res.send("Album Actualizado")
        }
        )};

    

const deleteAlbum = (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const deleteAlbum = req.params.id;

    conn.query('DELETE FROM albumes WHERE id = ?' , [deleteAlbum], (err, rows) => {
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
    
        res.send("Album eliminado"); 
    });



};

const getCancionesByAlbum = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones


   // FALTA ACA 


    const getCancionesByAlbum= req.params.id;
    conn.query("SELECT canciones.id, canciones.nombre, artistas.id AS nombre_artista, albumes.id AS nombre_album, canciones.duracion, canciones.reproducciones  FROM canciones INNER JOIN albumes ON albumes.id = canciones.album  INNER JOIN artistas ON artistas.id = albumes.artista WHERE artistas.id = ?",[getCancionesByArtista],  (err, rows) => 
    
  {
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
        res.send(rows);
    });



};

module.exports = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};
