from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt


class Designer(db.Model, SerializerMixin):
    __tablename__ = 'designers'

    serialize_rules = ('-pdinstances',)

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)
    pieces = association_proxy('pdinstances', 'piece')
    pdinstances = db.relationship('PDInstance', backref='designer')


    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'Designer {self.name}, ID: {self.id}'
    

class Piece(db.Model, SerializerMixin):
    __tablename__ = 'pieces'

    serialize_rules = ('-pdinstances',)

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    style = db.Column(db.String)
    image = db.Column(db.String, nullable=False)
    color = db.Column(db.String)
    designers = association_proxy('pdinstances', 'designer')
    pdinstances = db.relationship('PDInstance', backref='piece')


class PDInstance(db.Model, SerializerMixin):
    __tablename__ = 'pdinstances'

    serialize_rules = ('-piece.pdinstances', '-designer.pdinstances')

    id = db.Column(db.Integer, primary_key = True)
    piece_id = db.Column(db.Integer, db.ForeignKey('pieces.id'))
    designer_id = db.Column(db.Integer, db.ForeignKey('designers.id'))
