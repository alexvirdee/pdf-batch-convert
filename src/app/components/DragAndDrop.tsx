'use client'
import { useState } from "react"
import { useSearchParams } from 'next/navigation'
import Dropzone from "react-dropzone"
import axios from 'axios';
import ConvertBtn from './ConvertBtn'

export default function DragAndDrop() {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [conversionCompleted, setConversionCompleted] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const searchParams = useSearchParams();


    const handleDrop = (acceptedFiles: any[]) => {
        // Filter out non-PDF files
        const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');

        if (pdfFiles.length === 0) {
            console.log('no pdf files were selected');
            return
        }

        // Process the selected PDF files
        console.log('Selected PDF files', pdfFiles);
        // Call function to handle the selected files
        setUploadedFiles(acceptedFiles);
        // pass to back end python program for processing 
    }

    const handleConvert = async () => {
        setIsConverting(true);
        setConversionCompleted(false);

        try {
            // Create a new FormData object to hold the uploaded files
            const formData = new FormData();
            uploadedFiles.forEach((file) => {
                formData.append('files', file);
            });

            // Make a POST request to the API route
            const response = await fetch('http://127.0.0.1:5000/convert', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Conversion failed');
            }

            setConversionCompleted(true);
        } catch (error) {
            console.error('Error occurred during the conversion:', error);
        } finally {
            setIsConverting(false);
        }
    };

    const handleDownload = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:5000/download', {
                responseType: 'blob'
            });

            if (response.status === 200) {
                // Create a URL object from the response data
                const url = URL.createObjectURL(new Blob([response.data]));

                console.log('url', url)

                // Create a temporary anchor element and set its attributes
                const link = document.createElement('a');
                link.href = url;
                link.download = 'converted_to_png.zip';

                // Programmatically click the anchor element to initiate the download
                link.click();

                // Clean up the URL object
                URL.revokeObjectURL(url);
            } else {
                console.error("Failed to download. Status:", response.status)
            }


        } catch (error) {
            console.error('Error occurred during download:', error);
        }
    };

    return (
        <>
            <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section className="dropZone">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>
            {uploadedFiles.length > 0 && (
                <div>
                    <p>Uploaded files</p>
                    <ul>
                        {uploadedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                        <ConvertBtn handleConvert={handleConvert} />
                    </ul>
                    {isConverting && <p>Working on it...</p>}
                    {conversionCompleted && (
                        <button className="btn" onClick={handleDownload} >Download PNG Images</button>
                    )}
                </div>
            )}
        </>
    )
}