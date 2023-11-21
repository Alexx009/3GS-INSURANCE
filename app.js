 // Function to fetch PDF files from the server and store them in an array
 async function fetchPDFList() {
    try {
      const response = await fetch('/AB/');
      const data = await response.text();

      // Parse the HTML response to extract PDF file names
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(data, 'text/html');
      const links = htmlDoc.querySelectorAll('a[href$=".pdf"]');

      // Extract file names and create links
      const pdfFiles = Array.from(links).map(link => link.getAttribute('href'));
      createPDFLinks(pdfFiles);
    } catch (error) {
      console.error('Error fetching PDF list:', error);
    }
  }

  // Function to create links for each PDF file
  function createPDFLinks(pdfFiles) {
    const pdfList = document.getElementById('pdfList');

    pdfFiles.forEach(href => {
      const listItem = document.createElement('li');
      const pdfLink = document.createElement('a');

      // Extracting only the file name (excluding extension)
      const fileName = href.split('/').pop().split('.pdf')[0];

      // Ensure that the path starts with /AB/
      const correctedPath = href.startsWith('/AB/') ? href : `/AB/${href}`;

      // Use encodeURIComponent for the entire file path
      pdfLink.href = correctedPath;
      pdfLink.textContent = fileName;
      listItem.appendChild(pdfLink);
      pdfList.appendChild(listItem);
    });
  }

  // Call the function when the page loads
  window.onload = fetchPDFList;