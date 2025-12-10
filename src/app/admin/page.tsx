import dynamic from "next/dynamic";

export const runtime = 'edge';

const AdminContent = dynamic(() => import("./admin-content"), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse">Chargement...</div>
    </div>
  )
});

export default function AdminPage() {
  return <AdminContent />;
}
