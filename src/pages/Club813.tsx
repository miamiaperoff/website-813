import { useState } from 'react';
import { Wallet, QrCode, Store, CalendarX, Check, ArrowRight, Wifi, Armchair, Users } from 'lucide-react';
import Navigation from '@/components/Navigation.clean';
import Footer from '@/components/Footer';

const SIGNUP_URL = 'https://popup.ph/eight-thirteen-cafe/club813/signup';

const peso = (n: number) => `₱${n.toLocaleString('en-PH')}`;

type StateKey = 'full' | 'partial' | 'expiring' | 'empty';

const states: Record<StateKey, { label: string; balance: number; note: string; cta: string }> = {
  full: { label: 'Fresh month', balance: 2500, note: 'Credit added 1 Aug · valid until 31 Aug', cta: 'Show QR at checkout' },
  partial: { label: 'Mid-month', balance: 1180, note: `${peso(1320)} spent this month`, cta: 'Show QR at checkout' },
  expiring: { label: 'Expiring soon', balance: 640, note: 'Disappears 31 Aug, 11:59 PM', cta: 'Use it before month end' },
  empty: { label: 'Empty', balance: 0, note: 'Top up at the counter to keep going', cta: 'Ask staff for a top-up block' },
};

const BalancePanel = ({ state }: { state: StateKey }) => {
  const s = states[state];
  const pct = Math.round((s.balance / 2500) * 100);
  return (
    <div className="bg-primary text-primary-foreground p-8 rounded-sm shadow-warm">
      <div className="flex items-center justify-between mb-8">
        <span className="text-[10px] tracking-[0.2em] uppercase text-primary-foreground/50">Club 813 credit</span>
        <QrCode className="w-5 h-5 text-primary-foreground/60" />
      </div>
      <p className="font-serif text-6xl font-light leading-none">{peso(s.balance)}</p>
      <div className="h-px w-full bg-primary-foreground/15 my-6" />
      <div className="h-1 w-full bg-primary-foreground/15 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${state === 'expiring' ? 'bg-destructive' : 'bg-accent'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={`mt-6 text-sm ${state === 'expiring' ? 'text-accent' : 'text-primary-foreground/60'}`}>{s.note}</p>
      <p className="mt-8 text-[10px] tracking-[0.2em] uppercase text-primary-foreground/40">{s.cta}</p>
    </div>
  );
};

