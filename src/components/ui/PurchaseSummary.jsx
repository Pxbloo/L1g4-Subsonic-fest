import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

const formatCurrency = (value) =>
    value.toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
    });

function PurchaseSummary({ open, items = [], onClose }) {
    const navigate = useNavigate();

    const groupedItems = useMemo(() => {
        const groups = new Map();

        items.forEach((item) => {
            const name = item.product?.name ?? "Producto";
            const size = item.size ?? "-";
            const color = item.color ?? "-";
            const unitPrice = Number(item.unitPrice ?? 0);
            const quantity = Number(item.quantity ?? 0);

            const key = `${name}__${size}__${color}`;

            if (!groups.has(key)) {
                groups.set(key, {
                    key,
                    name,
                    size,
                    color,
                    quantity: 0,
                    unitPrice,
                    totalPrice: 0,
                });
            }

            const currentGroup = groups.get(key);
            currentGroup.quantity += quantity;
            currentGroup.totalPrice += unitPrice * quantity;
        });

        return Array.from(groups.values());
    }, [items]);

    const totalAmount = useMemo(
        () => groupedItems.reduce((sum, item) => sum + item.totalPrice, 0),
        [groupedItems]
    );

    const totalUnits = useMemo(
        () => groupedItems.reduce((sum, item) => sum + item.quantity, 0),
        [groupedItems]
    );

    const handleGoToPayment = () => {
        navigate("/checkout", {
            state: {
                orderItems: groupedItems.map((item, index) => ({
                    id: `${item.key}-${index}`,
                    name: item.name,
                    category: `Talla: ${item.size} · Color: ${item.color}`,
                    quantity: item.quantity,
                    price: item.totalPrice,
                    unitPrice: item.unitPrice,
                })),
                totalAmount,
            },
        });

        onClose?.();
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Resumen de compra"
        >
            <button
                type="button"
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Cerrar resumen de compra"
            />

            <div className="relative z-10 w-[min(94vw,760px)] rounded-2xl border border-subsonic-border bg-subsonic-navfooter text-subsonic-text shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-subsonic-border p-5">
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight">
                            Resumen de compra
                        </h2>
                        <p className="mt-1 text-sm text-subsonic-muted">
                            {totalUnits} {totalUnits === 1 ? "unidad" : "unidades"} en el carrito
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full px-3 py-1 text-sm font-black hover:bg-white/10 transition"
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-5">
                    {groupedItems.length === 0 ? (
                        <div className="rounded-xl border border-subsonic-border bg-subsonic-bg/40 px-4 py-6 text-center text-subsonic-muted">
                            No hay productos añadidos todavía.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {groupedItems.map((item) => (
                                <div
                                    key={item.key}
                                    className="rounded-xl border border-subsonic-border bg-subsonic-bg/40 px-4 py-4"
                                >
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <p className="text-sm font-black uppercase">
                                                {item.name}
                                            </p>
                                            <p className="mt-1 text-xs text-subsonic-muted">
                                                Cantidad: {item.quantity}
                                            </p>
                                            <p className="text-xs text-subsonic-muted">
                                                Talla: {item.size}
                                            </p>
                                            <p className="text-xs text-subsonic-muted">
                                                Color: {item.color}
                                            </p>
                                        </div>

                                        <div className="text-left sm:text-right">
                                            <p className="text-xs text-subsonic-muted">
                                                {formatCurrency(item.unitPrice)} / unidad
                                            </p>
                                            <p className="text-base font-black text-subsonic-accent">
                                                {formatCurrency(item.totalPrice)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="border-t border-subsonic-border p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-bold uppercase text-subsonic-muted">
                            Total compra
                        </span>
                        <span className="text-2xl font-black text-subsonic-accent">
                            {formatCurrency(totalAmount)}
                        </span>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                            type="button"
                            variant="outline"
                            className="sm:flex-1"
                            onClick={onClose}
                        >
                            Seguir comprando
                        </Button>

                        <Button
                            type="button"
                            variant="primary"
                            className="sm:flex-1"
                            onClick={handleGoToPayment}
                            disabled={groupedItems.length === 0}
                        >
                            Ir a pago
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseSummary;