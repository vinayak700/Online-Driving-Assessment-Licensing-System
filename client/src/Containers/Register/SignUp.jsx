import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Redux/Reducers/userReducer";
import { toast } from "react-toastify";
import { TextField, Button, Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/system";
import { LockOutlined } from "@mui/icons-material";

const Container = styled(Box)({
  backgroundImage: `url("background_image.jpg")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "60vh",
  marginTop: "2rem",
});

const Paper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "32px",
  borderRadius: "4px",
  backgroundColor: "white",
  maxWidth: "400px",
});

const FormContainer = styled(Box)({
  width: "100%",
  padding: "2rem",
});

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNo: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const pic = document.getElementById("pictureFile");
    const formContent = new FormData();
    formContent.append("name", formData.name);
    formContent.append("email", formData.email);
    formContent.append("password", formData.password);
    formContent.append("phoneNo", formData.phoneNo);
    formContent.append("address", formData.address);
    formContent.append("picture", pic.files[0]);
    dispatch(registerUser(formContent))
      .unwrap()
      .then(() => {
        navigate("/signIn");
        toast.success("User Signed Up Successfully!");
      });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    });
  };

  return (
    <Container>
      <Paper>
        <LockOutlined />
        <Typography component="h1" variant="h5">
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Form fields */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNo"
                label="Contact Number"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                id="pictureFile"
                type="file"
                name="picture"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: "24px 0 16px" }}
          >
            Create Account
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              Already have an account?
              <Link to="/signIn" variant="body2">
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
