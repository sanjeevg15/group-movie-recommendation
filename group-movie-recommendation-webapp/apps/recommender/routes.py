from apps.home import blueprint
from flask import render_template, request, redirect, url_for
from jinja2 import TemplateNotFound
import imdb
import random
import numpy as np

ia = imdb.IMDb()
top_movies = ia.get_top250_movies()

def getValue(rating):
    if rating == "Loved":
        return 5
    elif rating == "Liked":
        return 3
    elif rating == "Hated":
        return 0
    else:
        return None

def getUserDataMap (user_data, people):
    user_data_map = {}
    for i in range(people):
        user_gender_key = "user_gender_" + str(i)
        user_age_key = "user_age_" + str(i)
        user_name_key = "user_name_" + str(i)
        user = {"user_name": user_data[user_name_key], "user_age": user_data[user_age_key], "user_gender": user_data[user_gender_key]}
        user_data_map[user_name_key] = user
    return user_data_map
    
@blueprint.route('/')
def route_default():
    return redirect("/home")

@blueprint.route('/radarchart')
def radarchart():
    return render_template('recommender/radarChart.html', segment='radarchart')

@blueprint.route('/home', methods=['GET'])
def home2():
    return render_template('recommender/index 2.html', segment='home')

@blueprint.route('/rate_movies', methods=['POST'])
def rate_movies_post():
    user_data = request.form
    people = len(user_data) // 3
    user_data_map = getUserDataMap(user_data, people)
    movies = random.sample(top_movies, 3)
    movie_list = []
    for movie in movies:
        movie_imdb_id = movie.movieID
        movie_info = ia.get_movie(movie_imdb_id)
        movie_title = movie_info['title']
        movie_poster = movie_info['full-size cover url']
        movie_year = movie_info['year']
        movie_map = {'title': movie_title + " " + str(movie_year), 'poster_url': movie_poster, 'imdb_id': movie_imdb_id}
        movie_list.append(movie_map)
    return render_template('recommender/rate_movie.html', settings = {'people': people, 'movies': movie_list, 'user_data': user_data_map})
    
@blueprint.route('/recommend', methods=['POST'])
def recommend():
    person_map = {}
    response = request.form
    for key in response:
        print(key)
    people = int(response['people'])
    movies = list(eval(response['movies']))
    user_map = eval(response['user_data'])
    no_of_movies = len(movies)
    for i in range(people):
        person = {}
        ratings = {}
        for j in range(no_of_movies):
            key = 'person-' + str(i) + "-" + 'movie-' + movies[j]['imdb_id'] + '-choice'
            rating = getValue(response[key])
            ratings[movies[j]['imdb_id']] = rating
        person['ratings'] = ratings
        person['id'] = "user_name_" + str(i)
        person.update(user_map[person['id']])
        person_map["user_name_" + str(i)] = person 
    return render_template('recommender/recommendations.html', segment='recommend', settings = {'people': people, 'movies': movies, 'person_map': person_map})

@blueprint.route("/recommendations", methods = ['GET'])
def recommendations():
    return render_template('recommender/recommendations.html', segment='recommendations')

