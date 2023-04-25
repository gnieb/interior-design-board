#!/usr/bin/env python3

from flask import request, session, make_response
from flask_restful import Resource
from config import app, db, api
from models import Designer, PDInstance, Piece



class Home(Resource):
    def get(self):
        return make_response({"message":"you can do this!"}, 200)

class Signup(Resource):
    def post(self):
        name = request.get_json()['name']
        username = request.get_json()['username']
        password = request.get_json()['password']

        if username and password and name:
            try:
                new_designer = Designer(
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
            return make_response({}, 204)
        
        return make_response(designer.to_dcit(), 200)

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
        
        return make_response(designer.to_dict(), 200)
    



api.add_resource(Home, '/')
api.add_resource(CheckSession, '/checksession')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
