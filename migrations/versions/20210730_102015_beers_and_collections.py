"""beers and collections

Revision ID: 9e51900888be
Revises: ffdc0a98111c
Create Date: 2021-07-30 10:20:15.668369

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9e51900888be'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('beers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('beerObj', sa.JSON(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('collections',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('beer_collection',
    sa.Column('collections_id', sa.Integer(), nullable=False),
    sa.Column('beers_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['beers_id'], ['beers.id'], ),
    sa.ForeignKeyConstraint(['collections_id'], ['collections.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('beer_collection')
    op.drop_table('collections')
    op.drop_table('beers')
    # ### end Alembic commands ###
