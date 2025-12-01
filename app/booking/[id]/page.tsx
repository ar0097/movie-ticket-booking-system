"use client";
import Mybookings from "@/components/bookings/Mybookings";
import ProtectedRoute from "@/components/ProtectedRoute";
import React, { use } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <div>
      <ProtectedRoute>
        <Mybookings id={id} />
      </ProtectedRoute>
    </div>
  );
}

export default Page;
