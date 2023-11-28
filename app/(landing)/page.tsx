"use client";

import React from "react";
import Home from "@/components/landing/Home";
import EarliestProjectList from "@/components/landing/EarliestProjectList";
import ContactUs from "@/components/landing/ContactUs";
import FormRegister from "@/components/landing/FormRegister";

const LandingPage = () => {
  return (
    <div className="flex">
      <Home />
      <EarliestProjectList />
      <ContactUs />
      <FormRegister />
    </div>
  );
};

export default LandingPage;
