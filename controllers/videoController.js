const Video = require('../models/Videodb');

exports.uploadVideo = (req, res) => {
    const { user_id, filename, original_size, compressed_size } = req.body;

    const newVideo = { user_id, filename, original_size, compressed_size };

    Video.create(newVideo, (err, video) => {
        if (err) return res.status(500).json({ msg: 'Error uploading video' });

        res.json(video);
    });
};

exports.getUserVideos = (req, res) => {
    const userId = req.user.id;

    Video.getAllByUserId(userId, (err, videos) => {
        if (err) return res.status(500).json({ msg: 'Error fetching videos' });

        res.json(videos);
    });
};
