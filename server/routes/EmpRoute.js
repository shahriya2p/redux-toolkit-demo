const { Router } = require('express');

const router = Router();

const { getEmployee, register, deleteEmployee, updateEmployee } = require('../controllers/empController');

router.get('/', getEmployee);
router.post('/', register);
router.delete('/:id', deleteEmployee);
router.patch('/:id', updateEmployee);

module.exports = router;
