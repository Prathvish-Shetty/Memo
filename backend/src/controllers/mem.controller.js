import { Mem } from "../models/mem.model.js"

export const createMem = async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const newMem = new Mem({
      userId: req.user._id,
      title,
      content,
      isPublic: isPublic || false,
    });

    if (isPublic) {
      await newMem.generateNewShareableLink();
    }
    await newMem.save();
    res.status(201).json({ message: "Mem created successfully", mem: newMem });
  } catch (error) {
    res.status(500).json({ message: "Failed to create mem", error: error.message });
  }
};

export const updateMem = async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;
    const mem = await Mem.findOne({ _id: req.params.id, userId: req.user._id });
    if (!mem) {
      return res.status(404).json({ message: "Mem not found" });
    }
    mem.title = title ?? mem.title;
    mem.content = content ?? mem.content;
    mem.isPublic = isPublic ?? mem.isPublic;
    if (isPublic) {
      await mem.generateNewShareableLink(); 
    } else {
      mem.shareableLink = null;
      await mem.save();
    }
    res.status(200).json({ message: "Mem updated successfully", mem });
  } catch (error) {
    res.status(500).json({ message: "Failed to update mem", error: error.message });
  }
};

export const getMems = async (req, res) => {
  try {
    const mems = await Mem.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(mems);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Error fetching mems" });
  }
};

export const deleteMem = async (req, res) => {
  try {
    const mem = await Mem.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!mem) {
      return res.status(404).json({ message: "Mem not found or unauthorized" });
    }
    return res.status(200).json({ message: "Mem deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Error deleting mem" });
  }
};

export const getPublicMem = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    const mem = await Mem.findOne({ shareableLink: token, isPublic: true });
    if (!mem) {
      return res.status(404).json({ message: "Mem not found or is private" });
    }
    return res.status(200).json(mem);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Error accessing public mem" });
  }
};
