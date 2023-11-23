// Array to store all PDF file names
let allPDFFiles = [];

// Function to create links for each PDF file
function createPDFLinks(pdfFiles) {
  const pdfList = document.getElementById('pdfList');
  pdfList.innerHTML = '';

  pdfFiles.forEach(fileName => {
    const listItem = document.createElement('li');
    const pdfLink = document.createElement('a');

    // Adjust the path based on your repository structure
    pdfLink.href = `./INSURANCE/G3/${fileName}`;

    pdfLink.textContent = fileName;
    listItem.appendChild(pdfLink);
    pdfList.appendChild(listItem);
  });
}

// Function to read the JSON file and populate the allPDFFiles array
function fetchPDFList() {
  fetch('G3.json') // replace with the actual path to your JSON file
    .then(response => response.json())
    .then(data => {
      allPDFFiles = data.pdf_files; // assuming the JSON structure has a key 'pdf_files'
      createPDFLinks(allPDFFiles);
    })
    .catch(error => console.error('Error fetching JSON file:', error));
}

// Function to filter PDF list based on user input
function filterPDFList() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const filteredPDFFiles = allPDFFiles.filter(fileName => fileName.toLowerCase().includes(searchInput));
  createPDFLinks(filteredPDFFiles);
}

// Event listener for the search input
document.getElementById('search-input').addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    filterPDFList();
  }
});

// Call the function when the page loads
window.onload = fetchPDFList;
