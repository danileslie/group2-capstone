const { createGroup, inviteToGroup } = require('../server/src/groups/groupService');

jest.mock('../server/src/groups/Group', () => ({
  create: jest.fn(data => Promise.resolve(data)),
  findById: jest.fn(),
}));

const Group = require('../server/src/groups/Group');

describe('Group Management', () => {
  test('should create a group with a name and owner', async () => {
    const group = await createGroup({ name: 'Biology Study Group', owner: 'user123' });
    expect(group.name).toBe('Biology Study Group');
    expect(group.owner).toBe('user123');
  });

  test('should include the owner in the members list', async () => {
    const group = await createGroup({ name: 'Math Group', owner: 'user456' });
    expect(group.members).toContain('user456');
  });

  test('should throw if name is missing', async () => {
    await expect(createGroup({ owner: 'user123' })).rejects.toThrow('Name is required');
  });

  test('should throw if owner is missing', async () => {
    await expect(createGroup({ name: 'Study Group' })).rejects.toThrow('Owner is required');
  });

  test('should invite a user to a group', async () => {
    const mockGroup = { _id: 'group123', invitations: [], save: jest.fn().mockResolvedValue(true) };
    Group.findById.mockResolvedValue(mockGroup);

    const updated = await inviteToGroup('group123', 'user2');
    expect(updated.invitations).toContain('user2');
  });

  test('should not invite the same user twice', async () => {
    const mockGroup = { _id: 'group123', invitations: ['user2'], save: jest.fn().mockResolvedValue(true) };
    Group.findById.mockResolvedValue(mockGroup);

    await expect(inviteToGroup('group123', 'user2')).rejects.toThrow('User already invited');
  });

  test('should throw if group not found', async () => {
    Group.findById.mockResolvedValue(null);
    await expect(inviteToGroup('nonexistent', 'user2')).rejects.toThrow('Group not found');
  });
});
