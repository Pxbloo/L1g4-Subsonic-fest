from pydantic import BaseModel
from typing import List, Optional


class FavoritesDTO(BaseModel):
    """Objeto de transferencia de datos para los favoritos del usuario."""
    id: str  
    favorite_artists: List[str] = []
    favorite_festivals: List[str] = []
    favorite_products: List[str] = []

    class Config:
        from_attributes = True
