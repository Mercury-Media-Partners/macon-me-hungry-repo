import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export interface FormContent {
  section_label: string;
  title: string;
  description: string;
  success_message: string;
  submit_btn: string;
  submit_btn_submitting: string;
  select_tier_placeholder: string;
  labels: {
    business_name: string;
    contact_name: string;
    email: string;
    phone: string;
    tier: string;
    message: string;
  };
  tiers: { value: string; label: string }[];
}

interface Props {
  content: FormContent;
}

export const PartnerForm = ({ content }: Props) => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    "business-name": "",
    "contact-name": "",
    email: "",
    phone: "",
    tier: "",
    message: "",
    "bot-field": "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const body = new URLSearchParams({
        "form-name": "partner-inquiry",
        ...formData,
      });

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:bg-muted/50 transition-all duration-200";

  if (status === "success") {
    return (
      <section id="partner-form" className="py-24 px-4 bg-background">
        <div className="container max-w-xl mx-auto text-center">
          <CheckCircle size={56} className="text-accent mx-auto mb-6" />
          <h2 className="font-display text-4xl uppercase mb-4 text-foreground">
            {content.success_message}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section id="partner-form" className="py-24 px-4 bg-background">
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-3">
            {content.section_label}
          </p>
          <h2 className="font-display text-4xl md:text-5xl uppercase text-foreground mb-4">
            {content.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {content.description}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card/40 p-8 space-y-5"
        >
          {/* Honeypot — hidden from humans */}
          <input
            name="bot-field"
            value={formData["bot-field"]}
            onChange={handleChange}
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-label font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                {content.labels.business_name} *
              </label>
              <input
                name="business-name"
                required
                value={formData["business-name"]}
                onChange={handleChange}
                placeholder="..."
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-label font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                {content.labels.contact_name} *
              </label>
              <input
                name="contact-name"
                required
                value={formData["contact-name"]}
                onChange={handleChange}
                placeholder="..."
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-label font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                {content.labels.email} *
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@yourbusiness.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-label font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                {content.labels.phone}
              </label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="..."
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-label font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
              {content.labels.tier} *
            </label>
            <select
              id="form-tier"
              name="tier"
              required
              value={formData.tier}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" disabled>{content.select_tier_placeholder}</option>
              {content.tiers.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-label font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
              {content.labels.message}
            </label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-400 text-center">
              Something went wrong. Try again or email us at howdy@macon-me-hungry-repo.pages.dev
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Send size={14} />
            {status === "submitting" ? content.submit_btn_submitting : content.submit_btn}
          </button>
        </form>
      </div>
    </section>
  );
};
