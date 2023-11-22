// Array to store all PDF file names
let allPDFFiles = [];

// Function to fetch PDF files from the server and store them in an array
async function fetchPDFList() {
  try {
    const response = await fetch('/INSURANCE/G2/');
    const data = await response.text();

    // Parse the HTML response to extract PDF file names
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, 'text/html');
    const links = htmlDoc.querySelectorAll('a[href$=".pdf"]');

    // Extract file names and create links
    allPDFFiles = Array.from(links).map(link => {
      // Extracting only the file name (excluding extension and date-time)
      const fileName = link.textContent.split('.pdf')[0].trim();
      return fileName;
    });

    createPDFLinks(allPDFFiles);
  } catch (error) {
    console.error('Error fetching PDF list:', error);
  }
}

// Function to create links for each PDF file
function createPDFLinks(pdfFiles) {
  const pdfList = document.getElementById('pdfList');
  pdfList.innerHTML = '';

  pdfFiles.forEach(fileName => {
    const listItem = document.createElement('li');
    const pdfLink = document.createElement('a');

    // Adjust the path based on your repository structure
    pdfLink.href = `/INSURANCE/G2/${fileName}.pdf`;
    pdfLink.textContent = fileName;
    listItem.appendChild(pdfLink);
    pdfList.appendChild(listItem);
  });
}

// Function to filter PDF list based on user input
function filterPDFList() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const filteredPDFFiles = allPDFFiles.filter(fileName => fileName.toLowerCase().includes(searchInput));
  createPDFLinks(filteredPDFFiles);
}

// Event listener for the search input
document.getElementById('search-input').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    filterPDFList();
  }
});

// Call the function when the page loads
window.onload = fetchPDFList;
