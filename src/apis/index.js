import axios from "axios";

export async function fetchBreeds() {
  let result = await new Promise(resolve => {
    axios({
      method: 'get',
      url: 'https://dog.ceo/api/breeds/list/all',
    })
      .then((response) => resolve(response?.data.message))
      .catch((error) => { throw error });
  }) 
  return result;
}

export async function fetchSubBreeds(breed) {
  let result = await new Promise(resolve => {
    axios({
      method: 'get',
      url: 'https://dog.ceo/api/breed/' + breed + '/list',
    })
      .then((response) => resolve(response?.data.message))
      .catch((error) => { throw error });
  }) 
  console.log("result", result);
  return result;
}

export async function fetchSubbreedImages(breed, subBreed=null) {
  let result = await new Promise(resolve => {
    let url = 'https://dog.ceo/api/breed/' + breed +'/images';
    if(subBreed != null){
      url = 'https://dog.ceo/api/breed/' + breed +'/'+ subBreed +'/images';
    }
    axios({
      method: 'get',
      url: url
    })
      .then((response) => resolve(response?.data.message))
      .catch((error) => { throw error });
  }) 
  console.log("result", result);
  return result;
}