const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createGroup, inviteToGroup } = require('../groups/groupService');

router.post('/', auth, async (req, res) => {
  try {
    const group = await createGroup({ name: req.body.name, owner: req.user.userId });
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/invite', auth, async (req, res) => {
  try {
    const group = await inviteToGroup(req.params.id, req.body.userId);
    res.status(200).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
