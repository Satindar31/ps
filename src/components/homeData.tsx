"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";

const loadingStates = [
  { text: "Initializing quantum cache coherency" },
  { text: "Re-indexing neural packet buffers" },
  { text: "Calibrating sarcasm-detection module" },
  { text: "Deploying microservices to the void" },
  { text: "Compiling jokes into bytecode" },
  { text: "Synchronizing space-time clock drift" },
  { text: "Patching reality with hotfix v0.9" },
  { text: "Warming up the probabilistic RNG" },
];

export default function HomePage() {
  const [data, setData] = useState<{
    name?: string;
    nativeLangName?: string;
    location?: string;
    socials?: { platform: string; url: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/getDetails")
      .then((r) => r.json())
      .then((json) => {
        if (mounted) setData(json);
        return;
      })
      .catch(() => {
        if (mounted) setData(null);
        return;
      })
      .finally(() => {
        if (mounted) setLoading(false);
        return;
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading)
    return (
      <Loader loadingStates={loadingStates} loading={loading} duration={650} />
    );
  if (!data) return <div>Failed to load</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex gap-8 flex-row">
        <p>Placeholder image here</p>
        <div className="flex flex-col">
          <h1 className="text-2xl">{data.name}</h1>
          <h3>{data.nativeLangName}</h3>
          <h4 className="text-sm">{data.location}</h4>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {data.socials?.map((social: any) => (
          <Link key={social.platform} href={social.url} target="_blank">
            <Button
              className="hover:cursor-pointer rounded-full"
              variant="outline"
            >
              {social.platform}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
