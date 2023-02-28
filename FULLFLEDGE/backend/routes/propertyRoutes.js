import express from "express";
import {createProperty,deleteProperty,getAllProperties,getPropertyDetail,updateProperty} from '../controllers/propertyController.js'


const router = express.Router()

router.route('/').get(getAllProperties)
router.route('/:id').get(getPropertyDetail)
router.route('/').get(createProperty)
router.route('/:id').get(updateProperty)
router.route('/:id').get(deleteProperty)

export default router