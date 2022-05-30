from flask import Flask, render_template, request, send_from_directory, jsonify
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_wtf.csrf import CSRFProtect
from flask_talisman import Talisman
from config import Configuration


app = Flask(__name__)
app.config.from_object(Configuration)

csp = {
    'default-src': ['\'self\'',
	'cdn.jsdelivr.net',
	'code.jquery.com'
	]
}
talisman = Talisman(app, content_security_policy=csp, force_https=False, session_cookie_secure=False)

login_manager = LoginManager()
login_manager.init_app(app)

csrf = CSRFProtect(app)
csrf.init_app(app)


# Change the password to enter here - this is the default username and means that the password is remembered 
# without prompting for a username, e.g., by Safari keychain or other password managers.
username = 'username'
password = 'password'


class User(UserMixin):
  	pass


@login_manager.user_loader
def user_loader(username):
	user = User()
	user.id = username
	return user


@app.route("/", methods=["GET"])
def index():
	if current_user.is_authenticated:
		return render_template('message.html')
	else:
		return render_template('index.html')
	

@app.route('/about')
def about():
	return render_template('about.html')


@app.route('/login', methods=["POST"])
def login():
	if request.json.get('password') == password:
		user = User()
		user.id = username
		login_user(user)
		return jsonify({"login": "success"})
	else:
		return jsonify({"login": "fail"})


@app.route('/logout')
@login_required
def logout():
	logout_user()
	return jsonify({"logout": "success"})


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(app.static_folder, 'favicon.ico', as_attachment=True, mimetype='image/vnd.microsoft.icon') 


@app.errorhandler(401)
def unauthorised(e):
    return render_template('unauthorised.html'), 401


@app.errorhandler(404)
def page_not_found(e):
    return render_template('page_not_found.html'), 404


@app.errorhandler(405)
def not_allowed(e):
    return render_template('not_allowed.html'), 405


if __name__ == "__main__":
	app.run()
