function userData(data, userId) {
  if (data.length < 1) return;
  return data.filter(item => item.owner._id.equals(userId));
}

module.exports = userData;
