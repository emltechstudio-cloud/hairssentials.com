import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Heart,
  Leaf,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

const onWebDevPreview = window.location.hostname.endsWith(".manus.computer");
const assets = onWebDevPreview
  ? {
      hero: "/manus-storage/hero-optimized_02e688d0.jpg",
      cream: "/manus-storage/curl-cream-optimized_0ee39658.jpg",
      leaveIn: "/manus-storage/leave-in-optimized_4a7f7853.jpg",
      scalpOil: "/manus-storage/scalp-oil-optimized_09f75af9.jpg",
    }
  : {
      hero: "./images/hero.jpg",
      cream: "./images/curl-cream.jpg",
      leaveIn: "./images/leave-in.jpg",
      scalpOil: "./images/scalp-oil.jpg",
    };

type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  size: string;
  price: number;
  image: string;
  alt: string;
  tone: string;
  note: string;
};

const products: Product[] = [
  {
    id: "curl-cream",
    name: "Cloud Curl Cream",
    description: "A cushion-soft styling cream for touchable definition.",
    category: "Style",
    size: "Sample · 240 ml",
    price: 18,
    image: assets.cream,
    alt: "Unbranded ivory jar with a muted green lid on a sunlit peach pedestal",
    tone: "peach",
    note: "DEFINITION",
  },
  {
    id: "leave-in",
    name: "Everyday Slip Leave-In",
    description: "Lightweight moisture for easy detangling and softer-feeling lengths.",
    category: "Hydrate",
    size: "Sample · 250 ml",
    price: 22,
    image: assets.leaveIn,
    alt: "Unbranded frosted amber pump bottle with soft cotton and green foliage",
    tone: "butter",
    note: "MOISTURE",
  },
  {
    id: "scalp-oil",
    name: "Root Ritual Scalp Oil",
    description: "A slow, soothing pre-wash ritual for your scalp-care routine.",
    category: "Treat",
    size: "Sample · 60 ml",
    price: 16,
    image: assets.scalpOil,
    alt: "Unbranded amber dropper bottle set among botanical leaves in soft light",
    tone: "sage",
    note: "SCALP CARE",
  },
  {
    id: "washday-kit",
    name: "Soft Set Washday Kit",
    description: "A considered little trio to make washday feel like a reset.",
    category: "Sets",
    size: "Sample · 3-piece set",
    price: 42,
    image: assets.cream,
    alt: "A sample hair-care jar styled on a warm peach pedestal",
    tone: "pink",
    note: "THE ROUTINE",
  },
  {
    id: "hair-milk",
    name: "Golden Hour Hair Milk",
    description: "A light finishing layer for softness, shine and a little slip.",
    category: "Hydrate",
    size: "Sample · 180 ml",
    price: 20,
    image: assets.leaveIn,
    alt: "An unbranded frosted pump bottle in warm studio light",
    tone: "lavender",
    note: "DAILY CARE",
  },
  {
    id: "reset-wash",
    name: "Sunday Reset Wash",
    description: "A gentle-cleansing concept for the start of your next routine.",
    category: "Cleanse",
    size: "Sample · 300 ml",
    price: 19,
    image: assets.scalpOil,
    alt: "An unbranded amber bottle against a calm sage background",
    tone: "sand",
    note: "WASHDAY",
  },
];

const filters = ["All", "Cleanse", "Hydrate", "Style", "Treat", "Sets"];
const money = (amount: number) => `$${amount.toFixed(2)}`;

