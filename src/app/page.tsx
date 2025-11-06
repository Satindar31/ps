import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const res = await fetch(process.env.BASE_URL + "/api/getDetails", {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data);
  return (
    <div className="dark bg-[#00030c] min-h-screen text-white">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex gap-8 flex-row">
          <p>Placeholder image here</p>
          <div className="flex flex-col">
            <Suspense fallback={<div>Loading...</div>}>
              <h1 className="text-2xl">{data.name}</h1>
              <h3>{data.nativeLangName}</h3>
              <h4 className="text-sm">{data.location}</h4>
            </Suspense>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {data.socials.map((social: any) => (
            <Link key={social.platform} href={social.url} target="_blank">
              <Button className="hover:cursor-pointer rounded-full" variant="outline">
                {social.platform}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
