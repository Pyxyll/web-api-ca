import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profileImage: {
    url: { type: String, default: null },
    publicId: { type: String, default: null } // Cloudinary public ID for deletion
  }
}, { timestamps: true });

UserSchema.methods.comparePassword = async function (passw) {
  return await bcrypt.compare(passw, this.password);
};

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.pre('save', async function (next) {
  const saltRounds = 10;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.model('User', UserSchema);