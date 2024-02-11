import { User } from "../Models/User_Model.js";

export default class UserController {
  updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const { name, phoneNo, address, dateOfBirth, gender } = req.body;

    const picture = req.files["picture"] ? req.files["picture"][0].path : "";
    const idProof = req.files["idProof"] ? req.files["idProof"][0].path : "";

    try {
      const user = await User.findById(userId);
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            name: name || user.name,
            gender: gender || user.gender,
            phoneNo: phoneNo || user.phoneNo,
            address: address || user.address,
            dateOfBirth: dateOfBirth || user.dateOfBirth,
            picture: picture || user.picture,
            idProof: idProof || user.idProof,
            picturePath: picture.slice(15) || user.picturePath,
            idPath: idProof.slice(15) || user.idPath,
          },
        },
        { new: true }
      );
      // Check if the user is updated successfully
      if (updatedUser) {
        return res.status(200).json({ user: updatedUser });
      }

      // If the user update fails, send a 400 response
      return res.status(400).json({ error: "Failed to update the user." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
      await User.findOneAndDelete({ _id: userId });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
