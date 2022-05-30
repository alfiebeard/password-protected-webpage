import os
from dotenv import load_dotenv 

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))

class Configuration(object):
    SECRET_KEY = os.environ.get('SECRET_KEY')