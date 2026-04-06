from abc import ABC, abstractmethod
from typing import List, Optional

from model.dto.FestivalDTO import FestivalDTO


class FestivalDAO(ABC):
	"""Interfaz que define las operaciones de persistencia para la entidad Festival."""

	@abstractmethod
	def get_all(self) -> List[FestivalDTO]:
		"""Recupera todos los festivales registrados."""
		pass

	@abstractmethod
	def get_by_id(self, festival_id: str) -> Optional[FestivalDTO]:
		"""Recupera un festival por su ID único. Devuelve None si no se encuentra."""
		pass

	@abstractmethod
	def create(self, festival: FestivalDTO) -> bool:
		"""Crea un nuevo festival. Devuelve True si la operación fue exitosa."""
		pass

	@abstractmethod
	def update(self, festival_id: str, festival: FestivalDTO) -> bool:
		"""Actualiza un festival existente. Devuelve True si se realizó el cambio."""
		pass

	@abstractmethod
	def delete(self, festival_id: str) -> bool:
		"""Elimina un festival por su ID. Devuelve True si se borró correctamente."""
		pass
