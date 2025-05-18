const express = require('express');
const File = require('../models/File');
const router = express.Router();

// 測試路由
router.get('/test', (req, res) => {
    res.json({ message: '檔案路由正常運作' });
});

// 獲取所有檔案
router.get('/all', async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: '獲取檔案失敗' });
    }
});

// 新增檔案
router.post('/', async (req, res) => {
    const { name, videoLink, mp3Link, textLink } = req.body;
    try {
        const file = new File({ name, videoLink, mp3Link, textLink });
        await file.save();
        res.status(201).json(file);
    } catch (error) {
        res.status(400).json({ error: '新增檔案失敗' });
    }
});

// 更新檔案
router.put('/:id', async (req, res) => {
    const { name, videoLink, mp3Link, textLink } = req.body;
    try {
        const file = await File.findByIdAndUpdate(
            req.params.id,
            { name, videoLink, mp3Link, textLink },
            { new: true }
        );
        if (!file) return res.status(404).json({ error: '找不到檔案' });
        res.json(file);
    } catch (error) {
        res.status(400).json({ error: '更新檔案失敗' });
    }
});

// 刪除檔案
router.delete('/:id', async (req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);
        if (!file) return res.status(404).json({ error: '找不到檔案' });
        res.json({ message: '檔案已刪除' });
    } catch (error) {
        res.status(400).json({ error: '刪除檔案失敗' });
    }
});

module.exports = router;