'use client';

import { Suspense } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import TrackingPageContent from "../components/TrackingPageContent";

export default function TrackingPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <TrackingPageContent />
      </Suspense>
    </ProtectedRoute>
  );
}
