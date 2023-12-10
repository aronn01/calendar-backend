const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const {  email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Ese correo ya fue registrado, elija otro",
      });
    }
    usuario = new Usuario(req.body);
    //Como encriptar contraseña??
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    // Generar JSON Web Tokens
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el encargado",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Email no valido",
      });
    }
    //confirmar contraseñas
    const validPassord = bcrypt.compareSync(password, usuario.password);
    if (!validPassord) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña Invalida",
      });
    }
    const token = await generarJWT(usuario.id, usuario.name);
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el encargado",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req;

  const token = await generarJWT(uid, name);
  res.json({ ok: true, uid, name, token });
};

module.exports = { crearUsuario, loginUsuario, revalidarToken };