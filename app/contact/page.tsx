export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <span className="badge">Contact</span>
      <h1 className="mt-4 font-serif text-4xl">Let’s talk beauty</h1>
      <p className="mt-3 text-sm text-deep/70">
        Reach us directly on social. Our team responds within 24-48 hours.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-deep/60">
        <a
          href="https://www.tiktok.com/@adismakeover?_r=1&_t=ZS-93YaMsSVVnV"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-rose/40 px-4 py-2"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M16.5 3c.6 2.2 2.3 3.9 4.5 4.5v3.1c-1.7 0-3.3-.5-4.5-1.3v6.2a6.3 6.3 0 1 1-5.9-6.3v3.3a3 3 0 1 0 2.6 3v-12h3.3z" />
          </svg>
          TikTok
        </a>
        <a
          href="https://snapchat.com/t/ODC0Ybvq"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-rose/40 px-4 py-2"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M12 3a4.5 4.5 0 0 0-4.5 4.5v4.1l-1.6 1a1.2 1.2 0 0 0 .2 2.1l1.9.6c.4 1.2 1.6 2.1 3 2.1h2c1.4 0 2.6-.9 3-2.1l1.9-.6a1.2 1.2 0 0 0 .2-2.1l-1.6-1V7.5A4.5 4.5 0 0 0 12 3z" />
          </svg>
          Snapchat
        </a>
        <a
          href="https://www.instagram.com/adiswigsandbeauty"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-rose/40 px-4 py-2"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm6-1.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
          </svg>
          Instagram
        </a>
        <a
          href="https://wa.me/message/TXUWI75XKGUVO1"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-rose/40 px-4 py-2"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M12 4a8 8 0 0 0-6.8 12.2L4 21l4.9-1.2A8 8 0 1 0 12 4zm4.2 11.2c-.2.6-1.2 1.1-1.7 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 1-2.3.3-.3.7-.4.9-.4h.7c.2 0 .5 0 .7.6.2.6.7 2 .8 2.2.1.2.1.4 0 .6-.1.2-.2.3-.3.5-.1.1-.3.3-.4.4-.1.2-.2.4 0 .7.2.3.9 1.5 2 2.4 1.4 1.1 2.6 1.4 2.9 1.5.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.5-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.2.6.3.1.1.1.6-.1 1.2z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
