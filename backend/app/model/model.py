import os

from .factory.fakeDAOFactory import FakeDAOFactory
from .factory.firebaseDAOFactory import FirebaseDAOFactory

class SubsonicModel:
    def __init__(self):
        backend = os.getenv("DATA_BACKEND", "fake").lower()

        if backend == "firebase":
            self.factory = FirebaseDAOFactory()
        else:
            self.factory = FakeDAOFactory()

    def listar_festivales(self):
        dao = self.factory.get_festival_dao()
        return dao.get_all()

    def buscar_festival(self, id: str):
        dao = self.factory.get_festival_dao()
        return dao.get_by_id(id)