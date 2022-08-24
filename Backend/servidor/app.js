const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const Usuario = require("./modelos/usuario");

app.get("/usuarios", (req, res) => {
  Usuario.findAll(req.query, (err, data) => {
    if (err) {
      res.status(500).send(new Error(err));
    } else {
      res.send(data);
    }
  });
});

app.get("/usuarios/reportes", (req, res) => {
  Usuario.findAllReports(req.query, (err, data) => {
    if (err) {
      res.status(500).send(new Error(err));
    } else {
      res.send(data);
    }
  });
});

app.get("/usuarios/:id", (req, res) => {
  Usuario.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(new Error(err));
    } else {
      res.send(data);
    }
  });
});

app.post("/usuarios", (req, res) => {
  console.log(req.body);
  Usuario.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send(new Error(err));
    } else {
      res.send(data);
    }
  });
});

app.put("/usuarios/:id", (req, res) => {
  Usuario.update(req.params.id, req.body, (err, data) => {
    if (err) {
      res.status(500).send(new Error(err));
    } else {
      res.send(data);
    }
  });
});

app.delete("/usuarios/:id", (req, res) => {
  Usuario.remove(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send(new Error(err));
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => console.log("server app listening on port " + port));
