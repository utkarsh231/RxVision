from flask import Flask, request, jsonify
import yagmail 
import os
from supabase import create_client, Client
from apscheduler.schedulers.background import BackgroundScheduler
import redis
from flask_cors import CORS, cross_origin
from PIL import Image
from io import BytesIO
import base64 
import json
import numpy as np
import cv2


from tensorflow.keras.models import load_model

# Use the model for inference, evaluation, or further training


from detect import extract_embedding

supabase: Client = create_client("https://znheiegdydjfcpcaqdcv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuaGVpZWdkeWRqZmNwY2FxZGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNTc0ODksImV4cCI6MjAyMjgzMzQ4OX0.BIKL-7rAzjltPi6DdQVMch2AVbbDBTpW5fJIYE6KE1s")


app = Flask(__name__)
CORS(app, support_credentials=True)

sender_email = 'aneeshseth2018@gmail.com'
sender_password = 'Dogllx@2107'
subject = 'You missed the medicine.'
body = 'You missed the medicine '
import datetime
current_date = datetime.datetime.now()
current_day_of_week = current_date.strftime("%A")

redis_client = None

def initRedis():
    global redis_client
    redis_uri = 'rediss://default:AVNS_KOMZiQj61yP1Yb6T-iJ@redis-205ef966-sjsu-f7b6.a.aivencloud.com:11920'
    redis_client = redis.from_url(redis_uri)


def my_job():
    data = supabase.table('meds').select('*').gt('stocktoday', 0).execute()
    for i in data[1]:
        send_email(sender_email, sender_password, i.userid, subject, body + i.med + "!")
    data2 = supabase.table('meds').select('*').execute()
    for j in data2[1]:
        if (current_day_of_week.lower() in j.days):
            data, count = supabase.table('meds').update('stocktoday', 1).eq('id', j.id).execute()


def schedule_job():
    scheduler = BackgroundScheduler()
    scheduler.add_job(my_job, 'cron', hour=0)  
    scheduler.start()

def send_email(sender_email, sender_password, receiver_email, subject, body):
   """
   yag = yagmail.SMTP(sender_email, sender_password)
   yag.send(
        to=receiver_email,
        subject=subject,
        contents=body
    )
    """

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    print(data)
    user_data, count = supabase.table('users').select("*").eq("email", data.get("useremail")).execute()
    if (count[1] == None):
        supabase.table('users').insert({"email": data.get('useremail')}).execute()
    supabase.table('meds').insert({"useremail": data.get('useremail'), "med": data.get("med"), "days": data.get("days"), "codegen": data.get("codegen"), "stocktoday": data.get("stocktoday")}).execute()
    return jsonify({"message": "User added successfully"}), 200
       
@app.route('/get_prescribed', methods=['POST'])
def get_prescribed():
    data = request.json
    response = supabase.table("meds").select("*").execute().eq("useremail", data.get("email"))
    return jsonify({"message": response}), 200

def convert_base64_to_jpeg(base64_string, output_path):
    image_data = base64.b64decode(base64_string.split(",")[1])
    print(image_data)
    with open(output_path, "wb") as f:
        f.write(image_data)
        embedding = extract_embedding('output.jpg')
        key = redis_client.get('face_recognition_data6')  
        parsed_key = json.loads(key)
        values = list(parsed_key.values())
        arr = []
        print(key)
        for i in values:
            i = i.strip('\n')
            numpy_array = np.fromstring(i[1:-1], sep=' ')
            print(numpy_array)
            arr.append(numpy_array)
        dist = np.linalg.norm(embedding - arr, axis = 1)
        min_dist = np.argmin(dist)
        os.remove("output.jpg")
def convert_base64_to_jpeg_register(base64_string, output_path, data):
    image_data = base64.b64decode(base64_string.split(",")[1])
    print(image_data)
    with open(output_path, "wb") as f:
        f.write(image_data)
        embedding = extract_embedding('output.jpg')
        key = redis_client.get('face_recognition_data6')
        if (key == None): key = "{}"
        parsed_key = json.loads(key)
        parsed_key[data.get('emailid')] = np.array2string(embedding)
        redis_client.set('face_recognition_data6', json.dumps(parsed_key))
        print(redis_client.get('face_recognition_data6'))


@app.route('/verify', methods=['POST'])
def verify_image():
        data = request.json
        print(data.get("imageSrc"))
        convert_base64_to_jpeg(data.get("imageSrc"), "output.jpg")
        return jsonify({"message": "User face ID detected sucessfully"}), 200

@app.route('/register_image', methods=['POST'])
def register_image():
    data = request.json
    convert_base64_to_jpeg_register(data.get("imageSrc"), "output.jpg", data)
    return jsonify({"message": "User image registered sucessfully"}), 200


@app.route("/detect_medicine", methods=['GET'])
def med_detect():
    model = load_model('./googlenet/gnet.h5')
    img = cv2.imread("5969.jpg")
    print(img)
    img = cv2.resize(img, (224, 224))
    img = img.astype('float32') / 255.0
    img = np.expand_dims(img, axis=0)
    preds = model.predict(img)
    print(preds)
    class_id = np.argmax(preds[0])
    print(class_id)
    return {"message": 'Medicine detected sucessfully', "code": str(class_id)}, 200

if __name__ == '__main__':
    schedule_job()
    initRedis()
    app.run(debug=True)


