"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AdminForm() {
  const [data, setData] = useState<{
    name?: string;
    nativeLangName?: string;
    location?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/getDetails")
      .then((r) => r.json())
      .then((json) => {
        if (mounted) setData(json);
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

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Failed to load</div>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    fetch("/api/setDetails", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

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
      <Button type="submit">Submit</Button>
    </form>
  );
}
