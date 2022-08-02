from flask import Flask, render_template, request
from keras.models import load_model
from keras.preprocessing import image
import pickle
import numpy as np

app = Flask(__name__)


    
  

model=pickle.load(open('ml.pkl','rb'))


model.make_predict_function()

def predict_label(img_path):
    i = image.load_img(img_path, target_size=(200,200))
    i=image.img_to_array(i)
    i=np.expand_dims(i,axis=0)
    p=model.predict(i)
    #return p
    if(p[0][1]>p[0][0]):
        x='Depression is not detected'
    else:
        x='Depression detected'
    return x
    
@app.route("/", methods=['GET', 'POST'])
def main():
	return render_template("class.html")


@app.route("/submit", methods = ['GET', 'POST'])
def get_output():
	if request.method == 'POST':
		img = request.files['my_image']
       
		img_path = "/Users/ishaan/epics/ans/" + img.filename	
		img.save(img_path)

		p = predict_label(img_path)
        

            

	return render_template("class.html",prediction=p)

if __name__ =='__main__':
	#app.debug = True
	#app.run(debug = True)
    app.run(host='127.0.0.1', port=5002, debug= True)

