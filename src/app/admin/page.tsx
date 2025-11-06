import AdminForm from "@/components/adminForm";
import { Suspense } from "react";

export default async function AdminPage() {
  return (
    <div className="dark bg-[#00030c] text-white min-h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl">Admin Page</h1>
      <Suspense>
        <AdminForm />
      </Suspense>
    </div>
  );
}