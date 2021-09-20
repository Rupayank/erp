const express=require('express')
const router=express.Router()
const mainController=require('../controllers/mainController')

router.get('/',mainController.find)
router.get('/emp',mainController.findParticular)
router.post('/',mainController.addDetails)
module.exports=router;