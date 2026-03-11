import { useState, useMemo } from "react";
import ShopCard from "@/components/ui/ShopCard.jsx";
import MerchCategoryBar from "@/components/layout/MerchBar.jsx";
import PurchaseSummary from "@/components/ui/PurchaseSummary.jsx";
import merchandisingData from "@/data/merchandising.json";


const parsePrice = (price) => Number(String(price).replace("€", "").replace(",", "."));

const normalizeOptions = (selectedOptions = {}) =>
    Object.entries(selectedOptions)
        .sort(([a], [b]) => a.localeCompare(b))
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

const buildCartItemKey = (productName, selectedOptions = {}) =>
    `${productName}__${JSON.stringify(normalizeOptions(selectedOptions))}`;

function Merch() {
    // 1) Categorías y productos desde el JSON de merchandising
    const categories = merchandisingData.categories ?? [];
    const products = merchandisingData.products ?? [];

    // 2) Estado: categoría seleccionada
    const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? "ropa");
    const [searchTerm, setSearchTerm] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    const totalCartUnits = useMemo(
        () => cartItems.reduce((sum, item) => sum + Number(item.quantity ?? 0), 0),
        [cartItems]
    );

    const handleAddToCart = ({ product, quantity, selectedOptions }) => {
        const normalizedOptions = normalizeOptions(selectedOptions);
        const itemKey = buildCartItemKey(product.name, normalizedOptions);
        const unitPrice = parsePrice(product.price);

        setCartItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.key === itemKey);

            if (existingItem) {
                return currentItems.map((item) => {
                    if (item.key !== itemKey) {
                        return item;
                    }
                    const newQuantity = item.quantity + quantity;
                    return {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: item.unitPrice * newQuantity,
                    };
                });
            }

            return [
                ...currentItems,
                {
                    key: itemKey,
                    productName: product.name,
                    productCategory: product.category,
                    quantity,
                    unitPrice,
                    totalPrice: unitPrice * quantity,
                    selectedOptions: normalizedOptions,
                },
            ];
        });
    };

    const updateCartItemQuantity = (itemKey, nextQuantity) => {
        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.key === itemKey
                        ? {
                            ...item,
                            quantity: nextQuantity,
                            totalPrice: item.unitPrice * nextQuantity,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const handleIncreaseItem = (itemKey) => {
        const target = cartItems.find((item) => item.key === itemKey);
        if (!target || target.quantity > 19) return;
        updateCartItemQuantity(itemKey, target.quantity + 1);
    };

    const handleDecreaseItem = (itemKey) => {
        const target = cartItems.find((item) => item.key === itemKey);
        if (!target) return;
        updateCartItemQuantity(itemKey, target.quantity - 1);
    };

    // 3) Filtrado por categoría seleccionada
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
                <h1 className="text-4xl font-su text-subsonic-accent">Merchandising</h1>
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
                        purchaseOptions={p.purchaseOptions}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>

            <PurchaseSummary
                open={isSummaryOpen}
                items={cartItems}
                onClose={() => setIsSummaryOpen(false)}
                onIncreaseItem={handleIncreaseItem}
                onDecreaseItem={handleDecreaseItem}
            />
        </section>
    );
}

export default Merch;
