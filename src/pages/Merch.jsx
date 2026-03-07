import { useMemo, useState } from "react";
import ShopCard from "@/components/ui/ShopCard.jsx";
import MerchCategoryBar from "@/components/layout/MerchBar.jsx";
import PurchaseSummary from "@/components/ui/PurchaseSummary.jsx";


const parsePrice = (price) => Number(String(price).replace("€", "").replace(",", "."));

function Merch() {
    // 1) Categorías
    const categories = useMemo(
        () => [
            { id: "nuevo", label: "Nuevo" },
            { id: "ropa", label: "Ropa" },
            { id: "accesorios", label: "Accesorios" },
            { id: "perfumes", label: "Perfumes" },
            { id: "libros", label: "Libros" },
            { id: "posters", label: "Posters" },
        ],
        []
    );

    // 2) Estado: categoría seleccionada
    const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? "ropa");
    const [searchTerm, setSearchTerm] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    // 3) “Modelo” de productos
    const products = useMemo(
        () => [
            {
                id: "camiseta-subsonic-2024",
                name: "Camiseta Subsonic 2024",
                categoryId: "ropa",
                categoryLabel: "Ropa",
                price: "29.99€",
                description: "Camiseta oficial del festival de 2024 con diseño exclusivo",
            },

            {
                id: "camiseta-subsonic-2025",
                name: "Camiseta Subsonic 2025",
                categoryId: ["nuevo", "ropa"],
                categoryLabel: "Nuevo, Ropa",
                price: "34.99€",
                description: "Camiseta oficial del festival de 2025 con diseño exclusivo",
            },

            {
                id: "tee-subsonic-2025",
                name: "Gorra Subsonic 2025",
                categoryId: ["nuevo", "accesorios"],
                categoryLabel: "Nuevo, Accesorios",
                price: "19.99€",
                description: "Gorra oficial del festival con diseño exclusivo",
            },

            {
                id: "perfume-subsonic",
                name: "Fragancia Subsonic",
                categoryId: "perfumes",
                categoryLabel: "Perfumes",
                price: "39.99€",
                description: "Edición limitada"
            },

            {
                id: "libro-subsonic",
                name: "Libro Subsonic 2025",
                categoryId: ["nuevo", "libros"],
                categoryLabel: "Nuevo, Libros",
                price: "11.99€",
                description: "Libro oficial del evento"
            },

            {
                id: "poster-subsonic",
                name: "Póster Subsonic 2025",
                categoryId: ["nuevo", "posters"],
                categoryLabel: "Nuevo, Posters",
                price: "14.99€",
                description: "Póster oficial"
            },
        ],
        []
    );

    const totalCartUnits = useMemo(
        () => cartItems.reduce((sum, item) => sum + Number(item.quantity ?? 0), 0),
        [cartItems]
    );

    const handleAddToCart = (payload) => {
        setCartItems((currentItems) => [
            ...currentItems,
            {
                ...payload,
                unitPrice: parsePrice(payload.product?.price),
            },
        ]);
    };

    // 4) Filtrado por categoría seleccionada
    const visibleProducts = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();

        return products
            .filter((p) => {
                const ids = Array.isArray(p.categoryId) ? p.categoryId : [p.categoryId];
                return ids.includes(activeCategoryId);
            })
            .filter((p) => {
                if (!q) return true;
                const haystack = `${p.name ?? ""}`.toLowerCase();
                return haystack.includes(q);
            });
    }, [products, activeCategoryId, searchTerm]);

    return (
        <section className="space-y-6 -mt-6 md:-mt-16">
            {/* Barra merch */}
            <div className="-mx-6 md:-mx-16">
                <MerchCategoryBar
                    categories={categories}
                    activeCategoryId={activeCategoryId}
                    onChangeCategory={setActiveCategoryId}
                    searchValue={searchTerm}
                    onChangeSearch={setSearchTerm}
                    onOpenPurchaseSummary={() => setIsSummaryOpen(true)}
                    cartCount={totalCartUnits}
                />
            </div>

            <header>
                <h1 className="text-4xl font-bold text-cyan-400">Merchandising</h1>
                <p className="text-subsonic-muted">Productos de ensueño de tus festivales favoritos</p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleProducts.map((p) => (
                    <ShopCard
                        key={p.id}
                        name={p.name}
                        category={p.categoryLabel}
                        price={p.price}
                        description={p.description}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>

            <PurchaseSummary
                open={isSummaryOpen}
                items={cartItems}
                onClose={() => setIsSummaryOpen(false)}
            />
        </section>
    );
}

export default Merch;


