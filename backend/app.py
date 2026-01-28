from flask import Flask, request, jsonify
from flask_cors import CORS  # Penting untuk React
import pickle

app = Flask(__name__)
CORS(app) 

# Load model
with open('model_bola.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    # Sesuaikan dengan urutan: Yaş, GLS, AST, DK
    features = [
        float(data['age']),
        float(data['goals']),
        float(data['assists']),
        float(data['minutes'])
    ]
    prediction = model.predict([features])[0]
    return jsonify({'price': round(prediction, 0)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)