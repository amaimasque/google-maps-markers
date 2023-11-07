// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8n0QbPSd-sKzACRt2ngR61LJjdPO2OOo",
  authDomain: "maps-markers-5cd37.firebaseapp.com",
  projectId: "maps-markers-5cd37",
  storageBucket: "maps-markers-5cd37.appspot.com",
  messagingSenderId: "262795482810",
  appId: "1:262795482810:web:60d3858545380b70815483"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const COLLECTION_NAME = "quests"

export const addData = async (lat, long, nQuest) => {
  try {
    const questDoc = doc(firestore, COLLECTION_NAME, "quest1");
    if (nQuest === 1) {
      await setDoc(questDoc, {
        location: {
          lat,
          long,
        },
        timestamp: Date.now()
      }, {
        merge: true
      });
    } else {
      const getPath = () => {
        let questPath = "quest2"
        for (let index = 3; index <= nQuest; index++) {
          questPath += `.quest${index}`
        }
        return questPath;
      }
      await updateDoc(questDoc, {
        [getPath()]: {
          location: {
            lat,
            long,
          },
          timestamp: Date.now()
        }
      });
    
    }
  
    console.log("Quest saved ", nQuest);
  } catch (e) {
    console.error("Error saving quest: ", e);
  }
  
}

export const deleteQuest = async () => await deleteDoc(doc(firestore, COLLECTION_NAME, "quest1"));