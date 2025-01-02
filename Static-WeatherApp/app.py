from flask import Flask, request, jsonify, send_from_directory
import requests

app = Flask(__name__)
api_key = 'wQvcUl8ejaH6q0mHXuvskaFPsyFY9Ibj'
@app.route('/')
def index():
    return send_from_directory('static','weather.html')

@app.route('/get_weather', methods=['GET'])
def get_weather():
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')

    url = f'https://api.tomorrow.io/v4/timelines?location={latitude},{longitude}&fields=temperature,temperatureApparent,temperatureMin,temperatureMax,windSpeed,windDirection,humidity,pressureSeaLevel,uvIndex,weatherCode,precipitationProbability,precipitationType,sunriseTime,sunsetTime,visibility,moonPhase,cloudCover&timesteps=1h,1d&units=imperial&timezone=America/Los_Angeles&apikey={api_key}'

    # response = requests.get(url)
    
    
    # if response.status_code == 200:
    #     data = response.json()
    #     # print('Weather Data:', data)
    #     print(latitude, longitude)
    #     return 'Data logged to console', 200
    # else:
    #     print('Failed to fetch data from Tomorrow.io')
    #     return 'Failed to fetch data from Tomorrow.io', response.status_code
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return jsonify(data), 200
    
    except requests.exceptions.HTTPError as http_err:
        return jsonify({'error': f'HTTP error occurred: {http_err}'}), 500
    except Exception as err:
        return jsonify({'error': f'An error occurred: {err}'}), 500

if __name__ == '__main__':
    app.run(debug=True)