import os
import json

# Specify the directory containing the PDF files
pdf_directory = './INSURANCE/G3'

# Get a list of all PDF files in the directory
pdf_files = [f for f in os.listdir(pdf_directory) if f.endswith('.pdf')]

# Create a dictionary to store the file names
pdf_dict = {'pdf_files': pdf_files}

# Specify the path for the JSON file
json_file_path = 'G3.json'

# Write the dictionary to a JSON file
with open(json_file_path, 'w') as json_file:
    json.dump(pdf_dict, json_file)

print(f'JSON file created at {json_file_path}')
