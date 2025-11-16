import HomePage from "@/components/homeData";
import { Suspense } from "react";

export default async function Home() {

  return (
    <div className="dark bg-[#00030c] min-h-screen text-white">
     <Suspense>
      <HomePage />
     </Suspense>
    </div>
  );
}
