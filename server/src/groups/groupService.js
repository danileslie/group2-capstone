function createGroup({ name, owner } = {}) {
  if (!name) throw new Error('Name is required');
  if (!owner) throw new Error('Owner is required');

  return {
    name,
    owner,
    members: [owner],
    invitations: [],
  };
}

function inviteToGroup(group, userId) {
  if (group.invitations.includes(userId)) {
    throw new Error('User already invited');
  }

  return {
    ...group,
    invitations: [...group.invitations, userId],
  };
}

module.exports = { createGroup, inviteToGroup };
