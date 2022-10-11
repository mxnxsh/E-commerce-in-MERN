import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      isAdmin: {
         type: Boolean,
         default: false,
         required: true,
      },
      isSeller: {
         type: Boolean,
         default: false,
         required: true,
      },
      seller: {
         name: { type: String, default: 'No-name' },
         logo: {
            type: String,
            default:
               'https://image.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg',
         },
         description: String,
         rating: { type: Number, default: 0, required: true },
         numReviews: { type: Number, default: 0, required: true },
      },
      tokens: [
         {
            token: {
               type: String,
               required: true,
            },
         },
      ],
   },
   {
      timestamps: true,
   },
);

userSchema.methods.generateAuthToken = async function () {
   try {
      let token = jwt.sign({ id: this._id }, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({ token });
   } catch (error) {
      console.log(error);
   }
};

const User = mongoose.model('User', userSchema);
export default User;
