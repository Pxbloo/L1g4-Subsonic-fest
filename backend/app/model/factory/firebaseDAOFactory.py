from .interfaceDAOFactory import InterfaceDAOFactory
from ..dao.firebase.firebase_festival_dao import FirebaseFestivalDAO


class FirebaseDAOFactory(InterfaceDAOFactory):

    def __init__(self) -> None:
        # La configuración de credenciales la gestiona FirebaseConnector
        # (FIREBASE_CREDENTIALS o serviceAccountKey.json por defecto)
        pass

    def get_festival_dao(self) -> FirebaseFestivalDAO:
        return FirebaseFestivalDAO()

    def get_user_dao(self):
        raise NotImplementedError
    def get_artist_dao(self):
        raise NotImplementedError
    def get_blog_post_dao(self):
        raise NotImplementedError
    def get_ground_dao(self):
        raise NotImplementedError
    def get_history_dao(self):
        raise NotImplementedError
    def get_merchandising_dao(self):
        raise NotImplementedError