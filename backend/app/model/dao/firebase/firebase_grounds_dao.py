from typing import List, Optional

from ..interfaces.ground_dao import GroundDAO
from ...dto.GroundDTO import GroundDTO
from .firebase_connector import FirebaseConnector


class FirebaseGroundDAO(GroundDAO):
    def __init__(self):
        self.db = FirebaseConnector.get_db()
        self.collection = self.db.collection("grounds")

    def get_all(self) -> List[GroundDTO]:
        docs = self.collection.stream()
        return [GroundDTO.model_validate(doc.to_dict()) for doc in docs]

    def get_by_id(self, ground_id: str) -> Optional[GroundDTO]:
        doc = self.collection.document(ground_id).get()
        if doc.exists:
            return GroundDTO.model_validate(doc.to_dict())
        return None

    def create(self, ground: GroundDTO) -> bool:
        doc_id = str(ground.id)
        self.collection.document(doc_id).set(ground.model_dump())
        return True

    def update(self, ground_id: str, ground: GroundDTO) -> bool:
        doc_ref = self.collection.document(ground_id)
        doc = doc_ref.get()
        if not doc.exists:
            return False
        doc_ref.update(ground.model_dump())
        return True

    def delete(self, ground_id: str) -> bool:
        doc_ref = self.collection.document(ground_id)
        doc = doc_ref.get()
        if not doc.exists:
            return False
        doc_ref.delete()
        return True