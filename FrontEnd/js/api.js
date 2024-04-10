// *This asynchronous function fetchEndPoint retrieves data from API

export async function fetchEndPoint(id) {
   let data = window.sessionStorage.getItem(id);

   if (data === null) {
      const response = await fetch(`http://localhost:5678/api/${id}`);

      if (!response.ok) {
         throw new Error("Erreur de chargement des données");
      }

      // If the response is OK, extract JSON data from the response
      // Convert the data to JSON string
      // Store the data in the browser's session storage under the 'id' key
      data = await response.json();
      const valueData = JSON.stringify(data);
      window.sessionStorage.setItem(id, valueData);
   } else {
      // If the data is already present in the session storage, retrieve and parse it as a JSON object
      data = JSON.parse(data);
   }

   return data;
}
