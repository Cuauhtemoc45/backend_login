import { Router } from "express";
import {
  newProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

import { validateToken } from "../validator/token.validator.js";

const router = Router();

// router.use(validateToken);

router.get("/", validateToken, getProducts);
router.get("/:id", validateToken, getProduct);
router.post("/", validateToken, newProduct);
router.put("/:id", validateToken, updateProduct);
router.delete("/:id", validateToken, deleteProduct);

export default router;
