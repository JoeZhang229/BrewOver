from flask.cli import AppGroup
from .users import seed_users, undo_users
from .beers import seed_beers, undo_beers

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # Add other seed functions here
    seed_users()
    seed_beers()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_users()
    undo_beers()
