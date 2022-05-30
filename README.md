# Password Protected Webpage
Demonstration of how to build a lightweight password protected webpage. This can be very useful for instances where you do not want to setup a full user management system, but where you might want to protect one page (or a subset of pages) on a website, with a single global password for all visitors. Flask has been used to build this, since the demo has been designed to make getting started with password protection on a webpage quick and easy.

## Key Features
* Lightweight password protection for webpages
* No need for a complex user management system
* Several example protected webpages (including a video)
* Saves a user's session, so they do not need to re-enter the password
* Protected with a basic content security policy (CSP) using Flask-Talisman
* A cool incorrect password shake animation (if that's what you're after).

![Screenshot of password protected webpage](main_page.jpg?raw=true "Password Protected Webpage")

## Included Examples
There are three example webpages included in this demo.
1. Text-based content for protection ([message.html](templates/message.html)).
2. Text-based content for protection hidden behind a warning ([message_hidden.html](templates/message_hidden.html)).
3. Video for protection ([message_video.html](templates/message_video.html)).

You can easily switch between each of these examples by changing the template served in [app.py (L46)](app.py#L46)

## Security Considerations
If you are planning on deploying this approach it's important to be aware of the security implications. A single global password is not suitable for protecting content of significant importantance. Single global passwords can be easily published and shared between visitors, rendering them useless. However, they can be useful for making content available to small trusted groups or in placing an extra barrier between a visitor and some more protected content. Never place any content that you would not want in the public domain behind behind a single global password.

# Getting Started

## Envionment
Python 3.9

## Installation
1. Clone the repo.
```
git clone https://github.com/alfiebeard/password-protected-webpage.git
```
2. Create virtual environment
```
virtualenv password_protected_webpage_venv
source password_protected_webpage_venv/bin/activate
```
Or with conda
```
conda create --name password_protected_webpage python=3.9
source activate password_protected_webpage
```
3. Install requirements.txt
```
pip install -r requirements.txt
```

## Running
```
python app.py
```
Navigate to http://127.0.0.1:5000/

## Default Credentials
Username: username  
Password: password

Both credentials can be edited in [app.py (L28-29)](app.py#L28-L29) and the username value field in [index.html (L22)](templates/index.html#L22).

Note: The username is not needed for access as every logon is set to the default username, but it's useful for password managers.

## Deployment
The Flask secret key is defined outside [app.py](app.py) in [.env](.env) to keep it separate. Then [config.py](config.py) handles the loading of this into [app.py](app.py). A [Procfile](Procfile) is also included, so you can deploy to Heroku.

# License
Licensed under the [MIT License](LICENSE.md)