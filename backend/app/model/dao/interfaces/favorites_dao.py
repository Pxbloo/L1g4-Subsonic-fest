from abc import ABC, abstractmethod
from typing import Optional
from app.model.dto.FavoritesDTO import FavoritesDTO


class FavoritesDAO(ABC):
    """Interfaz que define las operaciones de persistencia para favoritos."""

    @abstractmethod
    def get_by_user_id(self, user_id: str) -> Optional[FavoritesDTO]:
        """Recupera los favoritos de un usuario por su ID."""
        pass

    @abstractmethod
    def create(self, favorites: FavoritesDTO) -> bool:
        """Crea un nuevo registro de favoritos para un usuario."""
        pass

    @abstractmethod
    def add_favorite_artist(self, user_id: str, artist_id: str) -> bool:
        """Agrega un artista a los favoritos del usuario."""
        pass

    @abstractmethod
    def remove_favorite_artist(self, user_id: str, artist_id: str) -> bool:
        """Elimina un artista de los favoritos del usuario."""
        pass

    @abstractmethod
    def add_favorite_festival(self, user_id: str, festival_id: str) -> bool:
        """Agrega un festival a los favoritos del usuario."""
        pass

    @abstractmethod
    def remove_favorite_festival(self, user_id: str, festival_id: str) -> bool:
        """Elimina un festival de los favoritos del usuario."""
        pass

    @abstractmethod
    def add_favorite_product(self, user_id: str, product_id: str) -> bool:
        """Agrega un producto a los favoritos del usuario."""
        pass

    @abstractmethod
    def remove_favorite_product(self, user_id: str, product_id: str) -> bool:
        """Elimina un producto de los favoritos del usuario."""
        pass

    @abstractmethod
    def is_artist_favorite(self, user_id: str, artist_id: str) -> bool:
        """Verifica si un artista está en los favoritos del usuario."""
        pass

    @abstractmethod
    def is_festival_favorite(self, user_id: str, festival_id: str) -> bool:
        """Verifica si un festival está en los favoritos del usuario."""
        pass

    @abstractmethod
    def is_product_favorite(self, user_id: str, product_id: str) -> bool:
        """Verifica si un producto está en los favoritos del usuario."""
        pass
