import React, { useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { UserAuth } from '../context/AuthContext'
function JobPage(props) {

    const location = useLocation()
    const { job } = location.state
    const {user} = UserAuth()
  
    
    const createdAt = new Date(job.createdAt.seconds * 1000); 
    const createdAtString = formatDistanceToNow(createdAt, { addSuffix: true, locale: pt });

    const [usuario, setUsuario] = useState(null);

    const [image1Url, setImage1Url] = useState(job.image1 || '');
    const [image2Url, setImage2Url] = useState(job.image2 || '');
    const [image3Url, setImage3Url] = useState(job.image3 || '');
    const [image4Url, setImage4Url] = useState(job.image4 || '');
    const [image5Url, setImage5Url] = useState(job.image5 || '');
    const [image6Url, setImage6Url] = useState(job.image6 || '');

    const handleImageUpload = async (file, setImageUrl, imageName) => {
      const storageRef = ref(storage, `images/${user.uid}/${job.id}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      setImageUrl(downloadUrl);
      const imageDocRef = doc(db, 'jobs', job.id);
      await updateDoc(imageDocRef, { [imageName]: downloadUrl });
    };

    const handleImage1Upload = (event) => {
      const file = event.target.files[0];
      handleImageUpload(file, setImage1Url, "image1");
    };
  
    const handleImage2Upload = (event) => {
      const file = event.target.files[0];
      handleImageUpload(file, setImage2Url, "image2");
    };
  
    const handleImage3Upload = (event) => {
      const file = event.target.files[0];
      handleImageUpload(file, setImage3Url, "image4");
    };
  
    const handleImage4Upload = (event) => {
      const file = event.target.files[0];
      handleImageUpload(file, setImage4Url, "image4");
    };
  
    const handleImage5Upload = (event) => {
      const file = event.target.files[0];
      handleImageUpload(file, setImage5Url, "image5");
    };
  
    const handleImage6Upload = (event) => {
      const file = event.target.files[0];
      handleImageUpload(file, setImage6Url, "image6");
    };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData(job.userId);
      setUsuario(userData);
    };
    fetchUserData();
  }, [job.userId]);

    const getUserData = async (userId) => {
      const userDoc = await getDoc(doc(db, 'users', userId));
      const userData = userDoc.data();
      return userData;
    };

    

  return (
    <div>
      <p>Location: Lisboa</p>
      <p>Trabalho: {job.tradeSelected}</p>
      <p>Postado {createdAtString}</p>
      {usuario && <p>Postado por: {usuario.firstName}</p>}
      <p>0 pré-selecionados de 4 interessados</p>
      <h5>Descrição do trabalho</h5>
      <p>{job.selectedSubCategory}: {job.selectedCategory}</p>
      <h5>Descrição do cliente</h5>
      <p>Descrição</p>
      <div>
        <h2>Image Uploader</h2>
        <div>
          <input type="file" id="image1" onChange={handleImage1Upload} />
          {image1Url && <img style={{width: 50}} src={image1Url} alt="Uploaded" />}
        </div>
        <div>
          <input type="file" id="image2" onChange={handleImage2Upload} />
          {image2Url && <img style={{width: 50}} src={image2Url} alt="Uploaded" />}
        </div>
        <div>
          <input type="file" id="image3" onChange={handleImage3Upload} />
          {image3Url && <img style={{width: 50}} src={image3Url} alt="Uploaded" />}
        </div>
        <div>
          <input type="file" id="image4" onChange={handleImage4Upload} />
          {image4Url && <img style={{width: 50}} src={image4Url} alt="Uploaded" />}
        </div>
        <div>
          <input type="file" id="image5" onChange={handleImage5Upload} />
          {image5Url && <img style={{width: 50}} src={image5Url} alt="Uploaded" />}
        </div>
        <div>

          <input type="file" id="image4" onChange={handleImage6Upload} />
          {image6Url && <img style={{width: 50}} src={image6Url} alt="Uploaded" />}
        </div>
      </div>
      
       
    
    </div>
    
  )
}

export default JobPage