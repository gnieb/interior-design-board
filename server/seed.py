# #!/usr/bin/env python3



from app import app
from config import db
from models import Designer, Piece, PDInstance, Design

def seed_data():
    Piece.query.delete()
    PDInstance.query.delete()
    Design.query.delete()
    # Designer.query.delete()
    db.create_all()

    print("Seeding Pieces...")

#################### PIECES #######################

    p1 = Piece(name='Basic Sectional', type='Furniture', color='beige', style='Traditional', image='https://assets.pbimgs.com/pbimgs/ab/images/dp/wcm/202314/0230/pb-basic-slipcovered-sofa-chaise-sectional-c.jpg', designer_id=2)
    p2 = Piece(name='Basic Sectional', type='Furniture', color='gray', style='Traditional', image='https://cdn.shopify.com/s/files/1/0572/6188/3569/products/Copper-Featured-600x600_600x600.jpg?v=1676985703', designer_id=1)
    p3 = Piece(name='Modular Velvet Sectional', type='Furniture', color='beige', style='Modern', image='https://m.media-amazon.com/images/I/81IIXP7kPYL._AC_UF894,1000_QL80_.jpg', designer_id=1)
    p4 = Piece(name='Dark Leather Sofa', type='Furniture', color='black', style='Traditional', image='https://cousinsfurniture.co.uk/media/catalog/product/cache/3e3535920ca6f846fbb8383ae1e59cf1/1/9/19-10484-271730_15322_69154.jpg', designer_id=1)
    
    p5 = Piece(name='Pavo Double Floor Lamp', type='Lighting', color='black', style='Contemporary', image='https://cb2.scene7.com/is/image/CB2/PavoBlackFloorLampSHF21/$web_pdp_main_carousel_md$/210625124038/pavo-black-marble-double-floor-lamp.jpg', designer_id=2)

    p6 = Piece(name='Glass Floor Lamp', type='Lighting', color='bronze', style='Mid-Century Modern', image='https://m.media-amazon.com/images/I/51qq5r-P23L._AC_UF894,1000_QL80_.jpg', designer_id=1)

    p7 = Piece(name='Italian Glass Tall Lamp', type='Lighting', color='glass', style='Contemporary', image='https://ae01.alicdn.com/kf/H3631aa20544c46718f0516045fc7f1d2Z/Italian-Glass-Floor-Lamp-Creative-Designer-Led-Light-Clear-Glass-Tall-Lamps-Living-Room-Bedroom-Decoration.jpg_Q90.jpg_.webp', designer_id=1)

    p8 = Piece(name='LED Mushroom Table Lamp', type='Lighting', color='white', style='Minimalist', image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6cLDvJIssXQI3XvnPbhKcbv7Yu4f2aqB39lS6NusvR0kw74HimFRqSnmE77eK9MKtVz8&usqp=CAU', designer_id=1)

    p9 = Piece(name='Green Velvet Chair', type='Furniture', color='green', style='Modern', image='https://cdn.shopify.com/s/files/1/1010/2666/products/Swweb-HOUSTONLOUNGECHAIRTEAL-LEG_800x.jpg?v=1642709004', designer_id=2)

    p10 = Piece(name='Hand Woven Area Rug', type='Flooring', color='multi', style='Traditional', image='https://www.rugman.com/image/cache/75000/75300/75306/gallery/75306_closeup_2.jpg', designer_id=2)

    p11 = Piece(name='Geometric Area Rug', type='Flooring', color='gray', style='Minimalist', image='https://cdn.shopify.com/s/files/1/0220/3498/products/TUN294K-5-DETAIL_5b6548ad-da7b-4e47-968e-a3cd9b4f328c_1200x.jpg?v=1571439066' , designer_id=2)

    p12 = Piece(name='Checkered Shag Rug', type='Flooring', color='beige', style='Modern', image='https://cdn.shopify.com/s/files/1/0611/4161/4765/products/checkered-wool-rug_ivory_detail_7232.jpg?v=1661359429', designer_id=1)

    p13 = Piece(name='Abstract Wall Art', type='Accessory', color='multi', style='Minimalist', image='https://i.etsystatic.com/32864106/r/il/709385/3509541168/il_570xN.3509541168_h7jf.jpg', designer_id=2)

    p14 = Piece(name='Floor Length Mirror', type='Accessory', color='glass', style='Minimalist', image='https://cb.scene7.com/is/image/Crate/AostaBrsArchCutoutFlrMrr3QSSF20/$web_pdp_main_carousel_zoom_low$/200323152431/aosta-brass-arch-cutout-floor-mirror.jpg', designer_id=1)

    p15 = Piece(name='Candle Jars', type='Accessory', color='white', style='Minimalist', image='https://cdn.shopify.com/s/files/1/0056/4936/7109/products/MG_0074_copy_69acdf5b-23a6-40b2-abaa-1d6aa7cfa7f6_2048x.jpg?v=1596557771', designer_id=2)

    p16 = Piece(name='Minimal Candle', type='Accessory', color='white', style='Minimalist', image='https://static.zara.net/photos///2022/I/4/1/p/5441/705/850/2/w/1920/5441705850_6_8_1.jpg?ts=1657625044332', designer_id=1)


    p17 = Piece(name='Wood', type='Flooring', color='brown', style='Any', image='https://t4.ftcdn.net/jpg/02/71/30/35/360_F_271303570_x0Ssv4iEUgr0NuNPHHVLjUJnk648ExP2.jpg', designer_id=2)

    p18 = Piece(name='Leather', type='Texture', color='brown', style='Any', image='https://cdn.shopify.com/s/files/1/0029/0396/5760/articles/Untitled_design_4.png?v=1566408531&width=1920', designer_id=2)

    p19 = Piece(name='Sandstone Tile', type='Flooring', color='beige', style='Any', image='https://www.marlboroughtiles.com/images/products/sandstone/Sandstone-Ochre-30x60-Limestone-Board-2.jpg', designer_id=1)


    p20 = Piece(name='Linen Curtains', type='Accessory', color='gray', style='Any', image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71f8KTxfCZL._AC_SX425_.jpg', designer_id=1)

    p21 = Piece(name='Linen Curtains', type='Accessory', color='beige', style='Any', image='https://m.media-amazon.com/images/I/71HMvSwCYzL._AC_UF1000,1000_QL80_.jpg', designer_id=1)

    p22 = Piece(name='Aloe Plant', type='Accessory', color='green', style='Any', image='https://thegardeningdad.com/wp-content/uploads/2022/01/Indoor-Aloe-Vera.jpg', designer_id=1)
   
    p23 = Piece(name='Monstera Plant', type='Accessory', color='green', style='Any', image='https://www.theflowershed.com.au/wp-content/uploads/2021/07/monstera.jpg', designer_id=1)

    p24 = Piece(name='Magazines', type='Accessory', color='white', style='Any', image='https://i.pinimg.com/736x/6f/92/1b/6f921bab2229e2ef9b6068afed676e0f--book-and-magazine-things-i-love.jpg', designer_id=1)

    p25 = Piece(name='Aloe Plant', type='Accessory', color='green', style='Any', image='https://thegardeningdad.com/wp-content/uploads/2022/01/Indoor-Aloe-Vera.jpg', designer_id=2)

 #################### DESIGNS ######################   
    
    print("Seeding Designs....")
    d1 = Design(name='Minimal Main Room', designer_id=1)
    d2 = Design(name='Minimal Bedroom Inspo', designer_id=1)

################# PDInstances #######################
    print("Seeding PDinstances...")
    pd1 = PDInstance(piece_id=2, design_id=1, )
    pd2 = PDInstance(piece_id=3, design_id=1, )
    pd3 = PDInstance(piece_id=21, design_id=1, )
    pd4 = PDInstance(piece_id=24, design_id=1, )
    pd5 = PDInstance(piece_id=12, design_id=1, )

    pd6 = PDInstance(piece_id=14, design_id=2, )
    pd7 = PDInstance(piece_id=23, design_id=2, )
    pd8 = PDInstance(piece_id=16, design_id=2, )





    db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25, d1, d2, pd1, pd2, pd3])
    db.session.commit()

    print("Seeding complete")




if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        seed_data()