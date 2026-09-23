"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "cn";

/** Matches treks, tours, and bus offerings on the site */
const DESTINATION_SUGGESTIONS = [
  "Everest Base Camp Trek",
  "Annapurna Circuit Trek",
  "Annapurna Base Camp Trek",
  "Langtang Valley Trek",
  "Kathmandu Heritage Day",
  "Pokhara Lakes & Viewpoints",
  "Chitwan Jungle Stay",
  "Kathmandu → Pokhara bus",
] as const;

type FieldKey = "name" | "email" | "destination" | "message";

type FieldErrors = Partial<Record<FieldKey, string>>;

type ToastKind = "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<FieldKey, string>): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const destination = values.destination.trim();
  const message = values.message.trim();

  if (name.length < 2) {
    errors.name = "Enter your full name (at least 2 characters).";
  }
  if (!email) {
    errors.email = "Email is required so we can reply.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Use a valid email address (e.g. you@example.com).";
  }
  if (destination.length < 2) {
    errors.destination =
      "Tell us a trek, tour, or bus route — e.g. Everest Base Camp or KTM–Pokhara bus.";
  }
  if (message.length < 20) {
    errors.message =
      "Add a few details — dates, group size, or pace (at least 20 characters).";
  }

  return errors;
}

function FieldHint({
  id,
  error,
  children,
}: {
  id: string;
  error?: string;
  children?: ReactNode;
}) {
  if (error) {
    return (
      <p id={id} className="text-xs text-destructive" role="alert">
        {error}
      </p>
    );
  }
  if (children) {
    return (
      <p id={id} className="text-xs text-[color:var(--muted-ink)]">
        {children}
      </p>
    );
  }
  return null;
}

function InquiryToast({
  kind,
  message,
  onDismiss,
}: {
  kind: ToastKind;
  message: string;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 5500);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  const isSuccess = kind === "success";

  return (
    <div
      className="contact-inquiry-toast fixed right-4 bottom-4 z-[100] flex max-w-sm gap-3 rounded-xl border border-[color:var(--line)] bg-white p-4 shadow-lg ring-1 ring-black/5 sm:right-6 sm:bottom-6"
      role={isSuccess ? "status" : "alert"}
      aria-live="polite"
    >
      <span
        className={cn(
          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
          isSuccess
            ? "bg-[color:var(--mist)] text-[color:var(--lagoon-ink)]"
            : "bg-destructive/10 text-destructive"
        )}
        aria-hidden
      >
        {isSuccess ? (
          <CheckCircle2 className="size-4" strokeWidth={2} />
        ) : (
          <AlertCircle className="size-4" strokeWidth={2} />
        )}
      </span>
      <div className="min-w-0 flex-1 pr-6">
        <p className="text-sm font-medium text-[color:var(--ink)]">
          {isSuccess ? "Inquiry sent" : "Check the form"}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-[color:var(--muted-ink)]">
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-3 right-3 text-xs text-[color:var(--muted-ink)] hover:text-[color:var(--ink)]"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ kind: ToastKind; message: string } | null>(
    null
  );

  const dismissToast = useCallback(() => setToast(null), []);

  function clearFieldError(field: FieldKey) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values: Record<FieldKey, string> = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      destination: String(data.get("destination") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setToast({
        kind: "error",
        message: "Fix the highlighted fields and try again.",
      });
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      form.reset();
      setErrors({});
      setToast({
        kind: "success",
        message:
          "Thanks — our Kathmandu desk will reply within one business day (Nepal time).",
      });
    }, 600);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col rounded-2xl border border-[color:var(--line)] bg-white shadow-sm ring-1 ring-black/[0.03]"
        aria-labelledby="contact-form-heading"
      >
        <header className="border-b border-[color:var(--line)] px-6 py-5 sm:px-8 sm:py-6">
          <h2
            id="contact-form-heading"
            className="font-display text-xl tracking-tight text-[color:var(--ink)] sm:text-2xl"
          >
            Send an inquiry
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[color:var(--muted-ink)]">
            Treks, valley tours, or a seat on the Pokhara bus — share dates and
            interests. No payment details needed here.
          </p>
        </header>

        <div className="space-y-5 px-6 py-6 sm:space-y-6 sm:px-8 sm:py-7">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="e.g. Suman Shrestha"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="h-10 bg-[color:var(--sand-cool)]/50"
                onChange={() => clearFieldError("name")}
              />
              <FieldHint id="name-error" error={errors.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="h-10 bg-[color:var(--sand-cool)]/50"
                onChange={() => clearFieldError("email")}
              />
              <FieldHint id="email-error" error={errors.email} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">Destination interest</Label>
            <Input
              id="destination"
              name="destination"
              list="destination-suggestions"
              placeholder="e.g. Annapurna Base Camp, Kathmandu Heritage Day"
              aria-invalid={Boolean(errors.destination)}
              aria-describedby={
                errors.destination ? "destination-error" : "destination-hint"
              }
              className="h-10 bg-[color:var(--sand-cool)]/50"
              onChange={() => clearFieldError("destination")}
            />
            <datalist id="destination-suggestions">
              {DESTINATION_SUGGESTIONS.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
            <FieldHint
              id={
                errors.destination ? "destination-error" : "destination-hint"
              }
              error={errors.destination}
            >
              {!errors.destination &&
                "Pick from suggestions or type your own — treks, tours, or KTM–Pokhara bus."}
            </FieldHint>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Tell us about your trip</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Travel dates, group size, fitness level, and must-sees — e.g. October EBC with acclimatization days, or a Pokhara bus seat on 12 March."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="min-h-[7.5rem] resize-y bg-[color:var(--sand-cool)]/50"
              onChange={() => clearFieldError("message")}
            />
            <FieldHint id="message-error" error={errors.message} />
          </div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-[color:var(--line)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xs text-[color:var(--muted-ink)]">
            Prefer WhatsApp? Use the number in the header — same desk.
          </p>
          <Button
            type="submit"
            disabled={submitting}
            className="h-10 shrink-0 bg-[color:var(--ink)] px-6 text-white hover:bg-[color:var(--ink)]/90 disabled:opacity-70"
          >
            {submitting ? "Sending…" : "Send inquiry"}
          </Button>
        </footer>
      </form>

      {toast ? (
        <InquiryToast
          kind={toast.kind}
          message={toast.message}
          onDismiss={dismissToast}
        />
      ) : null}
    </>
  );
}
