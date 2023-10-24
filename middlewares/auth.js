const { generateToken, verifyToken } = require("../helpers/jwt");
const db = require("../config/db");

const authentication = async (req, res, next) => {
  try {
    // cek header, ada token atau tidak
    const token = req.header("authorization");

    if (!token) {
      throw {
        code: 401,
        message: "Unauthorized",
      };
    }

    // verify token
    const decode = verifyToken(token);

    const userData = await db.query(
      `SELECT * FROM public."Users" WHERE id = $1 AND email = $2`,
      [decode.id, decode.email]
    );

    if (!userData.rows[0]) {
      throw {
        code: 401,
        message: "User not found!",
      };
    }

    req.userData = {
      id: userData.rows[0].id,
      email: userData.rows[0].email,
    };

    next();
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};

module.exports = { authentication };
