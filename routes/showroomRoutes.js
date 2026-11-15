
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ==========================================
// CREATE SHOWROOM
// POST /api/showrooms
// ==========================================
router.post("/", async (req, res) => {
    try {
        const { Name, Address, Email, ContactNumber } = req.body;

        // Validation
        if (!Name || !Address || !Email || !ContactNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const sql = `
            INSERT INTO Showroom
            (Name, Address, Email, ContactNumber)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.execute(sql, [
            Name.trim(),
            Address.trim(),
            Email.trim(),
            String(ContactNumber).trim()
        ]);

        res.status(201).json({
            success: true,
            message: "Showroom created successfully",
            ShowRoomID: result.insertId
        });

    } catch (error) {
        console.error("Create Showroom Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create showroom"
        });
    }
});


// ==========================================
// GET ALL SHOWROOMS
// GET /api/showrooms
// ==========================================
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT
                ShowRoomID,
                Name,
                Address,
                Email,
                ContactNumber
            FROM Showroom
            ORDER BY ShowRoomID DESC
        `);

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        console.error("Get Showrooms Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve showrooms"
        });
    }
});


// ==========================================
// GET SHOWROOM BY ID
// GET /api/showrooms/:id
// ==========================================
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^[1-9]\d*$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ShowRoomID"
            });
        }

        const [rows] = await db.execute(
            "SELECT * FROM Showroom WHERE ShowRoomID = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Showroom not found"
            });
        }

        res.status(200).json({
            success: true,
            data: rows[0]
        });

    } catch (error) {
        console.error("Get Showroom Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve showroom"
        });
    }
});


// ==========================================
// UPDATE SHOWROOM
// PUT /api/showrooms/:id
// ==========================================
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, Address, Email, ContactNumber } = req.body;

        if (!/^[1-9]\d*$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ShowRoomID"
            });
        }

        if (!Name || !Address || !Email || !ContactNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const sql = `
            UPDATE Showroom
            SET
                Name = ?,
                Address = ?,
                Email = ?,
                ContactNumber = ?
            WHERE ShowRoomID = ?
        `;

        const [result] = await db.execute(sql, [
            Name.trim(),
            Address.trim(),
            Email.trim(),
            String(ContactNumber).trim(),
            id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Showroom not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Showroom updated successfully"
        });

    } catch (error) {
        console.error("Update Showroom Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update showroom"
        });
    }
});


// ==========================================
// DELETE SHOWROOM
// DELETE /api/showrooms/:id
// ==========================================
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^[1-9]\d*$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ShowRoomID"
            });
        }

        const [result] = await db.execute(
            "DELETE FROM Showroom WHERE ShowRoomID = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Showroom not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Showroom deleted successfully"
        });

    } catch (error) {
        console.error("Delete Showroom Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete showroom"
        });
    }
});

module.exports = router;
