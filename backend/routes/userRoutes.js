import express from "express";

import User from "../models/UserModel.js";
import verifyToken  from "../middleware/auth.js"; // Ensure the correct file extension

const router = express.Router();

router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find({ role: "User" }).select("-password -otp -otpExpires"); // exclude sensitive fields
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});


router.get("/all-broker", async (req, res) => {
  try {
    const users = await User.find({ role: "Broker" }).select("-password -otp -otpExpires"); // exclude sensitive fields
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});



// Profile Route
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -otp -otpExpires');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ status: 'success', user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});


router.get("/properties", async (req, res) => {
  try {
    const users = await User.find({}, "name email mobile properties"); // fetch these fields
    const allProperties = users.flatMap(user =>
      user.properties.map(p => ({
        ...p.toObject(),
        userName: user.name,
        userEmail: user.email,
        userMobile: user.mobile
      }))
    );
    res.status(200).json(allProperties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});




// Update any property (admin access)
router.put("/update-property/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { rent, status } = req.body;

    if (rent === undefined && status === undefined) {
      return res.status(400).json({ error: "No fields to update" });
    }

    if (rent !== undefined && (isNaN(rent) || rent <= 0)) {
      return res.status(400).json({ error: "Invalid rent amount" });
    }

    if (status && !["Open", "Closed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    // Find user with the property
    const user = await User.findOne({ "properties._id": propertyId });
    if (!user) return res.status(404).json({ error: "Property not found" });

    const property = user.properties.id(propertyId);
    if (rent !== undefined) property.rent = rent;
    if (status !== undefined) property.status = status;

    await user.save();
    res.status(200).json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update property" });
  }
});

// Delete any property (admin access)
router.delete("/delete-property/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const user = await User.findOne({ "properties._id": propertyId });
    if (!user) return res.status(404).json({ error: "Property not found" });

    user.properties.id(propertyId).remove();
    await user.save();

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete property" });
  }
});


export default router;