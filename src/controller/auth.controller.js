import mongoose from "mongoose";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const tokenExpirationTime = 86400000;

export const register = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let phone = req.body.phone;
  let firstName = req.body.firstname;
  let lastName = req.body.lastname;
  let email = req.body.email;
  let gender = req.body.gender;
  let birthdate = req.body.birthdate;
  let age = req.body.age;

  const passHash = await bcrypt.hash(password, 10);

  const user = new User({
    username: username,
    password: passHash,
    phone: phone,
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: gender,
    fechaNacimiento: birthdate,
    edad: age,
  });

  await user.save().then(
    () => {
      jwt.sign(
        { id: user.username, phone: user.phone, email: user.email },
        "utd123",
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            console.log(err);
          } else {
            res.cookie("token", token, {
              httpOnly: true,
              maxAge: tokenExpirationTime,
            });
            res.send({ token });
          }
        }
      );
    },
    () => {
      res.send({ nuevoUsuario: false });
    }
  );
};

export const login = async (req, res) => {
  const [username, password] = [req.body.username, req.body.password];

  const user = await User.findOne({ username: username });

  if (user) {
    await bcrypt.compare(password, user.password).then((isCorrectPassword) => {
      isCorrectPassword
        ? jwt.sign(
            { username: user.username, pass: user.password },
            "utd123",
            {
              expiresIn: "1d",
            },
            (err, token) => {
              if (!err) {
                res.cookie("token", token, {
                  httpOnly: true,
                  maxAge: tokenExpirationTime,
                });
                res.send({ token });
              } else {
                console.log(err);
              }
            }
          )
        : res.send({ mensaje: "Verifica tu Contraseña" });
    })
  } else {
    res.send({mensaje: "Usuario no Encontrado"})
  }

};

export const logout = async (req, res) => {
  const cookieToken = req.cookies.token;

  if (cookieToken) {
    res.clearCookie("token", { httpOnly: true, maxAge: 0 });
    res.send({ mensaje: "SESION FINALIZADA CON EXITO" });
  } else {
    res.send({ mensaje: "NO EXISTEN TOKENS" });
  }
};
