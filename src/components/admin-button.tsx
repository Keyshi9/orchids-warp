"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const ADMIN_CODE = "warp90";

export function AdminButton() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      setOpen(false);
      router.push("/admin");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="w-9 h-9">
          <Shield className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[320px]">
        <DialogHeader>
          <DialogTitle>Accès Admin</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Code d'accès"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={error ? "border-destructive" : ""}
          />
          {error && (
            <p className="text-sm text-destructive">Code incorrect</p>
          )}
          <Button type="submit" className="w-full">
            Accéder
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
