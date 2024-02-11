
from keras.models import load_model
from PIL import Image
import matplotlib.pyplot as plt
from mtcnn.mtcnn import MTCNN
from numpy import * 
import numpy as np
import pandas as pd 
from keras_facenet import FaceNet
import matplotlib.pyplot as plt

embedder = FaceNet()

def extract_embedding(filename, required_size=(160, 160)): 
    print(filename)
    image = Image.open(filename)
    image = image.convert('RGB')
    image = image.resize(required_size)
    image = asarray(image)
    detections = embedder.extract(image, threshold=0.95)
    return detections[0]['embedding']




