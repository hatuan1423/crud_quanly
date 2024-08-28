"use client";

import Header from "@/components/Header";
import TableUser from "@/components/TableUser";
import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import Toast from "@/components/Toast";

export default function Home() {
  return (
    <>
      <Header />

      <Wrapper>
        <TableUser />
      </Wrapper>
      <Toast />
    </>
  );
}
