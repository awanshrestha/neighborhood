const Status = require('../models/statusModel')
const User = require('../models/userModel')

exports.getStatus = async (req, res) => {
    const allStatus = await Status.find({

    })
    .sort( { seriousness: -1 } )
    .populate( {path: 'user', select: 'username'} ).exec()
    if (!allStatus || allStatus.length === 0) throw "No status found";

    res.json({
        status: 'ok',
        data: allStatus
    })
}

exports.addStatus = async (req, res) => {
    const { title, seriousness, location } = req.body;
    if (!title || !seriousness || !location) throw 'All fields not provided.'
    const user = req.payload.id

    const newStatus = new Status({
        title,
        seriousness,
        location,
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