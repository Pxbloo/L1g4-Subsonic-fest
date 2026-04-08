from typing import List, Optional

from app.model.dao.interfaces.blog_post_dao import BlogPostDAO
from app.model.dto.BlogPostDTO import BlogPostDTO
from .firebase_connector import FirebaseConnector


class FirebaseBlogDAO(BlogPostDAO):
    """Implementación del DAO para el Blog utilizando Firebase Firestore."""

    def __init__(self) -> None:
        """Inicializa la conexión a Firebase Firestore y establece la referencia a la colección 'blog'."""
        self.db = FirebaseConnector().get_db()
        self.collection = self.db.collection("blog")

    def get_all(self) -> List[BlogPostDTO]:
        """Recupera todos los documentos de la colección 'blog'."""
        docs = self.collection.stream()
        return [BlogPostDTO.model_validate(doc.to_dict()) for doc in docs]

    def get_by_id(self, post_id: str) -> Optional[BlogPostDTO]:
        """Recupera un post específico por su ID único."""
        doc = self.collection.document(str(post_id)).get()
        if doc.exists:
            return BlogPostDTO.model_validate(doc.to_dict())
        return None

    def get_by_category(self, category: str) -> List[BlogPostDTO]:
        """Recupera posts filtrados por categoría."""
        query = self.collection.where("category", "==", category)
        docs = query.stream()
        return [BlogPostDTO.model_validate(doc.to_dict()) for doc in docs]
