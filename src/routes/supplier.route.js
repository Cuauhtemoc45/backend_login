import { Router } from "express";
import {
  deleteSupplier,
  getSupplier,
  getSuppliers,
  newSupplier,
  updateSupplier,
} from "../controller/supplier.controller.js";
import { validateToken } from "../validator/token.validator.js";

const router = Router();

router.use(validateToken);

router.get("/", validateToken, getSuppliers);
router.get("/:id", validateToken, getSupplier);
router.post("/", validateToken, newSupplier);
router.put("/:id", validateToken, updateSupplier);
router.delete("/:id", validateToken, deleteSupplier);

export default router;
