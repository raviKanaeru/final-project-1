const db = require("../config/db");

class ReflectionController {
  static async getAllReflection(req, res) {
    try {
      const data = await db.query(
        `SELECT * FROM public."Reflections" WHERE "UserId" = $1`,
        [req.userData.id]
      );

      res.status(200).json(data.rows);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createReflection(req, res) {
    try {
      const { success, low_point, take_away } = req.body;

      const data = await db.query(
        `INSERT INTO public."Reflections" (success, low_point, take_away, "UserId", "createdAt", "updatedAt") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        [success, low_point, take_away, req.userData.id, new Date(), new Date()]
      );

      res.status(201).json(data.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ReflectionController;
