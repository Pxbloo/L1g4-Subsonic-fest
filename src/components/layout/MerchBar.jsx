import React from "react";

function MerchCategoryBar({ categories, activeCategoryId, onChangeCategory }) {
    return (
        <nav
            aria-label="Categorías de la tienda"
            className="
                w-full
                bg-zinc-800/80
                border-y border-white/10
                backdrop-blur
            "
        >
            <div
                className="
                    flex items-center gap-15
                    overflow-x-auto
                    px-6 py-2
                    md:px-25
                "
            >
                {categories.map((cat) => {
                    const isActive = cat.id === activeCategoryId;

                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => onChangeCategory(cat.id)}
                            className={`
                                whitespace-nowrap bg-transparent px-4 py-2 text-sm font-bold 
                                transition
                            ${
                                isActive
                                    ? "bg-transparent text-cyan-300"
                                    : "bg-transparent text-white/70 hover: hover:text-cyan-700"
                            }
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                        `}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

export default MerchCategoryBar;