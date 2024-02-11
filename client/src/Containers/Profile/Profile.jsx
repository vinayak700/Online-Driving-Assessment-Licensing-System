import React, { useEffect, useState } from "react";
import "./Profile.css";
import Sidebar from "../../Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  updateUser,
  userSelector,
} from "../../Redux/Reducers/userReducer";
import { toast } from "react-toastify";
import ArticleIcon from "@mui/icons-material/Article";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector(userSelector);

  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    phoneNo: user.phoneNo,
    picture: user.picture,
    picturePath: user.picturePath || "",
    idProof: user.idProof || "",
    idPath: user.idPath || "",
    gender: user.gender,
    address: user.address,
  });

  useEffect(() => {
    setProfile(user);
  }, [dispatch, user]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const pic = document.getElementById("pictureFile");
    const doc = document.getElementById("idFile");

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phoneNo", profile.phoneNo);
    formData.append("picture", pic.files[0]);
    formData.append("idProof", doc.files[0]);
    formData.append("gender", profile.gender);
    formData.append("address", profile.address);
    dispatch(updateUser({ user: formData, userId: user._id, token }))
      .unwrap()
      .then(() => {
        toast.success("User Profile updated!!!");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="profile-page">
      <Sidebar />
      <div className="profile-content">
        <div className="profile-header">
          <img
            src={`http://localhost:8080/${profile.picturePath}`}
            alt="Profile"
            className="profile-pic"
          />
          <h2>{profile.name}</h2>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phoneNo}</p>
        </div>
        <div className="profile-form">
          {/* Profile Update Form */}
          <h3>Update Profile</h3>
          <form onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phoneNo"
                value={profile.phoneNo}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="address"
                value={profile.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Profile Picture:</label>
              <input
                id="pictureFile"
                type="file"
                accept="image/*"
                name="picture"
              />
            </div>
            <div className="form-group">
              <Link
                to={`http://localhost:8080/${profile.idPath}`}
                target="_blank"
              >
                <ArticleIcon />
              </Link>
              <label>Identity Proof Document:</label>
              <input
                id="idFile"
                type="file"
                accept=".pdf,.doc,.docx"
                name="idProof"
              />
            </div>
            {/* Add other fields as needed */}
            <button type="submit">Update</button>
          </form>
          <div className="delete-account">
            <p>Want to Delete Your Account?</p>
            <button
              onClick={() => {
                dispatch(deleteUser({ userId: user._id, token }))
                  .unwrap()
                  .then(() => {
                    navigate("/signin");
                    toast.success("User has been deleted!!!");
                  });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
