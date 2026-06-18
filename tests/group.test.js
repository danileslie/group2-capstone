const { createGroup, inviteToGroup } = require('../server/src/groups/groupService');

describe('Group Management', () => {
  test('should create a group with a name and owner', () => {
    const group = createGroup({ name: 'Biology Study Group', owner: 'user123' });
    expect(group.name).toBe('Biology Study Group');
    expect(group.owner).toBe('user123');
  });

  test('should include the owner in the members list', () => {
    const group = createGroup({ name: 'Math Group', owner: 'user456' });
    expect(group.members).toContain('user456');
  });

  test('should throw if name is missing', () => {
    expect(() => createGroup({ owner: 'user123' })).toThrow('Name is required');
  });

  test('should throw if owner is missing', () => {
    expect(() => createGroup({ name: 'Study Group' })).toThrow('Owner is required');
  });

  test('should invite a user to a group', () => {
    const group = createGroup({ name: 'Physics Group', owner: 'user1' });
    const updated = inviteToGroup(group, 'user2');
    expect(updated.invitations).toContain('user2');
  });

  test('should not invite the same user twice', () => {
    const group = createGroup({ name: 'Chemistry Group', owner: 'user1' });
    const updated = inviteToGroup(group, 'user2');
    expect(() => inviteToGroup(updated, 'user2')).toThrow('User already invited');
  });
});
