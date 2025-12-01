import Movies from "@/components/movies/Movies";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

function page() {
  return (
    <div>
      <ProtectedRoute>
        <Movies />
      </ProtectedRoute>
    </div>
  );
}

export default page;
