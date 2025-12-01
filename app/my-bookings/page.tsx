"use client";
import Booked from "@/components/bookings/Booked";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

function page() {
  return (
    <div>
      <ProtectedRoute>
        <Booked />
      </ProtectedRoute>
    </div>
  );
}

export default page;
