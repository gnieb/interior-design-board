# #!/usr/bin/env python3



from app import app
from config import db
from models import Designer, Piece, PDInstance

def seed_data():
    db.drop_all()
    db.create_all()

    print("Seeding Pieces...")

    p1 = Piece(name='Basic Sectional', type='sofa', color='beige', style='Traditional', image='https://assets.pbimgs.com/pbimgs/ab/images/dp/wcm/202314/0230/pb-basic-slipcovered-sofa-chaise-sectional-c.jpg')
    p2 = Piece(name='Basic Sectional', type='sofa', color='gray', style='Traditional', image='https://cdn.shopify.com/s/files/1/0572/6188/3569/products/Copper-Featured-600x600_600x600.jpg?v=1676985703')
    p3 = Piece(name='Modular Velvet Sectional', type='sofa', color='beige', style='Modern', image='https://m.media-amazon.com/images/I/81IIXP7kPYL._AC_UF894,1000_QL80_.jpg')
    p4 = Piece(name='Dark Leather Sofa', type='sofa', color='black', style='Traditional', image='https://cousinsfurniture.co.uk/media/catalog/product/cache/3e3535920ca6f846fbb8383ae1e59cf1/1/9/19-10484-271730_15322_69154.jpg')
    



    db.session.add_all([p1, p2, p3, p4])
    db.session.commit()




if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        seed_data()