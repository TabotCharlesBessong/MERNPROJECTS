import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Card, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
// import MaterialTable from "material-table";

const useStyles = makeStyles((theme) => ({
  button: {
    // margin: theme.spacing(1),
    margin: "1rem",
  },
  card: {
    margin: "10px",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "1.96rem",
  },
}));

const ContactTable = ({ handleOpen, setCurrentId }) => {
  const classes = useStyles();
  const [contacts, setContacts] = useState([])
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<Add />}
          onClick={handleOpen}
        >
          Add Contact
        </Button>
      </div>
      <Card>
        {/* <MaterialTable
          title="Contact Details"
          columns={[
            {
              title: "Image",
              field: "selectedImage",
              render: (rowData) => (
                <img
                  alt="Userimage"
                  style={{ height: 36, borderRadius: "50%" }}
                  src={rowData.selectedImage}
                />
              ),
            },
            { title: "Name", field: "name" },
            { title: "Email ID", field: "email" },
            { title: "Phone No", field: "phoneNo1" },
            { title: "Alt Phone No", field: "phoneNo2" },
            { title: "Address", field: "address" },
            {
              title: "Edit/Delete",
              field: "edit",
              render: (rowData) =>
                rowData && (
                  <>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setCurrentId(rowData._id);
                        handleClickOpen();
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        delContact(rowData._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ),
            },
          ]}
          data={contacts}
          actions={[
            {
              tooltip: "Remove All Selected Contacts",
              icon: "delete",
              onClick: (evt, data) => delContacts(data.map((a) => a._id)),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
            selection: true,
          }}
        /> */}
      </Card>
    </>
  );
};

export default ContactTable;
