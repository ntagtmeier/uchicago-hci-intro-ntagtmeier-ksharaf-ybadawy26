const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 4000;

app.use(express.json()); // For parsing application/json

app.post('/vibrate', (req, res) => {
    exec("adb shell cmd vibrator vibrate 500 && sleep 2.5 && adb shell cmd vibrator vibrate 500", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error occurred while trying to vibrate.');
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send('Error occurred while trying to vibrate.');
        }
        console.log(`stdout: ${stdout}`);
        res.send('Vibrating!');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
