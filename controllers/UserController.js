const db = require("../config/db");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  // register
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      // check email
      const checkEmail = await db.query(
        `SELECT (email) FROM public."Users" WHERE email = $1`,
        [email]
      );

      if (checkEmail.rows[0]) {
        throw {
          code: 400,
          message: "Email already used!",
        };
      }

      const data = await db.query(
        `INSERT INTO public."Users" (email, password) VALUES ($1,$2) RETURNING id, email`,
        [email, hashPassword(password)]
      );

      res.status(201).json({
        id: data.rows[0].id,
        email: data.rows[0].email,
      });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      // check data
      const data = await db.query(
        `SELECT * FROM public."Users" WHERE email = $1`,
        [email]
      );

      // jika gagal kembalikan response 401
      if (!data.rows[0] || !comparePassword(password, data.rows[0].password)) {
        throw {
          code: 401,
          message: "Email or password invalid!",
        };
      }

      // generate token
      const token = generateToken({
        id: data.id,
        email: data.email,
      });

      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
