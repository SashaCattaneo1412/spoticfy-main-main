const conn = require("../db");
const { updateAlbum } = require("./albumes");

const getCanciones = (_, res) => {

    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...

        ] 
    */

        conn.query("SELECT canciones.id, canciones.nombre, albumes.id AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON albumes.id = canciones.album INNER JOIN artistas ON artistas.id = albumes.artista", (err, rows) => {
 
 
            if (err) {
                console.error("Error consultando: " + err);
                return;
            }
        
            res.send(rows); 
        });



};

const getCancion = (req, res) => {
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
   
        const id = req.params.id; 
        conn.query("SELECT canciones.id, canciones.nombre, albumes.id AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON albumes.id = canciones.album INNER JOIN artistas ON artistas.id = albumes.artista WHERE albumes.id = ?",[id], (err, rows) => {
 
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
    
        res.send(rows); 
    });



};

const createCancion = (req, res) => {
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
    const id = req.body.album;
        const createCancion = req.body.nombre;
        conn.query('INSERT INTO  canciones (nombre,album, duracion) VALUES ("?", "?", "?")', [createCancion, id], (err, rows) => {
            if (err) return console.error("Error consultando: " + err)
            res.send("Cancion creada")
        });

};

const updateCancion = (req, res) => {
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)
    const id = req.params.id;
    const updateCancion = req.body;

    conn.query('UPDATE canciones SET nombre = ?, album = ?, duracion = ? WHERE id= ?', [updateCancion.nombre,updateCancion.album,updateCancion.duracion, id] , (err, rows) => {
        if (err) return console.error("Error consultando: " + err)
        res.send("Cancion Actualizada")
    })
}; 



const deleteCancion = (req, res) => {
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const deleteCancion = req.params.id;

    conn.query('DELETE FROM canciones WHERE id = ?' , [deleteCancion], (err, rows) => {
        if (err) {
            console.error("Error consultando: " + err);
            return;
        }
    
        res.send("Cancion eliminada"); 
    });


};

const reproducirCancion = (req, res) => {
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params

    const id = req.params.id
    conn.query('UPDATE canciones SET reproducciones = reproducciones + 1 WHERE id= ? ', [id] , (err, rows) => {
        if (err) return console.error("Error consultando: " + err)
        res.send("Aumenta reproduccion")
    }) 


};

module.exports = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};
