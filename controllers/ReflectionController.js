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

  static async updateReflectionById(req, res) {
    try {
      const { id } = req.params;
      const { success, low_point, take_away } = req.body;

      const data = await db.query(
        `UPDATE public."Reflections" SET success = $1, low_point = $2, take_away = $3, "updatedAt" = $4 WHERE id = $5 AND "UserId" = $6 RETURNING *`,
        [success, low_point, take_away, new Date(), id, req.userData.id]
      );

      if (!data.rows[0]) {
        throw {
          code: 404,
          message: "Data not found",
        };
      }

      res.status(201).json(data.rows[0]);
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  }

  static async deleteReflectionById(req, res) {
    try {
      const { id } = req.params;

      const data = await db.query(
        `DELETE FROM public."Reflections" WHERE id = $1 AND "UserId" = $2`,
        [id, req.userData.id]
      );

      if (data.rowCount === 0) {
        throw {
          code: 404,
          message: "Data not found",
        };
      }

      res.status(200).json({
        message: "Success delete",
      });
    } catch (error) {
      res.status(error.code || 500).json({ message: error.message });
    }
  }
}

module.exports = ReflectionController;
