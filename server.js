
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Showroom Routes
const showroomRoutes = require("./routes/showroomRoutes");

app.use("/api/showrooms", showroomRoutes);

// Main API
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Damneth ERP API is Running!"
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
