import mongoose from "mongoose";
import Products from "../model/product.model.js";
import Supplier from "../model/supplier.model.js";
import { generateDate } from "../utils/date.util.js";

/* Crear nuevo producto */
export const newProduct = async (req, res) => {
  let body = req.body;
  let productCode = body.productCode;
  let productName = body.productName;
  let productDesc = body.productDesc;
  let productStatus = body.productStatus;
  let productProvider = body.productProvider;

  /* Verificar que exista el proveedor */
  const supplier = await Supplier.findOne({ supplier_id: productProvider });

  if (supplier !== null) {
    /* Crear Objeto del Modelo Productos */
    const product = new Products({
      product_code: productCode,
      product_name: productName,
      product_desc: productDesc,
      product_status: productStatus,
      product_provider: productProvider,
    });

    try {
      await product.save().then(() => {
        res.send({ producto: product, productoGuardado: true });
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    res.send({ mensaje: "PROVEEDOR NO ENCONTRADO" });
  }
};

/* Obtener todos los productos registrados */
export const getProducts = async (req, res) => {
  const products = await Products.find();
  return res.send({ productos: products });
};

/* Obtener un producto especifico a traves del ID */
export const getProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await Products.findOne({ product_code: productId });
  res.send({ producto: product });
};

/* Actualizar los datos de un producto en especifico */
export const updateProduct = async (req, res) => {
  const productId = req.params.id;

  let productCode = req.body.productCode;
  let productName = req.body.productName;
  let productDesc = req.body.productDesc;
  let productDate = req.body.productDate;
  let productStatus = req.body.productStatus;
  let productProvider = req.body.productProvider;

  try {
    const updatedProduct = await Products.updateOne(
      { product_code: productId },
      {
        $set: {
          product_code: productCode,
          product_name: productName,
          product_desc: productDesc,
          product_date: productDate,
          product_status: productStatus,
          product_provider: productProvider,
        },
      }
    );
    const product = await Products.findOne({
      product_code: productCode !== undefined ? productCode : productId,
    });
    res.send({ productoActualizado: product, success: "Producto Actualizado con Exito" });
  } catch (e) {
    console.log(e);
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  const deletedProduct = (await Products.deleteOne({ product_code: productId }))
    .deletedCount;

  deletedProduct === 1
    ? res.send({ mensaje: "PRODUCTO ELIMINADO" })
    : res.send({ mensaje: "PRODUCTO YA ELIMINADO" });

  // const isLogicalDeletionDone = await Products.updateOne(
  //   { product_code: productId },
  //   { $set: { is_deleted: true, deleted_at: generateDate() } }
  // );

  // isLogicalDeletionDone.modifiedCount === 1
  //   ? res.send({mensaje: "PRODUCTO ELIMINADO"})
  //   : res.send({mensaje: "OCURRIO UN ERROR"});
};
