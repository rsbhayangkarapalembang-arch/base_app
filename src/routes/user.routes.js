const express = require('express');
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const { registerSchema, userIdSchema, updateUserSchema } = require('../validators/auth.validator');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', validate({ params: userIdSchema }), userController.getUser);
router.post('/', validate({ body: registerSchema }), userController.createUser);
router.patch('/:id', validate({ params: userIdSchema, body: updateUserSchema }), userController.updateUser);
router.delete('/:id', validate({ params: userIdSchema }), userController.deleteUser);

module.exports = router;
