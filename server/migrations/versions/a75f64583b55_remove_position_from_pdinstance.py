"""remove position from pdinstance

Revision ID: a75f64583b55
Revises: cc8ec006a5a6
Create Date: 2023-05-01 10:47:42.826108

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a75f64583b55'
down_revision = 'cc8ec006a5a6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pdinstances', schema=None) as batch_op:
        batch_op.drop_column('position')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pdinstances', schema=None) as batch_op:
        batch_op.add_column(sa.Column('position', sa.INTEGER(), nullable=True))

    # ### end Alembic commands ###
