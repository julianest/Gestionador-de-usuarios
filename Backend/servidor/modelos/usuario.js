const sql = require("../servicios/mysql.service");

//Creacion de clase Usuario
const Usuario = function (usuario){
  this.nombre = usuario.nombre;
  this.telefono = usuario.telefono;
  this.correo = usuario.correo;
  this.fnacimiento = usuario.fnacimiento;
}

Usuario.findAll = (queryParams, cb)=>{
  let query = `SELECT * FROM usuarios`;
  if(queryParams.hasOwnProperty('search') && queryParams.search){
    query += ` WHERE nombre LIKE '%${queryParams.search}%' OR correo LIKE '%${queryParams.search}%'`;
  }
  query += ` ORDER BY 1 LIMIT 5 OFFSET ${queryParams.hasOwnProperty('offset') &&  queryParams.offset ? queryParams.offset : 0}`
  
  console.log(query)
  sql.query(query, (err, res)=>{
      if(err){
        console.log("Err:", err);
        cb(err, null);
        return;
    }
    cb(null, res);
    });
}

Usuario.findById =(id, cb)=>{
  sql.query(`SELECT * FROM usuarios WHERE id =${id}`, (err, res)=>{
    if(err){
      console.log("Err:", err);
      cb(err, null);
      return;
      }
    cb(null, res[0]);
  })
}

Usuario.create = (usuario, cb)=>{
  sql.query(`INSERT INTO usuarios SET ?`, usuario, (err, res)=>{
    if(err){
      console.log("Err:", err);
      cb(err, null);
      return;
      }
      cb(null, {id:res.insertId});
      })
}

Usuario.update = (id, usuario, cb)=>{
  sql.query(`UPDATE usuarios SET nombre = ?, telefono = ?, correo = ?, fnacimiento =? WHERE id = ?`,
  [usuario.nombre, usuario.telefono, usuario.correo, usuario.fnacimiento, id], (err, res)=>{
    if(err){
      console.log("Err:", err);
      cb(err, null);
      return;
      }
      if(res.affectedRows == 0){
        cb({type: "not found"},null);
        return;
      }
      cb(null, {id:id, ...usuario});
      })
}

Usuario.remove = (id, cb)=>{
  sql.query(`DELETE FROM usuarios WHERE id=${id}`, (err, res)=>{
    if(err){
      console.log("Err:", err);
      cb(err, null);
      return;
      }
      cb(null, id);
      })
}

module.exports = Usuario;
