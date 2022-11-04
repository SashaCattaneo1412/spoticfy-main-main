const conn = require("../db");

const getArtistas = (_, res) => {
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    
    conn.query("SELECT * FROM artistas", (err, rows) => {
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
    
        res.send(rows); 
    });
};

const getArtista = (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
   const id = req.params.id; 
        conn.query("SELECT * FROM artistas WHERE id = ?", [id], (err, rows) => {
            if (err) {
                console.error("Error consultando: " + err);
                return;
            }
        
            res.send(rows); 
        });

    };

const createArtista = (req, res) => {
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
        const newartista = req.body; 
        conn.query("INSERT INTO artistas (nombre) VALUES ('Artista 3')", [newartista], (err, rows) => {
            if (err) {
                console.error("Error consultando: " + err);
                return;
            }
        
            res.send("Artista creado"); 
        });
};

const updateArtista = (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
        const id= req.params.id;
        const updateArtist = req.body; 
        
        conn.query("UPDATE artistas SET nombre = 'Artista 2' WHERE id = ?", [id, updateArtist], (err, rows) => {
            if (err) {
                console.error("Error consultando: " + err);
                return;
            }
        
            res.send("Artista actualizado"); 
        });

      
};


const deleteArtista = (req, res) => {
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const deleteArtist = req.params;
    conn.query('DELETE FROM artistas WHERE id = "?"' , [deleteArtist], (err, rows) => {
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
    
        res.send("Artista eliminado"); 
    });




};

const getAlbumesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista 
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes

    
    const getAlbum = req.params.id;
    conn.query("SELECT albumes.id, artistas.nombre AS nombre_artista, albumes.nombre FROM albumes JOIN artistas ON artistas.id = albumes.artista WHERE artistas.id = ?", [getAlbum], (err, rows) => {
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
        res.send(rows); 
    });


};

const getCancionesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
    const getCancionesByArtista= req.params.id;
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
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};
