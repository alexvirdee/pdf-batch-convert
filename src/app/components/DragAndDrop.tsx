'use client'
import Dropzone from "react-dropzone"

export default function DragAndDrop() {
    return (
        <>
            <div>Hello from drag and drop!</div>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section>
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