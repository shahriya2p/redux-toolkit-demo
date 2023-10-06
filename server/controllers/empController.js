const Employee = require('../models/employee').emp;

exports.getEmployee = (req, res) => {
    Employee.find({ isDelete: false }).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.send(err);
  });
};

exports.register = (req, res) => {
  const emp = new Employee({
    name: req.body.name,
    password: req.body.password,
    degree: req.body.degree,
  });
  emp.save().then((data) => {
    res.send(data);
  }).catch((error) => {
    res.send(error);
  });
};

exports.deleteEmployee = (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, { isDelete: true }).then((emp) => {
    if (!emp) {
      res.status(404).send();
    }
    res.send({ emp });
  }, (e) => {
    res.status(404).send();
  }).catch((e) => {
    res.status(404).send();
  });
};

exports.updateEmployee = (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, req.body).then((emp) => {
        if (!Employee) {
            res.status(404).send();
        }
        res.send({ emp });
    }, (e) => {
        res.status(404).send();
    }).catch((e) => {
        res.status(404).send();
    });
};