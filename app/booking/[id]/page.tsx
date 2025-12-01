"use client";
import Mybookings from "@/components/bookings/Mybookings";
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
      <Mybookings id={id} />
    </div>
  );
}

export default Page;
