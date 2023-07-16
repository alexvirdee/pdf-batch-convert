'use client'
import Dropzone from "react-dropzone"

export default function DragAndDrop() {
    const onDrop = (acceptedFiles) => {
        // Filter out non-PDF files
        const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');

        if (pdfFiles.length === 0) {
            console.log('no pdf files were selected');
            return
        }

        // Process the selected PDF files
        console.log('Selected PDF files', pdfFiles);
        // Call function to handle the selected files
        // pass to back end python program for processing 

    }


    return (
        <>
            <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section className="dropZone">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>
        </>
    )
}