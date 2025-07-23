const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/middleware')

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        members: req.body.members || [],
        createdBy: req.user._id || req.user.userId
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id || req.user.userId; // depending on your middleware

    const projects = await Project.find({
      $or: [
        { createdBy: userId },
        { members: userId }
      ]
    })
    .populate('createdBy', 'email')
    .populate('members', 'email');

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