type CartLine = { id: string; quantity: number };

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = activeFilter === "All" || product.category === activeFilter;
      const matchesSearch = !term || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, search]);

  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const cartTotal = cart.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.id);
    return sum + (product?.price ?? 0) * line.quantity;
  }, 0);

  useEffect(() => {
    if (window.location.pathname === "/catalog.html") {
      window.requestAnimationFrame(() => document.getElementById("shop")?.scrollIntoView());
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCartOpen(false);
        setQuickView(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((line) => line.id === product.id);
      return existing
        ? current.map((line) => line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { id: product.id, quantity: 1 }];
    });
    setQuickView(null);
    setCartOpen(true);
  };

  const changeQuantity = (id: string, difference: number) => {
    setCart((current) => current
      .map((line) => line.id === id ? { ...line, quantity: line.quantity + difference } : line)
      .filter((line) => line.quantity > 0));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
  };

  const submitSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignupMessage("This preview form is not connected — no email was sent.");
  };

  return (
    <div className="site-shell">
      <div className="preview-bar">
        <span className="preview-dot" />
        <span><strong>Portfolio preview</strong><span className="preview-separator">·</span>Concept products and sample pricing · No orders or payments</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Hairssentials home">
          <span className="brand-mark"><span /><span /><span /></span>
          <span>hairssentials</span>
        </a>
        <button className="mobile-menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop the edit</a>
          <a href="#ritual" onClick={() => setMenuOpen(false)}>Our approach</a>
          <a href="#notes" onClick={() => setMenuOpen(false)}>Notes</a>
        </nav>
        <button className="bag-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Open demo bag, ${itemCount} items`}>
          <span>Bag</span><ShoppingBag size={18} strokeWidth={1.65} /><span className="bag-count">{itemCount}</span>
        </button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" />CARE THAT MEETS YOU WHERE YOU ARE</div>
            <h1>Good hair days,<br /><em>on your own</em><br />terms.</h1>
            <p className="hero-intro">A softer, simpler approach to caring for every coil, curl and in-between day.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#shop">Explore the edit <ArrowRight size={17} /></a>
              <a className="text-link" href="#ritual">Our point of view <ArrowDownRight size={16} /></a>
            </div>
            <div className="hero-footnote"><Sparkles size={15} /><span>Thoughtful routines. Room for your real life.</span></div>
          </div>
          <div className="hero-visual">
            <img src={assets.hero} alt="A woman with natural, defined curls in warm afternoon light" />
            <div className="hero-image-wash" />
            <div className="hero-sticker"><span>made for</span><strong>your<br />texture</strong><Leaf size={16} /></div>
            <div className="image-caption"><span>THE EVERYDAY EDIT</span><span>01 / 03</span></div>
          </div>
          <div className="hero-side-note" aria-hidden="true">YOUR TEXTURE, YOUR RHYTHM</div>
        </section>

        <section className="belief-strip" aria-label="Our values">
          <div><span className="belief-number">01</span><span>Care, not complexity</span></div>
          <div><span className="belief-number">02</span><span>Made for texture</span></div>
          <div><span className="belief-number">03</span><span>Room to be yourself</span></div>
        </section>

        <section className="shop-section section-wrap" id="shop">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" />THE SAMPLE COLLECTION</div>
              <h2>A little care goes<br /><em>a long way.</em></h2>
            </div>
            <p className="section-aside">Start with what your hair needs today. Add the rest when it feels right.</p>
          </div>

          <div className="catalog-tools">
            <div className="filter-list" role="group" aria-label="Filter sample products by category">
              {filters.map((filter) => (
                <button key={filter} type="button" className={`filter-chip ${activeFilter === filter ? "active" : ""}`} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>
              ))}
            </div>
            <label className="search-field">
              <Search size={17} aria-hidden="true" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Find your feel" aria-label="Search sample products" />
            </label>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product, index) => (
                <article className="product-card" key={product.id} style={{ animationDelay: `${index * 45}ms` }}>
                  <div className={`product-art tone-${product.tone}`}>
                    <button className="product-image-button" type="button" onClick={() => setQuickView(product)} aria-label={`View ${product.name}`}>
                      <img src={product.image} alt={product.alt} loading="lazy" />
                    </button>
                    <span className="product-note">{product.note}</span>
                    <span className="concept-tag">SAMPLE</span>
                    <button className={`favorite-button ${favorites.includes(product.id) ? "is-favorite" : ""}`} type="button" aria-label={favorites.includes(product.id) ? `Remove ${product.name} from saved items` : `Save ${product.name}`} aria-pressed={favorites.includes(product.id)} onClick={() => toggleFavorite(product.id)}><Heart size={17} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
                    <button className="quick-view-link" type="button" onClick={() => setQuickView(product)}>Quick view <ArrowRight size={14} /></button>
                  </div>
                  <div className="product-info">
                    <div className="product-title-row"><h3>{product.name}</h3><span className="sample-price">{money(product.price)}*</span></div>
                    <p>{product.description}</p>
                    <div className="product-buy-row"><span>{product.size}</span><button type="button" className="add-button" onClick={() => addToCart(product)} aria-label={`Add sample ${product.name} to demo bag`}><Plus size={16} /><span>Add sample</span></button></div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state"><span className="empty-icon"><Search size={20} /></span><h3>No sample products found</h3><p>Try a different word or category.</p><button className="text-link" type="button" onClick={() => { setSearch(""); setActiveFilter("All"); }}>Clear filters <ArrowRight size={15} /></button></div>
          )}
          <div className="price-disclaimer">*Sample price for presentation only. Products, pricing and availability are not real.</div>
        </section>

        <section className="ritual-section" id="ritual">
          <div className="ritual-art"><div className="ritual-orbit orbit-one" /><div className="ritual-orbit orbit-two" /><div className="ritual-leaf"><Leaf size={61} strokeWidth={0.9} /></div><span className="ritual-vertical">A GENTLER KIND OF ROUTINE</span><span className="ritual-small-label">CARE, WITHOUT THE RULEBOOK</span></div>
          <div className="ritual-copy">
            <div className="eyebrow"><span className="eyebrow-line" />OUR APPROACH</div>
            <h2>Let your hair<br />be <em>your hair.</em></h2>
            <p>We think good care should feel like an invitation, not another set of rules. Start with a small ritual. Keep what works. Make it yours.</p>
            <a className="button button-outline" href="#notes">A note on our philosophy <ArrowRight size={16} /></a>
            <div className="ritual-caption"><span>LESS ROUTINE PRESSURE</span><span>MORE ROOM TO PLAY</span></div>
          </div>
        </section>

        <section className="notes-section section-wrap" id="notes">
          <div className="notes-topline"><div className="eyebrow"><span className="eyebrow-line" />A FEW GOOD REMINDERS</div><span className="note-index">FIELD NOTES / 001</span></div>
          <div className="notes-grid">
            <h2>Care is a<br /><em>conversation.</em></h2>
            <div className="note-content"><p>Your hair gets to change with the weather, the season and the season of life you’re in. There isn’t one right way to care for it—only the way that feels good to you.</p><a className="text-link" href="#shop">Find your starting point <ArrowRight size={16} /></a></div>
            <div className="note-stamp"><span>GOOD<br />THINGS<br />TAKE TIME</span><Leaf size={23} /></div>
          </div>
        </section>

        <section className="signup-section">
          <div className="signup-mark"><Sparkles size={26} strokeWidth={1.15} /></div>
          <div className="signup-copy"><span className="eyebrow">A NOTE NOW AND THEN</span><h2>Good things in your inbox.</h2><p>Sign-up is a visual demo only; it does not store or send your email.</p></div>
          <form className="signup-form" onSubmit={submitSignup}>
            <label className="sr-only" htmlFor="demo-email">Email address</label>
            <input id="demo-email" type="email" placeholder="Your email address" autoComplete="email" required />
            <button type="submit" aria-label="Preview newsletter signup"><ArrowRight size={20} /></button>
            {signupMessage && <span className="signup-feedback" role="status"><Check size={14} />{signupMessage}</span>}
          </form>
          <div className="signup-squiggle" aria-hidden="true">✳</div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-block"><a className="brand footer-brand" href="#top"><span className="brand-mark"><span /><span /><span /></span><span>hairssentials</span></a><p>Make room for your own kind of good hair day.</p></div>
          <div className="footer-column"><span className="footer-label">EXPLORE</span><a href="#shop">Sample collection</a><a href="#ritual">Our approach</a><a href="#notes">Field notes</a></div>
          <div className="footer-column"><span className="footer-label">DEMO DETAILS</span><span>Illustrative product concepts</span><span>No live checkout or fulfilment</span><span>Built as a portfolio preview</span></div>
          <div className="footer-colophon"><span className="footer-label">A LITTLE NOTE</span><p>Swap in the real brand story, product information, photography and contact details before a public launch.</p><a href="#top" className="back-top">Back to top <ArrowRight size={15} /></a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Hairssentials · Demo concept</span><span>Made with care, not claims.</span></div>
      </footer>

      {cartOpen && (
        <div className="overlay-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="drawer-heading"><div><span className="eyebrow">YOUR SAMPLE BAG</span><h2 id="cart-title">A little edit</h2></div><button className="icon-close" type="button" aria-label="Close demo bag" onClick={() => setCartOpen(false)}><X size={20} /></button></div>
            <div className="drawer-disclaimer"><Sparkles size={15} />This is a demo bag. Nothing is purchased or saved.</div>
            {cart.length === 0 ? (
              <div className="cart-empty"><span className="empty-icon"><ShoppingBag size={22} /></span><h3>Your bag is taking a breather.</h3><p>Add a sample item to see the interaction.</p><button className="button button-dark" type="button" onClick={() => { setCartOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>Browse samples <ArrowRight size={16} /></button></div>
            ) : (
              <>
                <div className="cart-lines">{cart.map((line) => {
                  const product = products.find((item) => item.id === line.id);
                  if (!product) return null;
                  return <div className="cart-line" key={line.id}><img src={product.image} alt="" /><div className="cart-line-info"><h3>{product.name}</h3><span>Sample · {money(product.price)}</span><div className="quantity-control"><button type="button" aria-label={`Remove one ${product.name}`} onClick={() => changeQuantity(line.id, -1)}><Minus size={13} /></button><span>{line.quantity}</span><button type="button" aria-label={`Add one ${product.name}`} onClick={() => changeQuantity(line.id, 1)}><Plus size={13} /></button></div></div><strong>{money(product.price * line.quantity)}</strong></div>;
                })}</div>
                <div className="cart-summary"><div><span>Sample subtotal</span><strong>{money(cartTotal)}</strong></div><p>Illustrative totals only. Checkout is not connected.</p><button className="button checkout-disabled" type="button" disabled>Checkout unavailable in demo</button><button className="continue-shopping" type="button" onClick={() => setCartOpen(false)}>Continue browsing</button></div>
              </>
            )}
          </aside>
        </div>
      )}

      {quickView && (
        <div className="overlay-layer quick-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setQuickView(null); }}>
          <section className="quick-modal" role="dialog" aria-modal="true" aria-labelledby="quick-title">
            <button className="icon-close quick-close" type="button" aria-label="Close product preview" onClick={() => setQuickView(null)}><X size={20} /></button>
            <div className={`quick-image tone-${quickView.tone}`}><img src={quickView.image} alt={quickView.alt} /></div>
            <div className="quick-content"><span className="eyebrow">SAMPLE CONCEPT · {quickView.category.toUpperCase()}</span><h2 id="quick-title">{quickView.name}</h2><p>{quickView.description}</p><span className="quick-size">{quickView.size}</span><div className="quick-price-row"><strong>{money(quickView.price)}*</strong><span>Sample price</span></div><button className="button button-dark" type="button" onClick={() => addToCart(quickView)}>Add sample to demo bag <Plus size={16} /></button><p className="quick-disclaimer">An illustrative product concept. Not available for purchase.</p></div>
          </section>
        </div>
      )}
    </div>
  );
}
