"use client";

import React from "react";
import Home from "@/src/components/landing/Home";
import EarliestProjectList from "@/src/components/landing/EarliestProjectList";
import ContactUs from "@/src/components/landing/ContactUs";
import FormRegister from "@/src/components/landing/FormRegister";

const LandingPage = () => {
  return (
    <div className="flex" style={{height: 'calc(100vh - 64px)'}}>
      <Home />
      <EarliestProjectList />
      <ContactUs />
      <FormRegister />
    </div>
  );
};

export default LandingPage;