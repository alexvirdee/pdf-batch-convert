export default function handler(req, res) {
    // Handle api logic
    if (req.method === 'POST') {
        // Process the request and call python conversion program
        const command = `python3 main.py --input ${files.map((file) => file.path).join(' ')} --output ${outputFolder}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Error occurred during conversion:', error);
                res.status(500).json({ error: 'Conversion failed' });
                return;
            }

            console.log('Conversion completed');

            // Log the stdout and stderr from the python program
            console.log('Python program stdout:', stdout);
            console.error('Python program stderr:', stderr);

            // return the folder path in the response
            res.status(200).json({ folderPath: outputFolder });
        })
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}