const {connection} = require('../db_connection');
const router = require('express').Router();

router.get('/', (req, res) => {
  const sql = "SELECT * FROM heroe";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});
router.get('/allnames', (req, res) => {
  const sql = "SELECT lastname FROM heroe";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});
router.get('/filterwcs', (req, res) => {
  const sql = "SELECT * FROM heroe WHERE firstname LIKE '%wcs%'";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});
router.get('/filtercampus', (req, res) => {
  const sql = "SELECT * FROM heroe WHERE firstname LIKE 'campus%'";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});
router.get('/filtercampus', (req, res) => {
  const sql = "SELECT * FROM heroe WHERE birthday > '2010-10-18'";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});
router.get('/allnamesasc', (req, res) => {
  const sql = "SELECT lastname FROM heroe ORDER BY ASC";
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(200).json(results);
    }
  });
});

router.post('/', (req, res) => {
  const sql = "INSERT INTO heroe SET ?";
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.status(201).json({id: results.insertId, ...req.body});
    }
  });
});

router.put('/:id', (req, res) => {
  let sql = "UPDATE heroe SET ? WHERE id=?";
  connection.query(sql, [req.body, req.params.id], (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      sql = "SELECT * FROM heroe WHERE id=?";
      connection.query(sql, req.params.id, (err, result) => {
        if (result.length === 0) {
          res.status(404).send({errorMessage: `heroe with id ${req.params.id} not found`});
        } else {
          res.status(200).json(result[0]);
        }
      });
    }
  });
});

router.put("/heroes/ishuman/:id", (req, res) => {
  const idHuman = req.params.id;
  connection.query(
    "UPDATE heroe SET is_human = !is_human WHERE id=?",
    [idHuman],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating data...");
      } else {
        res.status(200).send("Student updated successfully 🎉");
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const sql = "DELETE FROM heroe WHERE id=?";
  connection.query(sql, req.params.id, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.sendStatus(200);
    }
  });
});

router.delete('/', (req, res) => {
  const sql = "DELETE FROM heroe WHERE is_human=false";
  connection.query(sql, req.params.id, (err, results) => {
    if (err) {
      res.status(500).send({errorMessage: err.message});
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;