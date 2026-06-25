const Group = require('./Group');

async function createGroup({ name, owner } = {}) {
  if (!name) throw new Error('Name is required');
  if (!owner) throw new Error('Owner is required');

  const group = await Group.create({ name, owner, members: [owner], invitations: [] });

  return group;
}

async function inviteToGroup(groupId, userId) {
  const group = await Group.findById(groupId);
  if (!group) throw new Error('Group not found');

  if (group.invitations.map(id => id.toString()).includes(userId.toString())) {
    throw new Error('User already invited');
  }

  group.invitations.push(userId);
  await group.save();

  return group;
}

module.exports = { createGroup, inviteToGroup };
