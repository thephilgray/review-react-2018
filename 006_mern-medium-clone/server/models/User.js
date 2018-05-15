import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  provider: String,
  provider_id: String,
  token: String,
  provider_pic: String,
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});
UserSchema.methods.follow = (userId) => {
  if (this.following.indexOf(userId) === -1) {
    this.following.push(userId);
  }
  return this.save();
};
UserSchema.methods.addFollower = (fs) => {
  this.follwers.push(fs);
};
export default mongoose.model('User', UserSchema);
