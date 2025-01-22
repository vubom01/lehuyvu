import express from "express";
import {create, deleteResource, detail, list, update} from "../controller/resourceController";

const router = express.Router();

router.post('/', create)
router.get("/", list);
router.get('/:id', detail)
router.put('/:id', update)
router.delete('/:id', deleteResource)

export default router;