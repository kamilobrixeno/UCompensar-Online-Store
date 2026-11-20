import { useEffect, useMemo, useState } from 'react';
import {
  IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonSegment, IonSegmentButton,
  IonLabel, IonRange, IonSelect, IonSelectOption, IonSpinner, IonText, IonTitle, IonToolbar, useIonToast,
} from '@ionic/react';
import { cartOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import * as api from '../services/api';
import type { Product } from '../services/types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

type Sort = 'default' | 'price-asc' | 'price-desc' | 'title';

const Products: React.FC = () => {
  const history = useHistory();
  const { signOut, session } = useAuth();
  const { add, count } = useCart();
  const [toast] = useIonToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
    const list = products.filter((p) => p.price >= lower && p.price <= upper);
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, range, sort, bounds]);

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Productos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/cart')} aria-label="Carrito">
              <IonIcon slot="icon-only" icon={cartOutline} />
              {count > 0 && <IonBadge color="danger">{count}</IonBadge>}
            </IonButton>
            <IonButton onClick={() => void signOut()} aria-label="Cerrar sesión">
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment className="category-menu" scrollable value={category} onIonChange={(e) => setCategory(String(e.detail.value))}>
            <IonSegmentButton value="all"><IonLabel>Todos</IonLabel></IonSegmentButton>
            {categories.map((c) => (
              <IonSegmentButton key={c} value={c}><IonLabel>{c}</IonLabel></IonSegmentButton>
            ))}
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={async (e) => { await load(category); e.detail.complete(); }}>
          <IonRefresherContent />
        </IonRefresher>
        <IonText color="medium"><p className="ion-padding-horizontal">Hola, {session?.username}</p></IonText>
        {loading && <div className="ion-text-center ion-padding"><IonSpinner /></div>}
        {error && (
          <div className="ion-padding">
            <IonText color="danger"><p>{error}</p></IonText>
            <IonButton onClick={() => void load(category)}>Reintentar</IonButton>
          </div>
        )}
        {!loading && products.length > 0 && (
          <div className="filters">
            <div className="filter-price">
              <IonLabel>Precio: ${range?.lower ?? bounds.min} - ${range?.upper ?? bounds.max}</IonLabel>
              <IonRange
                dualKnobs
                min={bounds.min}
                max={bounds.max}
                value={{ lower: range?.lower ?? bounds.min, upper: range?.upper ?? bounds.max }}
                onIonInput={(e) => setRange(e.detail.value as { lower: number; upper: number })}
              />
            </div>
            <IonSelect
              className="filter-sort"
              label="Ordenar por"
              labelPlacement="stacked"
              interface="popover"
              value={sort}
              onIonChange={(e) => setSort(e.detail.value as Sort)}
            >
              <IonSelectOption value="default">Relevancia</IonSelectOption>
              <IonSelectOption value="price-asc">Precio: menor a mayor</IonSelectOption>
              <IonSelectOption value="price-desc">Precio: mayor a menor</IonSelectOption>
              <IonSelectOption value="title">Nombre (A-Z)</IonSelectOption>
            </IonSelect>
            <IonText color="medium"><small>{visible.length} de {products.length}</small></IonText>
          </div>
        )}
        {!loading && products.length > 0 && visible.length === 0 && (
          <IonText color="medium"><p className="ion-padding ion-text-center">No hay productos en ese rango de precio.</p></IonText>
        )}
        <div className="product-grid">
        {!loading && visible.map((p) => (
          <IonCard key={p.id}>
            <img src={p.image} alt={p.title} style={{ height: 180, objectFit: 'contain', width: '100%', background: '#fff' }}
              onClick={() => history.push(`/product/${p.id}`)} />
            <IonCardHeader>
              <IonCardSubtitle>{p.category}</IonCardSubtitle>
              <IonCardTitle style={{ fontSize: 16 }}>{p.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <b>${p.price.toFixed(2)}</b>
              <IonButton size="small" fill="outline" onClick={() => history.push(`/product/${p.id}`)}>Ver</IonButton>
              <IonButton size="small" onClick={() => { add(p); void toast({ message: 'Agregado al carrito', duration: 1000 }); }}>
                Agregar
              </IonButton>
            </IonCardContent>
          </IonCard>
        ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Products;
