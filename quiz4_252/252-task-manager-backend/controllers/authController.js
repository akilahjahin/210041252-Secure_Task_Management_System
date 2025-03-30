const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
   const { name, email, password, role } = req.body;

   try {
       let user = await User.findOne({ email });
       if (user) return res.status(400).json({ msg: "User already exists" });

       const hashedPassword = await bcrypt.hash(password, 10);

       user = new User({ name, email, password: hashedPassword, role });
       await user.save();

       res.status(201).json({ msg: "User registered successfully" });
   } catch (err) {
       res.status(500).json({ msg: "Server error" });
   }
};

exports.login = async (req, res) => {
   const { email, password } = req.body;

   try {
       const user = await User.findOne({ email });
       if (!user) return res.status(400).json({ msg: "Invalid credentials" });

       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

       const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
           expiresIn: "1h",
       });

       res.json({ token, role: user.role });
   } catch (err) {
       res.status(500).json({ msg: "Server error" });
   }
};
