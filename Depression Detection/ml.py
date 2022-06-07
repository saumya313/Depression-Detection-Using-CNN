import tensorflow as tf
import pandas as pd
import numpy as np
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import os
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import RMSprop
train=ImageDataGenerator(rescale=1/255)
train_dataset=train.flow_from_directory("/Users/ishaan/Datasets/OTHER_DATA/depression_NEW/DEP_TRAINING DATASET 2",target_size=(200,200))
Valid=ImageDataGenerator(rescale=1/255)
Valid_dataset=Valid.flow_from_directory("/Users/ishaan/Datasets/OTHER_DATA/depression_NEW/DEP_VALIDATION DATASET",target_size=(200,200))
from tensorflow import keras
from keras import optimizers
from tensorflow.keras import optimizers
import keras
import keras.utils
from keras import utils as np_utils
import tensorflow as tf
from tensorflow.keras import Model
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, Conv2D, AveragePooling2D
model=tf.keras.models.Sequential([tf.keras.layers.Conv2D(32,(3,3),activation='relu',input_shape=(200,200,3)),
                                  tf.keras.layers.MaxPool2D(2,2),

                                  tf.keras.layers.Conv2D(64,(3,3),activation='relu'),
                                  tf.keras.layers.MaxPool2D(2,2),
                                  
                                 # tf.keras.layers.Conv2D(64,(3,3),activation='relu'),
                                 # tf.keras.layers.MaxPool2D(2,2),

                                  #tf.keras.layers.Conv2D(64,(3,3),activation='relu'),
                                  #tf.keras.layers.MaxPool2D(2,2),
                                  

                                  tf.keras.layers.Flatten(),
                                  tf.keras.layers.Dense(128,activation='relu'),
                                  tf.keras.layers.Dense(2,activation='softmax')])

model.compile(tf.keras.optimizers.Adam(0.001)
    ,loss='BinaryCrossentropy',metrics=['Precision','accuracy','Recall'])



model.fit(train_dataset,epochs=30,validation_data=Valid_dataset)

import pickle



pickle.dump(model,open('/Users/ishaan/classifier/ml.pkl','wb'))





model=pickle.load(open('/Users/ishaan/classifier/ml.pkl','rb'))
