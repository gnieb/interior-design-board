from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt


class Designer(db.Model, SerializerMixin):
    __tablename__ = 'designers'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)


    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'Designer {self.name}, ID: {self.id}'
    

# class Piece(db.Model, SerializerMixin):
#     __tablename__ = 'pieces'

#     id = db.Column(db.Integer, primary_key = True)
#     name = db.Column(db.String)
#     category = db.Column(db.String)
#     style = db.Column(db.String)



# class 
