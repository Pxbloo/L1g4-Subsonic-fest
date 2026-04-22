from pydantic import BaseModel
from typing import Optional

class MerchandisingDTO(BaseModel):
    """Objeto de transferencia de datos para los artículos de la tienda oficial."""
    id: Optional[str] = None
    name: str
    type: str
    price: float
    stock: int
    description: str

    class Config:
        from_attributes = True