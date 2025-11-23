"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FileUpload } from "./ui/file-upload";
import { SocialProfilesEdit } from "./socials";
import { LoaderThree } from "./ui/loader";
import { Textarea } from "./ui/textarea";

export default function AdminForm() {
  const [data, setData] = useState<{
    name?: string;
    nativeLangName?: string;
    location?: string;
    pfp?: string;
    about?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/getDetails")
      .then((r) => r.json())
      .then((json) => {
        console.log("fetched pfp:", json.pfp);
        if (mounted) {
          setData({
            location: json.location,
            name: json.name,
            nativeLangName: json.nativeLangName,
            pfp: json.pfp.toString(),
            about: json.about,
          });

          console.log("finally");
          console.log(data?.pfp ?? "no pfp");
          console.log(data?.location ?? "no location");
        }
      })
      .catch(() => {
        if (mounted) setData(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <LoaderThree />
      </div>
    );
  if (!data) return <div>Failed to load</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    fetch("/api/setDetails", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  const handleFileUpload = (files: File[]) => {
    // Convert file to base64 string
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      console.log(base64String);
      setData({
        pfp: base64String?.toString(),
        name: data.name,
        location: data.location,
        nativeLangName: data.nativeLangName,
      });
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input
        value={data.name}
        onChange={(e) =>
          setData({
            name: e.target.value,
            location: data.location,
            nativeLangName: data.nativeLangName,
          })
        }
      />
      <Input
        value={data.nativeLangName}
        onChange={(e) =>
          setData({
            name: data.name,
            location: data.location,
            nativeLangName: e.target.value,
          })
        }
      />
      <Input
        value={data.location}
        onChange={(e) =>
          setData({
            name: data.name,
            location: e.target.value,
            nativeLangName: data.nativeLangName,
          })
        }
      />

      <Textarea
        value={data.about}
        onChange={(e) =>
          setData({
            name: data.name,
            location: data.location,
            nativeLangName: data.nativeLangName,
            pfp: data.pfp,
            about: e.target.value,
          })
        }
        placeholder="About me section in Markdown"
      />

      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload onChange={handleFileUpload} />
      </div>

      <SocialProfilesEdit />

      <Button type="submit">Submit</Button>
    </form>
  );
}
