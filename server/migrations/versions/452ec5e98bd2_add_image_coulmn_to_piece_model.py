"""add image coulmn to piece model

Revision ID: 452ec5e98bd2
Revises: 0c20548ed630
Create Date: 2023-04-24 22:30:48.133162

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '452ec5e98bd2'
down_revision = '0c20548ed630'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pieces', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pieces', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###
