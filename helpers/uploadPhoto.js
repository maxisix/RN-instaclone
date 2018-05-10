export const uploadPhoto = (localUri, filename) => {
  const formData = new FormData();
  const data = {
    uri: localUri,
    name: `${filename}.jpg`,
    type: "image/jpeg"
  };

  formData.append("data", data);

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }
  };

  return fetch(
    "https://api.graph.cool/file/v1/cjgxjuvie0apn01997paaz2vg",
    options
  )
    .then(response => {
      return response.json();
    })
    .then(image => {
      return image;
    })
    .catch(error => console.error(`Error uploading image`));
};
