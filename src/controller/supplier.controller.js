import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Supplier from "../model/supplier.model.js";
import Product from "../model/product.model.js";

import { generateDate } from "../utils/date.util.js";

/* Crear nuevo proveedor */
export const newSupplier = async (req, res) => {
  const body = req.body;
  let supplierId = body.supplierId;
  let supplierFName = body.supplierFName;
  let supplierLName = body.supplierLName;
  let supplierComName = body.supplierComName;
  let supplierPhone = body.supplierPhone;
  let supplierEmail = body.supplierEmail;

  /* Crear Objeto del Modelo Proveedores */
  const supplier = new Supplier({
    supplier_id: supplierId,
    supplier_fname: supplierFName,
    supplier_lname: supplierLName,
    supplier_com_name: supplierComName,
    supplier_phone: supplierPhone,
    supplier_email: supplierEmail,
  });

  try {
    await supplier.save().then(() => {
      res.send({ proveedor: supplier });
    });
  } catch (e) {
    console.log(e);
  }
};

/* Obtener todos los proveedores registrados */
export const getSuppliers = async (req, res) => {
  const supplier = await Supplier.find();
  res.send({ proveedores: supplier });
};

/* Obtener un proveedor especifico a traves del ID */
export const getSupplier = async (req, res) => {
  const supplierId = req.params.id;
  const supplier = await Supplier.findOne({ supplier_id: supplierId });
  res.send({ proveedor: supplier });
};

/* Actualizar los datos de un proveedor en especifico */
export const updateSupplier = async (req, res) => {
  const supplierUriId = req.params.id;

  let supplierId = req.body.supplierId;
  let supplierFName = req.body.supplierFName;
  let supplierLName = req.body.supplierLName;
  let supplierComName = req.body.supplierComName;
  let supplierPhone = req.body.supplierPhone;
  let supplierEmail = req.body.supplierEmail;

  try {
    const updatedSupplier = await Supplier.updateOne(
      { supplier_id: supplierUriId },
      {
        $set: {
          supplier_id: supplierId,
          supplier_fname: supplierFName,
          supplier_lname: supplierLName,
          supplier_com_name: supplierComName,
          supplier_phone: supplierPhone,
          supplier_email: supplierEmail,
        },
      }
    );
    const supplier = await Supplier.findOne({
      supplier_id: supplierId !== undefined ? supplierId : supplierUriId,
    });
    res.send({ proveedorActualizado: supplier });
  } catch (e) {
    console.log(e);
  }
};

/* Borrar un proveedor en especico a traves del ID */
export const deleteSupplier = async (req, res) => {
  const supplierId = req.params.id;

  /* Verificar que el Proveedor no tenga productos */
  const products = await Product.find({
    product_provider: supplierId,
  });

  const deletedProducts = await Product.find({
    // Obtener productos eliminados
    product_provider: supplierId,
    is_deleted: true,
  });

  if (products.length === deletedProducts.length) {
    const deletedSupplier = (
      await Supplier.deleteOne({ supplier_id: supplierId })
    ).deletedCount;

    deletedSupplier === 1
      ? res.send({ mensaje: "PROVEEDOR ELIMINADO" })
      : res.send({ mensaje: "PROVEEDOR YA ELIMINADO" });
  } else {
    return res.send({ mensaje: "AUN TIENE PRODUCTOS ACTIVOS" });
  }
};
