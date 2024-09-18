#basic flask app to test if flask is working.
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/about')
def about():
    return 'The about page'

@app.route('/blog')
def blog():
    return render_template('JSConcepts/{{templates}}/blog.html')

#how to add variable parts to the routing in flask
@app.route('/blog/<string:blog_id>')
def blogpost(blog_id):
    return 'This is blog post number ' + blog_id

if __name__ == '__main__':
    app.run()