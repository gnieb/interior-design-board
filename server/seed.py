# #!/usr/bin/env python3



from app import app
from config import db
from models import Designer, Piece, PDInstance

def seed_data():
    Piece.query.delete()
    PDInstance.query.delete()
    Designer.query.delete()
    db.create_all()

    print("Seeding Pieces...")

    p1 = Piece(name='Basic Sectional', type='sofa', color='beige', style='Traditional', image='https://assets.pbimgs.com/pbimgs/ab/images/dp/wcm/202314/0230/pb-basic-slipcovered-sofa-chaise-sectional-c.jpg')
    p2 = Piece(name='Basic Sectional', type='sofa', color='gray', style='Traditional', image='https://cdn.shopify.com/s/files/1/0572/6188/3569/products/Copper-Featured-600x600_600x600.jpg?v=1676985703')
    p3 = Piece(name='Modular Velvet Sectional', type='sofa', color='beige', style='Modern', image='https://m.media-amazon.com/images/I/81IIXP7kPYL._AC_UF894,1000_QL80_.jpg')
    p4 = Piece(name='Dark Leather Sofa', type='sofa', color='black', style='Traditional', image='https://cousinsfurniture.co.uk/media/catalog/product/cache/3e3535920ca6f846fbb8383ae1e59cf1/1/9/19-10484-271730_15322_69154.jpg')
    
    p5 = Piece(name='Pavo Double Floor Lamp', type='lamp', color='black', style='Contemporary', image='https://cb2.scene7.com/is/image/CB2/PavoBlackFloorLampSHF21/$web_pdp_main_carousel_md$/210625124038/pavo-black-marble-double-floor-lamp.jpg')

    p6 = Piece(name='Glass Floor Lamp', type='lamp', color='bronze', style='Mid-Century Modern', image='https://m.media-amazon.com/images/I/51qq5r-P23L._AC_UF894,1000_QL80_.jpg')

    p7 = Piece(name='Italian Glass Tall Lamp', type='lamp', color='glass', style='Contemporary', image='https://ae01.alicdn.com/kf/H3631aa20544c46718f0516045fc7f1d2Z/Italian-Glass-Floor-Lamp-Creative-Designer-Led-Light-Clear-Glass-Tall-Lamps-Living-Room-Bedroom-Decoration.jpg_Q90.jpg_.webp')

    p8 = Piece(name='LED Mushroom Table Lamp', type='lamp', color='white', style='Minimal', image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6cLDvJIssXQI3XvnPbhKcbv7Yu4f2aqB39lS6NusvR0kw74HimFRqSnmE77eK9MKtVz8&usqp=CAU')

    p9 = Piece(name='Green Velvet Chair', type='chair', color='green', style='Modern', image='https://cdn.shopify.com/s/files/1/1010/2666/products/Swweb-HOUSTONLOUNGECHAIRTEAL-LEG_800x.jpg?v=1642709004')

    p10 = Piece(name='Hand Woven Area Rug', type='rug', color='multi', style='Traditional', image='https://www.rugman.com/image/cache/75000/75300/75306/gallery/75306_closeup_2.jpg')

    p11 = Piece(name='Geometric Area Rug', type='rug', color='gray', style='Minimal', image='https://cdn.shopify.com/s/files/1/0220/3498/products/TUN294K-5-DETAIL_5b6548ad-da7b-4e47-968e-a3cd9b4f328c_1200x.jpg?v=1571439066')

    p12 = Piece(name='Checkered Shag Rug', type='rug', color='beige', style='Modern', image='https://cdn.shopify.com/s/files/1/0611/4161/4765/products/checkered-wool-rug_ivory_detail_7232.jpg?v=1661359429')

    p13 = Piece(name='Abstract Wall Art', type='art', color='multi', style='Minimal', image='https://i.etsystatic.com/32864106/r/il/709385/3509541168/il_570xN.3509541168_h7jf.jpg')

    p14 = Piece(name='Floor Length Mirror', type='mirror', color='glass', style='Minimal', image='https://cb.scene7.com/is/image/Crate/AostaBrsArchCutoutFlrMrr3QSSF20/$web_pdp_main_carousel_zoom_low$/200323152431/aosta-brass-arch-cutout-floor-mirror.jpg')

    p15 = Piece(name='Candle Jars', type='misc', color='white', style='Minimal', image='https://cdn.shopify.com/s/files/1/0056/4936/7109/products/MG_0074_copy_69acdf5b-23a6-40b2-abaa-1d6aa7cfa7f6_2048x.jpg?v=1596557771')

    p16 = Piece(name='Minimal Candle', type='art', color='white', style='Minimal', image='https://static.zara.net/photos///2022/I/4/1/p/5441/705/850/2/w/1920/5441705850_6_8_1.jpg?ts=1657625044332')

    # ################## TEXTURES ###################

    p17 = Piece(name='Wood', type='texture', color='brown', style='', image='https://t4.ftcdn.net/jpg/02/71/30/35/360_F_271303570_x0Ssv4iEUgr0NuNPHHVLjUJnk648ExP2.jpg')

    p18 = Piece(name='Leather', type='texture', color='brown', style='', image='https://cdn.shopify.com/s/files/1/0029/0396/5760/articles/Untitled_design_4.png?v=1566408531&width=1920')

    p19 = Piece(name='Sandstone Tile', type='texture', color='beige', style='', image='https://www.marlboroughtiles.com/images/products/sandstone/Sandstone-Ochre-30x60-Limestone-Board-2.jpg')


    p20 = Piece(name='Linen Curtains', type='curtains', color='gray', style='', image='https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71f8KTxfCZL._AC_SX425_.jpg')

    p21 = Piece(name='Linen Curtains', type='curtains', color='beige', style='', image='https://m.media-amazon.com/images/I/71HMvSwCYzL._AC_UF1000,1000_QL80_.jpg')

    p22 = Piece(name='Aloe Plant', type='plant', color='green', style='', image='https://thegardeningdad.com/wp-content/uploads/2022/01/Indoor-Aloe-Vera.jpg')
   
    p23 = Piece(name='Monstera Plant', type='plant', color='green', style='', image='https://www.theflowershed.com.au/wp-content/uploads/2021/07/monstera.jpg')

    p24 = Piece(name='Magazines', type='decor', color='white', style='', image='https://i.pinimg.com/736x/6f/92/1b/6f921bab2229e2ef9b6068afed676e0f--book-and-magazine-things-i-love.jpg')

    p25 = Piece(name='Aloe Plant', type='plant', color='green', style='', image='https://thegardeningdad.com/wp-content/uploads/2022/01/Indoor-Aloe-Vera.jpg')



    db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p22, p23, p24, p25])
    db.session.commit()




if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        seed_data()