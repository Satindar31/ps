"use client";

import AdminForm from "@/components/adminForm";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";

export default function AdminPage() {
  const [pwd, setPwd] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitted OTP:", pwd);
    if (pwd === process.env.NEXT_PUBLIC_AP) {
      setAccessGranted(true);
    } else {
      alert("Incorrect Password");
    }
  }

  return (
    <div className="dark bg-[#00030c] text-white min-h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl">Admin Page</h1>
      {accessGranted ? (
        <AdminForm />
      ) : (
        <form onSubmit={handleSubmit}>
        <InputOTP
          maxLength={6}
          value={pwd}
          onChange={setPwd}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        </form>
      )}
    </div>
  );
}
