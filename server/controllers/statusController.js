const Status = require('../models/statusModel')

exports.getStatus = async (req, res) => {
    const allStatus = await Status.find({});
    if (!allStatus || allStatus.length === 0) throw "No status found";
    res.json({ data: allStatus });
    res.json({
        status: 'ok',
        data: allStatus
    })

    res.json({
        status: 'ok',
        message: "User registered successfully."
    })
}

exports.addStatus = async (req, res) => {
    const { title, seriousness } = req.body;
    if (!title || !seriousness) throw 'All fields not provided.'
    const user = req.payload.id

    const newStatus = new Status({
        title,
        seriousness,
        user
    })
    await newStatus.save()

    res.json({
        status: 'ok',
        message: "Status successfully.",
        data: newStatus
    })
}

exports.deleteStatus = async (req, res) => {
    const { id } = req.params;
    const user = req.payload.id;

    const isStatusExists = await Status.findById(id);
    if (!isStatusExists) throw "No Status found";
    if (isStatusExists.user != user)
        throw "Action Forbidden";

    await isStatusExists.remove();
    res.json({
        message: "Status removed successfully",
        data: isStatusExists,
    });
};