import { useState } from "react";
import { useStore } from "@nanostores/react";
import {
  $itineraryStore,
  removeFromItinerary,
  clearItinerary,
  getItineraryShareUrl,
} from "@/stores/itineraryStore";
import { Share2, X, Trash2, Check, Sparkles, MapPin } from "lucide-react";

interface DirectoryItem {
  id: string;
  data: {
    title: string;
    neighborhood: string;
    category: string;
  };
}

interface ItineraryBarProps {
  businesses: DirectoryItem[];
}

export const ItineraryBar = ({ businesses }: ItineraryBarProps) => {
  const itinerary = useStore($itineraryStore);
  const lang = "en";
  

  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (itinerary.length === 0) return null;

  const selectedBusinesses = itinerary
    .map((id) => businesses.find((b) => b.id === id))
    .filter(Boolean) as DirectoryItem[];

  const handleCopyLink = () => {
    const url = getItineraryShareUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <>
      {/* Floating Action Pill */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-bounce-short">
        <div className="flex items-center gap-2 p-1.5 pl-4 pr-2 bg-card/95 border border-primary/40 rounded-full shadow-2xl backdrop-blur-md glow-primary">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors font-label"
          >
            <span className="text-base">🍷</span>
            <span>
              {`Night Out Plan (${itinerary.length})`}
            </span>
          </button>

          <button
            onClick={handleCopyLink}
            className="px-3 py-2 bg-primary text-primary-foreground rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:scale-105 transition-transform"
          >
            {copied ? <Check size={14} /> : <Share2 size={14} />}
            <span>{copied ? ("Copied!") : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Itinerary Modal / Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl animate-scale-up text-card-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-primary" />
                <h3 className="font-display text-xl uppercase text-foreground">
                  {"Your Night Out Plan"}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Selected Venues List */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 mb-6">
              {selectedBusinesses.map((biz, idx) => (
                <div
                  key={biz.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/60"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-foreground truncate uppercase">
                        {biz.data.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <MapPin size={10} className="text-primary" />
                        <span>{biz.data.neighborhood}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromItinerary(biz.id)}
                    className="p-1.5 text-muted-foreground hover:text-rose-500 transition-colors"
                    aria-label="Remove"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="space-y-2.5 pt-2 border-t border-border">
              <button
                onClick={handleCopyLink}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 glow-primary hover:scale-[1.01] transition-all font-label"
              >
                {copied ? <Check size={16} /> : <Share2 size={16} />}
                <span>
                  {copied
                    ? "Link Copied to Clipboard!"
                    : "Copy Shareable Itinerary Link"}
                </span>
              </button>

              <button
                onClick={() => {
                  clearItinerary();
                  setIsOpen(false);
                }}
                className="w-full py-2.5 text-muted-foreground hover:text-rose-500 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors font-label"
              >
                <Trash2 size={14} />
                <span>{"Clear Plan"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
