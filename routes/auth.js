const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const routers = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const db = require("../config/connection");

routers.post("/register", async (req, res) => {
    try {
      const { username, first_name, last_name, password, email } = req.body;
  
      // Check for missing fields
      if (!(username && first_name && last_name && password && email)) {
        return res.status(400).json({ message: "All fields are mandatory" });
      }
  
      // Check if the username already exists
      const [existingUser] = await db.query(
        `SELECT * FROM users WHERE username = ? AND email= ? `,
        [username, email]
      );
  
      if (existingUser) {
        console.log("User exists");
        return res.status(409).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcryptjs.hash(password, 10);
      //  console.log(hashedPassword);
  
      await db.query(
        `INSERT INTO users (username, first_name, last_name, password, email) '
                  +'VALUES (?, ?, ?, ?, ?)`,
        [username, first_name, last_name, hashedPassword, email]
      );
  
      console.log("Username registered successfully");
      return res.status(201).redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
routers.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [user] = await db.query(
      "SELECT id,username,password FROM users WHERE username= ? ",
      [username]
    );
    if (!user || !user.id) {
      return res.status(400).json({ message: "invalid username or password" });
    }
    const ispasswordMatcing = await bcryptjs.compare(password, user.password);
    // console.log(ispasswordMatcing);

    if (!ispasswordMatcing) {
      console.log("invalid username or password");
      return res.status(400).json({ message: "invalid username or password" });
    } else {
      const payload = {
        userId: user.id,
        username: username,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "30m",
      });

      return res.status(200).json({ message: "logged In succesfully", token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = routers;
