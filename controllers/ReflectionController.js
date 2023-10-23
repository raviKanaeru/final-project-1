const db = require("../config/db");

class ReflectionController {
  static async getAllReflection(req, res) {
    try {
      const data = await db.query(
        `SELECT * FROM public."Reflections" WHERE UserId = $1`,
        [req.userData.id]
      );

      res.status(200).json(data.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createReflection(req, res) {
    const { success, low_point, take_away } = req.body;
  }
}

module.exports = ReflectionController;
