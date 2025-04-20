const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin allaqachon mavjud" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      fullName,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin muvaffaqiyatli yaratildi" });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin topilmadi" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Noto‘g‘ri parol" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30m" }
    );

    res.status(200).json({
      message: "Muvaffaqiyatli tizimga kirildi",
      token,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
};

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password } = req.body;

  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin topilmadi" });
    }

    admin.fullName = fullName || admin.fullName;
    admin.email = email || admin.email;

    if (password) {
      admin.password = await bcrypt.hash(password, 10);
    }

    await admin.save();
    res.status(200).json({ message: "Admin yangilandi", admin });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
};

module.exports = { registerAdmin, loginAdmin, updateAdmin };
