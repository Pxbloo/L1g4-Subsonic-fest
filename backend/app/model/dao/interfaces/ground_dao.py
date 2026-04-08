from abc import ABC, abstractmethod
from typing import List, Optional
from ...dto.GroundDTO import GroundDTO

class GroundDAO(ABC):
    @abstractmethod
    def get_all(self) -> List[GroundDTO]:
        pass

    @abstractmethod
    def get_by_id(self, ground_id: str) -> Optional[GroundDTO]:
        pass

    @abstractmethod
    def create(self, ground: GroundDTO) -> bool:
        pass

    @abstractmethod
    def update(self, ground_id: str, ground: GroundDTO) -> bool:
        pass

    @abstractmethod
    def delete(self, ground_id: str) -> bool:
        pass