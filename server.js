const express = require('express');
const { exec } = require('child_process');
const readline = require('readline');

const app = express();
const PORT = 4000;

app.use(express.json()); // For parsing application/json

// Vibration patterns
const vibrationPatterns = {
    1: "1000", // Long Short Short Short
    2: "1100", // Long Long Short Short
    3: "1010", // Long Short Long Short
    4: "1110", // Long Long Long Short
    5: "1001", // Long Short Short Long
    6: "1101"  // Long Long Short Long
};

// Helper function to build the vibration command
function buildVibrationCommand(pattern) {
    let command = '';
    for (let i = 0; i < pattern.length; i++) {
        const pulse = pattern[i];
        if (pulse === '1') {
            command += `adb shell cmd vibrator vibrate 1500`; // Short pulse
            // Add break (sleep 2 seconds) if not the last pulse
            if (i < pattern.length - 1) {
                command += ' && sleep 2 && ';
            }
        } else if (pulse === '0') {
            command += `adb shell cmd vibrator vibrate 500`; // Long pulse
            // Add break (sleep 1 seconds) if not the last pulse
            if (i < pattern.length - 1) {
                command += ' && sleep 1 && ';
            }
        }

        
    }
    return command;
}

// Function to prompt for the pattern each time
function promptUserForPattern(callback) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Choose a vibration pattern (1-👍: 1000, 2-❤️: 1100, 3-😊: 1010, 4-😆: 1110, 5-😢: 1001, 6-😡: 1101): ', (answer) => {
        rl.close();
        const pattern = vibrationPatterns[answer];
        if (!pattern) {
            console.log('Invalid choice. Exiting...');
            process.exit(1);
        } else {
            callback(pattern);
        }
    });
}

// Endpoint to handle vibration requests
app.post('/vibrate', (req, res) => {
    // Prompt the user for the pattern
    promptUserForPattern((pattern) => {
        const command = buildVibrationCommand(pattern);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return res.status(500).send('Error occurred while trying to vibrate.');
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return res.status(500).send('Error occurred while trying to vibrate.');
            }
            console.log(`stdout: ${stdout}`);
            res.send(`Vibrating with pattern ${pattern}`);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
