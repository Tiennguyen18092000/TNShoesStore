import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,
  collection,
  query,
  getDocs,
  where,
  addDoc,
  getDoc,
  doc,
  setDoc,
  deleteDoc,} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {Product} from'../models/product.model'


const firebaseConfig = {
  apiKey: "AIzaSyC0zbD1KIPqCQ_LrpcPImRLMi9Pp7iFb24",
  authDomain: "tnshoesstore.firebaseapp.com",
  projectId: "tnshoesstore",
  storageBucket: "tnshoesstore.appspot.com",
  messagingSenderId: "395007508133",
  appId: "1:395007508133:web:6bdd4910ae8474756b974c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)
const storage = getStorage(app)

export{
  auth,
  db,
  storage,
  app,
}

export async function getProducts():Promise<Product[]>{
  const proCall = await getDocs(collection(db, "Products"));
  const Products=[];
  for(const doc of proCall.docs){
    Products.push({
      ...doc.data(),
      id:doc.id,
    })
  }
return Products as unknown as Product[];
}
export async function productById(id:string):Promise<Product|null> {
  // const snap = await getDoc(doc(db, 'products', id))
  const docRef = doc(db, "Products", id);
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data())
    return {id:docSnap.id,...docSnap.data()}  as unknown as Product; 
}
export default getFirestore();