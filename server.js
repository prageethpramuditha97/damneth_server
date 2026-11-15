
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Server test
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Damneth API Server is Running!"
    });
});

// MySQL connection test
app.get("/api/db-test", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT DATABASE() AS database_name, NOW() AS server_time"
        );

        res.json({
            success: true,
            message: "MySQL Connected Successfully!",
            database: rows[0].database_name,
            time: rows[0].server_time
        });

    } catch (error) {
        console.error("MYSQL CONNECTION ERROR:", error);

        res.status(500).json({
            success: false,
            message: "MySQL Connection Failed",
            error_code: error.code,
            error_message: error.message
        });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
