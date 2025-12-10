"use client";

import dynamicImport from "next/dynamic";

export const dynamic = 'force-dynamic';

const AdminContent = dynamicImport(() => import("./admin-content"), { ssr: false });

export default function AdminPage() {
  return <AdminContent />;
}