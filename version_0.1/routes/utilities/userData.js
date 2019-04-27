function userData(data, userId) {
  return data.filter(item => item.owner._id.equals(userId));
}

module.exports = userData;
