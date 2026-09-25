import { ArrowRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import logoMark from "../assets/wellsprings-footer-lockup.png";

const SITE_EMAIL = "hello@wellspringsacademy.in";
const SITE_CBSE = "831719";
const SITE_ADDRESS = {
  line1: "Sy No. 146/1,2,3, Mugalur Village",
  line2: "Sarjapura – Chikka Thirupathi Road, Anekal Taluk",
  city: "Bengaluru, Karnataka 562125",
} as const;

const SITE_MAPS_URL = "https://maps.app.goo.gl/5Rf3x63P44TbHyJi9";
const SITE_WEB = "https://www.wellspringsacademy.in";

const SOCIAL = [
  { name: "Instagram", href: "https://www.instagram.com/wellspringsacademy/?hl=en" },
  { name: "Facebook", href: "https://www.facebook.com/wellspringsacademy" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCK7nUTFa3JUSFuwm1364u8g" },
] as const;

function SocialMark({ name }: { name: (typeof SOCIAL)[number]["name"] }) {
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
      </svg>
    );
  }
  if (name === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M14.2 8.5h2.3V5.8h-2.3c-2.1 0-3.7 1.7-3.7 3.8v1.7H8.2v2.7h2.3V20h2.8v-6h2.4l.4-2.7h-2.8V9.6c0-.6.4-1.1 1-1.1z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.2 12.2s0-2.8-.4-4.1c-.2-.8-.8-1.4-1.6-1.6C18.8 6.1 12 6.1 12 6.1s-6.8 0-8.2.4c-.8.2-1.4.8-1.6 1.6C1.8 9.4 1.8 12.2 1.8 12.2s0 2.8.4 4.1c.2.8.8 1.4 1.6 1.6 1.4.4 8.2.4 8.2.4s6.8 0 8.2-.4c.8-.2 1.4-.8 1.6-1.6.4-1.3.4-4.1.4-4.1zM9.9 15.3V9.1l5.4 3.1-5.4 3.1z"
      />
    </svg>
  );
}

export function VisitClose() {
  return (
    <article className="br-visit">
      <div className="br-visit-hero">
        <div className="br-visit-lead">
          <p className="br-visit-kicker">Visit us</p>
          <h1 className="br-visit-title">
            Bring your child.
            <br />
            Ask the questions that matter to your family.
          </h1>
          <p className="br-visit-support">
            Our admissions team will help you understand the school and guide you through the
            admission process.
          </p>
        </div>
        <a className="br-visit-call" href="tel:+916366361707">
          <Phone size={18} strokeWidth={2} />
          +91 63663 61707
        </a>
        <p className="br-visit-admit">Admissions open for 2027–28</p>
      </div>

      <div className="br-visit-body">
        <div className="br-visit-block">
          <p className="br-visit-label is-address">Address</p>
          <address className="br-visit-address">
            Wellsprings Academy, {SITE_ADDRESS.line1}, {SITE_ADDRESS.line2}, {SITE_ADDRESS.city}
          </address>
          <a className="br-visit-link" href={SITE_MAPS_URL} target="_blank" rel="noreferrer">
            <MapPin size={16} strokeWidth={2} />
            Open in Google Maps
            <ArrowRight className="br-visit-arrow" size={15} strokeWidth={2} />
          </a>
        </div>

        <div className="br-visit-split">
          <div className="br-visit-block">
            <p className="br-visit-label is-email">Email</p>
            <a className="br-visit-mail" href={`mailto:${SITE_EMAIL}`}>
              <Mail size={16} strokeWidth={1.8} />
              {SITE_EMAIL}
            </a>
          </div>
          <div className="br-visit-block">
            <p className="br-visit-label is-web">Website</p>
            <a className="br-visit-link" href={SITE_WEB} target="_blank" rel="noreferrer">
              <Globe size={16} strokeWidth={1.8} />
              Visit website
              <ArrowRight className="br-visit-arrow" size={15} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="br-visit-block">
          <p className="br-visit-label is-social">Social</p>
          <nav className="br-visit-social" aria-label="Social">
            {SOCIAL.map((item) => (
              <a key={item.name} href={item.href} target="_blank" rel="noreferrer">
                <SocialMark name={item.name} />
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        <footer className="br-visit-foot">
          <img src={logoMark} alt="Wellsprings Academy. Think. Build. Belong." />
          <p className="br-visit-cbse">
            CBSE affiliation
            <br />
            no. {SITE_CBSE}
          </p>
        </footer>
      </div>
    </article>
  );
}
