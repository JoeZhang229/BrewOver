"""beer userId

Revision ID: bf17d307b224
Revises: 4af27c7ab57f
Create Date: 2021-08-27 09:51:58.307871

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bf17d307b224'
down_revision = '4af27c7ab57f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('drinks', sa.Column('userId', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'drinks', 'users', ['userId'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'drinks', type_='foreignkey')
    op.drop_column('drinks', 'userId')
    # ### end Alembic commands ###