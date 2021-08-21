/* eslint-disable no-undef */
Parse.Cloud.define('updateUserPushToken', async (request) => {
  const { userId, pushToken } = request.params;
  let query = new Parse.Query('User');
  const user = await query.get(userId);
  const { pushTokens } = user.attributes;
  user.set({ pushTokens: [...pushTokens, pushToken] });
  await user.save();
  return user;
});
