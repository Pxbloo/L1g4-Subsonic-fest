from model.factory.interfaceDAOFactory import InterfaceDAOFacrtory
from model.dao.firebase.firebase_festival_dao import FirebaseFestivalDAO

class FirebaseDAOFactory(InterfaceDAOFacrtory):

    def __init__(self, cred_path: str):
        self.cred_path = cred_path

    def get_festival_dao(self) -> FirebaseFestivalDAO:
        return FirebaseFestivalDAO(self.cred_path)

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