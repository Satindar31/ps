"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";

import {
  FaGithub,
  FaLinkedin,
  FaDiscord,
  FaSpotify,
  FaBlog,
  FaHashnode,
  FaMedium,
  FaDev,
  FaRss,
  FaYoutube,
  FaStackOverflow,
  FaReddit,
  FaXTwitter,
  FaDribbble,
  FaInstagram,
} from "react-icons/fa6";

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

  function platformToIcon(platform: string) {
    switch (platform.toLowerCase()) {
      case "github":
        return <FaGithub />;
      case "linkedin":
        return <FaLinkedin />;
      case "discord":
        return <FaDiscord />;
      case "spotify":
        return <FaSpotify />;
      case "blog":
        return <FaBlog />;
      case "hashnode":
        return <FaHashnode />;
      case "medium":
        return <FaMedium />;
      case "dev":
        return <FaDev />;
      case "rss":
        return <FaRss />;
      case "youtube":
        return <FaYoutube />;
      case "stackoverflow":
        return <FaStackOverflow />;
      case "reddit":
        return <FaReddit />;
      case "x":
        return <FaXTwitter />;
      case "dribbble":
        return <FaDribbble />;
      case "instagram":
        return <FaInstagram />;
      default:
        return platform;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl">
        <div className="shrink-0">
          <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500">
            <span className="text-sm">Avatar</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-semibold">{data.name}</h1>
          <h3 className="text-lg text-muted-foreground mt-1">{data.nativeLangName}</h3>
          <h4 className="text-sm text-muted-foreground mt-1">{data.location}</h4>
        </div>
      </div>

      {data.socials && data.socials.length > 0 && (() => {
        const count = data.socials.length;
        const columns = Math.min(4, Math.max(1, Math.ceil(Math.sqrt(count))));
        return (
          <div
            className="w-full max-w-4xl mt-8"
            style={{
              display: "grid",
              gap: "0.75rem",
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {data.socials.map((social: any) => (
              <Link
                key={social.platform + social.url}
                href={social.url}
                target="_blank"
                rel="noopener"
                className="w-full"
                aria-label={social.platform}
              >
                <Button
                  className="w-full h-14 flex items-center justify-start gap-3 px-4 border"
                  variant="outline"
                >
                  <span className="text-xl">{platformToIcon(social.platform)}</span>
                  <span className="truncate text-sm">{social.platform}</span>
                </Button>
              </Link>
            ))}
          </div>
        );
      })()}
    </div>
  );
}
