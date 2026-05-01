from pydantic import BaseModel, Field, model_validator
from typing import List, Optional

class TicketDTO(BaseModel):
    """Objeto de transferencia de datos para una categoría de entrada."""
    name: str
    price: float
    features: List[str]

class LineupItemDTO(BaseModel):
    """Representación simplificada de un artista dentro del cartel de un festival."""
    id: str
    name: str
    genre: str


class GroundItemDTO(BaseModel):
    """Representación simplificada de un recinto asociado al festival."""
    id: str
    name: str
    area: Optional[str] = None
    capacity: Optional[int] = None
    status: Optional[str] = None

class FestivalDTO(BaseModel):
    """Objeto de transferencia de datos principal para la entidad Festival."""
    id: Optional[str] = None
    title: str
    date: str
    startDate: str
    endDate: str
    location: str
    image: Optional[str] = None
    price: Optional[float] = None
    description: str
    tickets: List[TicketDTO]
    lineup: List[LineupItemDTO]
    grounds: List[GroundItemDTO] = Field(default_factory=list)

    @model_validator(mode="before")
    @classmethod
    def fill_missing_end_date(cls, data):
        if isinstance(data, dict) and "endDate" not in data:
            data["endDate"] = data.get("startDate") or data.get("date")
        return data

    class Config:
        from_attributes = True