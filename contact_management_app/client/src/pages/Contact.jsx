import React, { useState } from "react";
import { ContactForm, ContactTable, Header } from "../components";

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Header />
      <ContactForm
        open={open}
        handleClose={handleClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <ContactTable handleOpen={handleOpen} setCurrentId={setCurrentId} />
    </div>
  );
};

export default Contact;
