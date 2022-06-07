import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
import math

app = Flask(__name__)
model = pickle.load(open('model2.pkl', 'rb'))
d={1: 'Bipolar II', 2: 'Unipolar depressive', 3: 'Bipolar I'}

@app.route('/')
def home():
    return render_template('new.html')

@app.route('/predict',methods=['POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''
    int_features = [int(x) for x in request.form.values()]
    

    final_features = [np.array(int_features)]
    
    final_features=np.reshape(final_features,(1,-1))
    prediction = model.predict(final_features)

    output = d[int(prediction)]
    

    return render_template('new.html', prediction_text='Form of depression is : {}'.format(output))



if __name__ == "__main__":
    app.run(debug=True)
