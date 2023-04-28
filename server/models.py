from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt


# Designer ---< Pieces -----< p/d >------ Designs


class Designer(db.Model, SerializerMixin):
    __tablename__ = 'designers'

    serialize_rules = ('-pdinstances','-pieces', '-designs')

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String)
    city = db.Column(db.String)
    _password_hash = db.Column(db.String)
    pieces = db.relationship('Piece', backref='designer')
    designs = db.relationship('Design', backref='designer') 

    # pdinstances = association_proxy('pieces', 'pdinstance')
    # pdinstances = db.relationship('PDInstance', backref='designer')
    ###### THIS IS THE PROBLEM CHILD #######  

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
        return f'Designer {self.first_name}, ID: {self.id}'
    

class Piece(db.Model, SerializerMixin):
    __tablename__ = 'pieces'

    serialize_rules = ('-pdinstances','-designs')

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    style = db.Column(db.String)
    image = db.Column(db.String, nullable=False)
    color = db.Column(db.String)
    designer_id = db.Column(db.Integer, db.ForeignKey('designers.id'))
    pdinstances = db.relationship('PDInstance', backref='piece', cascade="all, delete-orphan")
    designs = association_proxy('pdinstances', 'design')
   

class Design(db.Model, SerializerMixin):
    __tablename__ = 'designs'

    serialize_rules = ('-pieces','-pdinstances')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    designer_id = db.Column(db.Integer, db.ForeignKey('designers.id'))
    pieces = association_proxy('pdinstances', 'piece')
    pdinstances = db.relationship('PDInstance', backref='design', cascade="all, delete-orphan")



class PDInstance(db.Model, SerializerMixin):
    __tablename__ = 'pdinstances'

    serialize_rules = ('-piece.pdinstances', '-design.pdinstances')

    id = db.Column(db.Integer, primary_key = True)
    piece_id = db.Column(db.Integer, db.ForeignKey('pieces.id'))
    design_id = db.Column(db.Integer, db.ForeignKey('designs.id'))
    position = db.Column(db.Integer)

    # 
   