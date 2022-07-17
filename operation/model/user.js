const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // image: {
    //   type: {},
    // },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;

// const CreateUser = async () => {
//   try {
//     const data = await user.save();
//     console.log(data);
//   } catch {
//     console.log("error");
//   }
// };
// CreateUser();

// const CreateMany = async () => {
//   try {
//     const user6 = new Model({
//       name: "harka sampang",
//       email: "harka@gmail.com",
//       password: "12324htty",
//     });
//     const user2 = new Model({
//       name: "Rita Gautam",
//       email: "ria@gmail.com",
//       password: "12324htty",
//     });

//     const result = await Model.insertMany([user2, user6]);
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
// CreateMany();

// const Find_By_Id = async (id) => {
//   const data = await Model.findById(id);
//   console.log(data);
// };
// Find_By_Id("62cfe62575cf49d5d39146ff");

// const Find_All = async () => {
//   const result = await Model.find();
//   console.log(result);
// };
// Find_All();

// const UpdateById = async (_id) => {
//   try {
//     const result = await Model.findByIdAndUpdate(
//       { _id },
//       {
//         $set: {
//           name: "Rita Gautam",
//           password: "rita@123",
//         },
//       },
//       {
//         new: true,
//       }
//     );
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
// UpdateById("62cfe62575cf49d5d39146ff");

// const DeleteUSer = async (id) => {
//   try {
//     const result = await Model.findByIdAndDelete(id);
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
// DeleteUSer("62cfe01d5d230d3e2e88bbfa");
