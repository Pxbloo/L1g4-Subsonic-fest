from typing import Optional
from app.model.dao.interfaces.favorites_dao import FavoritesDAO
from app.model.dto.FavoritesDTO import FavoritesDTO
from .firebase_connector import FirebaseConnector


class FirebaseFavoritesDAO(FavoritesDAO):

    def __init__(self):
        """Inicializa la conexión a Firebase Firestore y establece la referencia a la colección 'favorites'."""
        self.db = FirebaseConnector.get_db()
        self.collection = self.db.collection("favorites")

    def get_by_user_id(self, user_id: str) -> Optional[FavoritesDTO]:
        """Recupera los favoritos de un usuario por su ID."""
        doc = self.collection.document(user_id).get()
        if doc.exists:
            return FavoritesDTO.model_validate(doc.to_dict())
        return FavoritesDTO(id=user_id)

    def create(self, favorites: FavoritesDTO) -> bool:
        """Crea un nuevo registro de favoritos para un usuario."""
        self.collection.document(str(favorites.id)).set(favorites.model_dump())
        return True

    def add_favorite_artist(self, user_id: str, artist_id: str) -> bool:
        """Agrega un artista a los favoritos del usuario."""
        doc_ref = self.collection.document(user_id)
        doc = doc_ref.get()

        if not doc.exists:
            favorites = FavoritesDTO(id=user_id)
            favorites.favorite_artists.append(artist_id)
            doc_ref.set(favorites.model_dump())
        else:
            favorites = FavoritesDTO.model_validate(doc.to_dict())
            if artist_id not in favorites.favorite_artists:
                favorites.favorite_artists.append(artist_id)
                doc_ref.update(favorites.model_dump())

        return True

    def remove_favorite_artist(self, user_id: str, artist_id: str) -> bool:
        """Elimina un artista de los favoritos del usuario."""
        doc_ref = self.collection.document(user_id)
        doc = doc_ref.get()

        if doc.exists:
            favorites = FavoritesDTO.model_validate(doc.to_dict())
            if artist_id in favorites.favorite_artists:
                favorites.favorite_artists.remove(artist_id)
                doc_ref.update(favorites.model_dump())
            return True
        return False

    def add_favorite_festival(self, user_id: str, festival_id: str) -> bool:
        """Agrega un festival a los favoritos del usuario."""
        doc_ref = self.collection.document(user_id)
        doc = doc_ref.get()

        if not doc.exists:
            favorites = FavoritesDTO(id=user_id)
            favorites.favorite_festivals.append(festival_id)
            doc_ref.set(favorites.model_dump())
        else:
            favorites = FavoritesDTO.model_validate(doc.to_dict())
            if festival_id not in favorites.favorite_festivals:
                favorites.favorite_festivals.append(festival_id)
                doc_ref.update(favorites.model_dump())

        return True

    def remove_favorite_festival(self, user_id: str, festival_id: str) -> bool:
        """Elimina un festival de los favoritos del usuario."""
        doc_ref = self.collection.document(user_id)
        doc = doc_ref.get()

        if doc.exists:
            favorites = FavoritesDTO.model_validate(doc.to_dict())
            if festival_id in favorites.favorite_festivals:
                favorites.favorite_festivals.remove(festival_id)
                doc_ref.update(favorites.model_dump())
            return True
        return False

    def add_favorite_product(self, user_id: str, product_id: str) -> bool:
        """Agrega un producto a los favoritos del usuario."""
        doc_ref = self.collection.document(user_id)
        doc = doc_ref.get()

        if not doc.exists:
            favorites = FavoritesDTO(id=user_id)
            favorites.favorite_products.append(product_id)
            doc_ref.set(favorites.model_dump())
        else:
            favorites = FavoritesDTO.model_validate(doc.to_dict())
            if product_id not in favorites.favorite_products:
                favorites.favorite_products.append(product_id)
                doc_ref.update(favorites.model_dump())

        return True

    def remove_favorite_product(self, user_id: str, product_id: str) -> bool:
        """Elimina un producto de los favoritos del usuario."""
        doc_ref = self.collection.document(user_id)
        doc = doc_ref.get()

        if doc.exists:
            favorites = FavoritesDTO.model_validate(doc.to_dict())
            if product_id in favorites.favorite_products:
                favorites.favorite_products.remove(product_id)
                doc_ref.update(favorites.model_dump())
            return True
        return False

    def is_artist_favorite(self, user_id: str, artist_id: str) -> bool:
        """Verifica si un artista está en los favoritos del usuario."""
        doc = self.collection.document(user_id).get()
        if doc.exists:
            favorites = FavoritesDTO.model_validate(doc.to_dict())
            return artist_id in favorites.favorite_artists
        return False

    def is_festival_favorite(self, user_id: str, festival_id: str) -> bool:
        """Verifica si un festival está en los favoritos del usuario."""
        doc = self.collection.document(user_id).get()
        if doc.exists:
            favorites = FavoritesDTO.model_validate(doc.to_dict())
            return festival_id in favorites.favorite_festivals
        return False

    def is_product_favorite(self, user_id: str, product_id: str) -> bool:
        """Verifica si un producto está en los favoritos del usuario."""
        doc = self.collection.document(user_id).get()
        if doc.exists:
            favorites = FavoritesDTO.model_validate(doc.to_dict())
            return product_id in favorites.favorite_products
        return False
