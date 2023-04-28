#!/usr/bin/env python3

from flask import request, session, make_response
from flask_restful import Resource
from config import app, db, api
from models import Designer, PDInstance, Piece, Design



class Home(Resource):
    def get(self):
        return make_response({"message":"you can do this!"}, 200)

class Designers(Resource):
    def post(self):
        first_name = request.get_json()['first_name']
        last_name = request.get_json()['last_name']
        email = request.get_json()['email']
        username = request.get_json()['username']
        password = request.get_json()['password']

        if username and password and first_name and last_name:
            try:
                new_designer = Designer(
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                    username=username
                )
                new_designer.password_hash = password

            except:
                return make_response({"error":"Validation error: unable to complete request"}, 400)
            try:
                db.session.add(new_designer)
                db.session.commit()
            except:
                return make_response({"error":"Validation Error, 400"}, 400)
            
            session['designer_id'] = new_designer.id
            return make_response(new_designer.to_dict(), 201)
        
        return make_response({"error":"422 Unprocessable entity"}, 422)

class CheckSession(Resource):
    def get(self):
        designer = Designer.query.filter(Designer.id == session.get('designer_id')).first()
        if not designer:
            return make_response({"message":"401: Not Authorized!"}, 401)
        
        return make_response(designer.to_dict(rules=('pieces', 'designs', 'designs.pieces')), 200)

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']

        designer = Designer.query.filter(Designer.username == username).first()

        if designer.authenticate(password):
            session['designer_id'] = designer.id
            return make_response(designer.to_dict(), 200) 
        
        return make_response({"error":"Unauthorized"}, 401)

class Logout(Resource):
    def delete(self):
        session['designer_id'] = None
        return make_response({}, 204)


class DesignerById(Resource):
    def get(self, id):
        designer = Designer.query.filter_by(id = id).first()
        if not designer:
            return make_response({"error":"No designer found, 404"}, 404)
        
        return make_response(designer.to_dict(rules=('pieces',)), 200)
    

    def patch(self, id):
        designer = Designer.query.filter_by(id = id).first()
        if not designer:
            return make_response({"error":"No designer found, 404"}, 404)
        
        try:
            data = request.get_json()
            for key in data.keys():
                setattr(designer, key, data[key])
        except:
            return make_response({"error":"Validation error, unprocessable entity"}, 422)
        
        try:
            db.session.add(designer)
            db.session.commit()
        except:
            return make_response({"error":"Validation error, unprocessable entity, check db constraint"}, 422)
    
        return make_response(designer.to_dict(), 200)

class Pieces(Resource):
    def get(self):
        pieces= [p.to_dict() for p in Piece.query.all()]

        return make_response(pieces, 200)
    
    def post(self):
        data = request.get_json()
        try:
            newP = Piece(
                name=data['name'],
                type=data['type'],
                style=data['style'],
                image=data['image'],
                color=data['color'],
                designer_id=data['designer_id']
            )
        except:
            return  make_response({"error": "Validation error"}, 400)
        try:
            db.session.add(newP)
            db.session.commit()
        except:
            return make_response({"error":"Validation error, unable to post"}, 400)
        
        return make_response(newP.to_dict(), 201)
    
class PieceById(Resource):
    def delete(self, id):
        piece = Piece.query.filter_by(id = id).first()
        if not piece:
            return make_response({"error":"404 error: Piece not found"}, 404)

        db.session.delete(piece)
        db.session.commit()
        return make_response({}, 204)
    
class DesignById(Resource):
    def get(self, id):
        design = Design.query.filter_by(id=id).first()

        if not design:
            return make_response({"error":"404, Design not found"}, 404)

        return make_response(design.to_dict(rules=('pieces',)), 200)

api.add_resource(Home, '/')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Designers, '/designers')
api.add_resource(DesignerById, '/designers/<int:id>')
api.add_resource(Pieces, '/pieces')
api.add_resource(PieceById, '/pieces/<int:id>')
api.add_resource(DesignById, '/designs/<int:id>')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
