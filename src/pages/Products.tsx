import { useEffect, useMemo, useState } from 'react';
import { IonContent, IonIcon, IonPage, IonRange, IonRefresher, IonRefresherContent, IonSpinner, useIonToast } from '@ionic/react';
import { star } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import * as api from '../services/api';
import type { Product } from '../services/types';
import { useCart } from '../context/CartContext';
import StoreHeader from '../components/StoreHeader';

type Sort = 'default' | 'price-asc' | 'price-desc' | 'title';

const money = (n: number) => `$ ${n.toFixed(2)}`;

const Products: React.FC = () => {
  const history = useHistory();
  const { add } = useCart();
  const [toast] = useIonToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [range, setRange] = useState<{ lower: number; upper: number } | null>(null);
  const [sort, setSort] = useState<Sort>('default');

  const bounds = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((p) => p.price);
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [products]);

  useEffect(() => {
    setRange({ lower: bounds.min, upper: bounds.max });
  }, [bounds.min, bounds.max]);

  const visible = useMemo(() => {
    const lower = range?.lower ?? bounds.min;
    const upper = range?.upper ?? bounds.max;
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) => p.price >= lower && p.price <= upper && (!q || p.title.toLowerCase().includes(q)),
    );
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, range, sort, bounds, query]);

  const load = async (cat: string) => {
    setLoading(true);
    setError('');
    try {
      setProducts(cat === 'all' ? await api.getProducts() : await api.getProductsByCategory(cat));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No fue posible cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    void load(category);
  }, [category]);

  const lower = range?.lower ?? bounds.min;
  const upper = range?.upper ?? bounds.max;

  return (
    <IonPage>
      <StoreHeader search={query} onSearch={setQuery}>
        <nav className="ml-chips" aria-label="Categorías">
          {['all', ...categories].map((c) => (
            <button key={c} className={`ml-chip${c === category ? ' is-active' : ''}`} onClick={() => setCategory(c)}>
              {c === 'all' ? 'Todos' : c}
            </button>
          ))}
        </nav>
      </StoreHeader>
      <IonContent className="ml-content">
        <IonRefresher slot="fixed" onIonRefresh={async (e) => { await load(category); e.detail.complete(); }}>
          <IonRefresherContent />
        </IonRefresher>
        <div className="ml-layout">
          <aside className="ml-sidebar">
            <h3>{category === 'all' ? 'Todos los productos' : category}</h3>
            <p className="ml-muted">{visible.length} resultados</p>
            <h4>Precio</h4>
            {products.length > 0 && (
              <>
                <IonRange
                  dualKnobs
                  min={bounds.min}
                  max={bounds.max}
                  value={{ lower, upper }}
                  onIonInput={(e) => setRange(e.detail.value as { lower: number; upper: number })}
                />
                <div className="ml-range-values"><span>{money(lower)}</span><span>{money(upper)}</span></div>
              </>
            )}
            <h4>Ordenar por</h4>
            <div className="ml-sort">
              {([
                ['default', 'Más relevantes'],
                ['price-asc', 'Menor precio'],
                ['price-desc', 'Mayor precio'],
                ['title', 'Nombre (A-Z)'],
              ] as [Sort, string][]).map(([value, label]) => (
                <button key={value} className={sort === value ? 'is-active' : ''} onClick={() => setSort(value)}>
                  {label}
                </button>
              ))}
            </div>
          </aside>

          <section className="ml-results">
            {loading && <div className="ion-text-center ion-padding"><IonSpinner /></div>}
            {error && (
              <div className="ml-card ml-message">
                <p>{error}</p>
                <button className="ml-btn" onClick={() => void load(category)}>Reintentar</button>
              </div>
            )}
            {!loading && !error && visible.length === 0 && (
              <div className="ml-card ml-message"><p>No encontramos productos con esos filtros.</p></div>
            )}
            <div className="product-grid">
              {!loading && visible.map((p) => (
                <article key={p.id} className="ml-product">
                  <button className="ml-product__img" onClick={() => history.push(`/product/${p.id}`)} aria-label={p.title}>
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </button>
                  <div className="ml-product__body">
                    <span className="ml-product__cat">{p.category}</span>
                    <h3 className="ml-product__title" onClick={() => history.push(`/product/${p.id}`)}>{p.title}</h3>
                    <div className="ml-product__price">{money(p.price)}</div>
                    {p.rating && (
                      <div className="ml-rating">
                        <IonIcon icon={star} /> {p.rating.rate} <span>({p.rating.count})</span>
                      </div>
                    )}
                    <button
                      className="ml-btn ml-btn--block"
                      onClick={() => { add(p); void toast({ message: 'Agregado al carrito', duration: 1000 }); }}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Products;