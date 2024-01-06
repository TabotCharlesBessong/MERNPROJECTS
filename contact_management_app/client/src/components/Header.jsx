import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "1.96rem",
  },
  name: {
    textAlign: "left",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" style={{ marginTop: "20px" }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Contact Book
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
