const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const statusController = require('../controllers/statusController')

const auth = require('../middlewares/auth')
const { catchErrors } = require('../handlers/errorHandler')

// User Authentication
router.post('/register', catchErrors(userController.register))
router.post('/login', catchErrors(userController.login))

router.get('/checkauth', auth,  (req, res) => {
    res.json({
        status: 'ok',
        message: "Authenticated."
    })
})
router.get('/logout', catchErrors(userController.logout))

// Status
router.get("/status", auth, catchErrors(statusController.getStatus));
router.post("/status", auth, catchErrors(statusController.addStatus));
router.delete("/status/:id", auth, catchErrors(statusController.deleteStatus));

module.exports = router;