const Club813 = () => {
  const [active, setActive] = useState<StateKey>('full');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-52 pb-24">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-6">Club 813 · Monthly Credit</p>
          <h1 className="font-serif text-4xl md:text-6xl font-light italic leading-none text-foreground">
            Prepay your month.<br />Spend it like cash in store.
          </h1>
          <p className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Pay {peso(2500)} at the start of the month and get {peso(2500)} in credit for coffee and food at 813 Café.
            Real money at face value — no points, no exchange rate, no coupon codes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase font-medium text-primary-foreground bg-primary border border-primary px-10 py-4 hover:bg-primary/90 transition-colors"
            >
              Sign up — {peso(2500)}/month <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Unused credit expires at the end of your billing month. Use it or lose it.
          </p>
        </section>

        {/* Expiry disclosure */}
        <section className="max-w-3xl mx-auto px-6 lg:px-8 mt-20">
          <div className="border border-border bg-secondary/60 p-8 text-center rounded-sm">
            <CalendarX className="w-6 h-6 mx-auto text-foreground/70" />
            <h2 className="mt-4 text-sm tracking-[0.2em] uppercase text-foreground">Credit expires monthly</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Whatever you don't spend by the last day of your billing month disappears — it does not roll over.
              A fresh {peso(2500)} lands when the new month starts. We say this loudly on purpose: this membership is
              for people who are here most weeks.
            </p>
          </div>
        </section>

        {/* Balance panel states */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 mt-24">
          <div className="text-center mb-10">
            <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground">Your balance, always visible</h2>
            <p className="mt-4 font-serif text-2xl md:text-3xl font-light italic text-foreground">
              Open the app, see exactly what's left.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {(Object.keys(states) as StateKey[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setActive(k)}
                    className={`text-[10px] tracking-[0.15em] uppercase px-4 py-2 border transition-colors ${
                      active === k
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {states[k].label}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Full right after billing, partly spent mid-month, counting down near the end, and empty when it's time
                to top up. No guessing, no asking the cashier.
              </p>
            </div>
            <BalancePanel state={active} />
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 mt-28">
          <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-4 gap-10">
            {[
              { icon: Wallet, title: 'Join at the counter', body: `Pay ${peso(2500)} for the month. Your credit lands immediately.` },
              { icon: QrCode, title: 'Give your number', body: 'Or show your member QR in the app. That is the whole checkout flow.' },
              { icon: Store, title: 'Credit pays the bill', body: 'It works like payment, not a discount — split the rest with cash or QRPh.' },
              { icon: Check, title: 'Top up when empty', body: 'Buy another block at the counter with staff and keep going.' },
            ].map((s) => (
              <div key={s.title}>
                <s.icon className="w-5 h-5 text-foreground/70" />
                <h3 className="mt-4 text-sm font-medium text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Member benefits */}
        <section className="max-w-5xl mx-auto px-6 lg:px-8 mt-28">
          <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground text-center mb-12">Member benefits</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Wifi, title: 'Fast, 24/7 WiFi access', body: 'Reliable high-speed internet around the clock, so you can work, stream, or meet anytime.' },
              { icon: Armchair, title: 'Dedicated space reserved for you', body: 'A seat in the club workspace that is set aside for members, not just first-come-first-served.' },
              { icon: Users, title: 'Exclusive at 13 members', body: 'Once the club hits 13 members, the workspace becomes members-only — a quieter, more private environment.' },
            ].map((s) => (
              <div key={s.title}>
                <s.icon className="w-5 h-5 text-foreground/70" />
                <h3 className="mt-4 text-sm font-medium text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Top-up blocks */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mt-28">
          <div className="border-t border-border pt-12">
            <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground text-center">Top-up blocks</h2>
            <p className="mt-4 text-sm text-muted-foreground text-center max-w-xl mx-auto">
              Ran out before month end? Buy another block at the counter. Larger blocks can carry a bonus, so you get
              more credit than you paid. Block sizes are confirmed in store.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              <div className="border border-border p-8 text-center">
                <p className="font-serif text-3xl font-light text-foreground">{peso(2500)}</p>
                <p className="mt-2 text-sm text-muted-foreground">{peso(2500)} of credit</p>
              </div>
              <div className="border border-primary p-8 text-center bg-secondary/50 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-block text-[10px] tracking-[0.15em] uppercase bg-primary text-primary-foreground px-4 py-1">
                  Intro offer · expires Sept 1, 2026
                </span>
                <p className="font-serif text-3xl font-light text-foreground">{peso(4700)}</p>
                <p className="mt-2 text-sm text-muted-foreground">{peso(5000)} of credit · {peso(300)} bonus</p>
              </div>
            </div>
            <p className="mt-6 text-xs text-muted-foreground text-center">
              Top-ups are handled by staff at the counter — there's no card on file and nothing charges automatically.
            </p>
          </div>
        </section>

        {/* Honest limits */}
        <section className="max-w-3xl mx-auto px-6 lg:px-8 mt-24">
          <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground text-center mb-8">Good to know</h2>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="border-b border-border pb-4">Credit is spendable in store only — it doesn't apply to online orders yet.</li>
            <li className="border-b border-border pb-4">There's no auto-renew and no stored card. Staff renew your membership at the counter.</li>
            <li className="border-b border-border pb-4">Top-ups are bought in person, not in the app.</li>
            <li className="pb-4">Club 813 credit is separate from Pass Club loyalty — two different things, no conversion between them.</li>
          </ul>
        </section>

        {/* Final CTA */}
        <section className="max-w-3xl mx-auto px-6 lg:px-8 mt-24 text-center">
          <p className="font-serif text-3xl md:text-4xl font-light italic text-foreground">
            {peso(2500)} in, {peso(2500)} to spend.
          </p>
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase font-medium text-primary-foreground bg-primary border border-primary px-12 py-4 hover:bg-primary/90 transition-colors"
          >
            Sign up for Club 813 <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Club813;