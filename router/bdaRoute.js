const express=require('express')
const router=express.Router();
const bdaController=require('../controllers/bdaController')

router.get('/',bdaController.find);
router.post('/',bdaController.add);
router.patch('/',bdaController.update);
router.delete('/',bdaController.remove);
module.exports=router;