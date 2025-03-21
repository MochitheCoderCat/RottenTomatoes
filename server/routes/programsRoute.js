const Program = require("../models/programModel");
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

// add Program
router.post("/", authMiddleware, async (req, res) => {
  try {
    req.body.createdBy = req.userId;
    await Program.create(req.body);
    res
      .status(200)
      .json({ message: "Program added successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// get all programs
router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const query = {};
    if (filters.degree) {
      query.degree = filters.degree;
    }
    if (filters.country) {
      query.country = filters.country;
    }
    const programs = await Program.find(query)
      .populate("schoolOf")
      .populate("createdBy")
      .sort({ rating: -1 });
    res.status(200).json({ data: programs, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// get program by id
router.get("/:id", async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)
      .populate("schoolOf")
      .populate("createdBy");
    res.status(200).json({ data: program, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// update program
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({
      message: "Program updated successfully",
      success: true,
      data: updatedProgram,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// delete program
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedProgram = await Program.findByIdAndDelete(req.params.id, {
      new: true,
    });

    res.send({
      message: "Program deleted successfully",
      success: true,
      data: updatedProgram,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// get programs by school id
router.get("/get-programs-by-school/:id", async (req, res) => {
  try {
    const schoolId = req.params.id;
    const programs = await Program.find({ schoolOf: schoolId });
    res.status(200).json({ data: programs, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
