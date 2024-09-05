const express = require('express');
const router = express.Router();
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const Video = require('../models/Videodb');
const { auth } = require('../routes/auth');  

router.get('/', (req, res) => {
    const directoryPath = path.join(__dirname, '../uploads');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan videos');
        }

        const videoFiles = files.filter(file => file.endsWith('.mp4') || file.endsWith('.mkv'));

        res.json(videoFiles);
    });
});



router.post('/compress', auth, async (req, res) => {
    const { inputFile, outputFile } = req.body;

    const inputPath = path.join(__dirname, '..', 'uploads', Video1.mp4);
    const outputPath = path.join(__dirname, '..', 'compressed', Video1.mp4);
    ffmpeg(inputPath)
        .output(outputPath)
        .videoCodec('libx264')
        .size('1280x720')  
        .preset('veryslow')  
        .on('end', async function () {
            console.log('Video compression finished');
            const newVideo = {
                user_id: req.user.userId, 
                filename: outputFile,
                original_size: fs.statSync(inputPath).size,
                compressed_size: fs.statSync(outputPath).size,
            };

            try {
                await Video.create(newVideo);
                res.json({ message: 'Video compression successful', outputFile: outputFile });
            } catch (err) {
                console.error('Error saving video data:', err);
                res.status(500).json({ error: 'Failed to save video data' });
            }
        })
        .on('error', function (err) {
            console.error('Error during compression:', err);
            res.status(500).json({ error: 'Video compression failed' });
        })
        .run();
});

module.exports = router;
