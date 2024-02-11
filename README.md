
# RxVision

**RxVision** is here to mitigate drug underuse and overuse

Improper drug usage is a major healthcare concerns in today's times. Patients, especially of the diseases where they can't take care of their own medications, are at high risk of additional complications or even deaths in cases of under or overuse.  RxVision is backed by paired recognition of the drug and its receiver to assist in validation of the correct drug-patient pairs while keeping a track of their individual dosage timings. 



## Run Locally

Clone the project

```bash
  git clone ####
```

Go to the project directory

```bash
  cd 
```

Install dependencies

```bash
  npm install 
```

Start the server

```bash
  npm run start
```


## Deployment

To deploy this project run

```bash
  npm run deploy
```


## Documentation

[Documentation](https://linktodocumentation)

- Pill Image Dataset trained on GoogLeNet: For the developement of deep learning model for the project, we worked on [Pharmaceutical Drug Recognition](https://www.kaggle.com/datasets/gauravduttakiit/pharmaceutical-drug-recognition?select=train) dataset. The dataset features 10 different classes of Pharmaceutical Drugs. The dataset contains about 9500+ labelled images including the validation images. The classes are - Alaxan,Bactidol, Bioflu, Biogesic, DayZinc, Decolgen, Fish Oil, Kremil S, Medicol, Neozep.
- Face Recognition trained on FaceNet.


## Features


- Register User
User takes a face snapshot which gets stored as an embedding in database. Next, user takes picture of their prescribed medicine one by one along with their dosage frequency, from which the identifier and frequency is registered in the patient's record in database.

- Take Pill
User takes a face snapshot and an embedding is created, which is compared against the entire embedding database of users to retrieve the record of the user in front of the camera. Next, the user shows the medicine in the camera and takes it. The pill detector updates the count of doses of that pill taken by the patient.





## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```


## Authors

- [@Utkarsh Prakash Srivastava](https://www.github.com/utkarsh231)
- [@Raghav Rawat](https://github.com/rawatraghav)
- [@Aneesh Seth](https://github.com/aneeshseth)
- [@Akshat Namdeo](https://github.com/itsak610)



