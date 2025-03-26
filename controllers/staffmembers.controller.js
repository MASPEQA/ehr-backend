const { triggerSocket } = require("../utils/socket");

const staffMemberStreams = {}

const getStaffMemberStream = (userId) => {
    console.log("GETTING STAFF MEMBER STREAM")
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return;
    }

    // Ensure no double subscriptions
    if (staffMemberStreams[userId]) {
        return;
    }

    try {
        const changeStream = StaffMember.watch([
            { $match: { "documentKey._id": new mongoose.Types.ObjectId(userId) } }
        ]);
        staffMemberStreams[userId] = changeStream;

        changeStream.on("change", (change) => {
            console.log("change", change);
            // Use socketUtils to trigger socket if needed
            triggerSocket(`staffMemberChanged${userId}`, change);
        });
        return `staffMemberChanged${userId}`

    } catch (err) {
        console.error("Error setting up change stream:", err);
    }
};

const subscribeToStaffMember =  (req, res) => {
    const userId = req.params.id;
    let socketIdentifier = getStaffMemberStream(userId);
    res.status(200).send({ message: `Subscribed to changes for userId: ${userId} on ${socketIdentifier}` });
}

module.exports = {
    subscribeToStaffMember,
    getStaffMemberStream
}