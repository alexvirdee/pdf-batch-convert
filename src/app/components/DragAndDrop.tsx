'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Dropzone from "react-dropzone"
import axios from 'axios';
import ConvertBtn from './ConvertBtn'

export default function DragAndDrop() {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [conversionCompleted, setConversionCompleted] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const router = useRouter();

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
                        <button className="btn">Download PNG Images</button>
                    )}
                </div>
            )}
        </>
    )
}