"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const destination = String(data.get("destination") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Trip inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nDestination interest: ${destination}\n\n${message}`
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[color:var(--line)] bg-white p-8">
        <h2 className="font-display text-2xl text-[color:var(--ink)]">
          Thanks — your draft is ready
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-ink)]">
          Your email client should open with a pre-filled message to{" "}
          {siteConfig.email}. If it didn&apos;t, write us directly and we&apos;ll
          reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-[color:var(--line)] bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Alex Rivera" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="alex@email.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="destination">Destination interest</Label>
        <Input
          id="destination"
          name="destination"
          placeholder="Patagonia, Kyoto, Nepal..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Tell us about your trip</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Travel dates, group size, pace preferences, must-sees..."
        />
      </div>
      <Button
        type="submit"
        className="h-10 bg-[color:var(--ink)] text-white hover:bg-[color:var(--ink)]/90"
      >
        Send inquiry
      </Button>
    </form>
  );
}
