const rawmusics = require('../database/model/rawmusic');
const musics = require("../database/model/musics");
const csv = require('csvtojson');

const importMusic = async (req, res) => {
    try {
        console.log("Starting importMusic process...");

        // Clear previous rawmusics data
        await rawmusics.deleteMany({});
        console.log("Previous rawmusics data deleted.");

        let userData = [];
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() );
        const month = currentDate.toLocaleString('en-US', { month: 'long' });
        const year = currentDate.getFullYear();
        const formattedDate = `${month} ${year}`;
        console.log("Formatted date:", formattedDate);

        try {
            const response = await csv({
                delimiter: ',', 
                noheader: false,
                headers: [
                    'Licenser ID',
                    'Licenser',
                    'Licenser Email',
                    'Account',
                    'Avg. Management Fee %',
                    'Est. Total Management Fees',
                    'Avg Sales %',
                    'Est Incoming Sales',
                    'Licenser Management Fees',
                    'Licenser Share of Sales',
                    'Tax Deducted',
                    'Statement Total (inc. adjustments)',
                    'Total Payable (This Period)',
                    'Total Payable (inc Prev)' 
                ]
            }).fromFile(req.file.path);
            console.log("CSV parsed successfully.");

            for (let x = 0; x < response.length; x++) {
                const partnerRevenue = parseFloat(response[x]['Total Payable (This Period)']);
                if (!isNaN(partnerRevenue) && partnerRevenue !== 0) {
                    userData.push({
                        musicId: response[x]['Licenser ID'],
                        date: formattedDate,
                        musicName: response[x]['Licenser'],
                        partnerRevenue: partnerRevenue,
                    });
                }
            }
            console.log("Parsed user data");

            if (userData.length > 0) {
                await rawmusics.insertMany(userData);
                console.log("User data inserted into rawmusics.");
            } else {
                console.log("No valid user data to insert.");
            }

            await autoUpdateMusics(); // Call without req and res
            res.status(200).send({ success: true, msg: 'Music XLXS Extracted Successfully' });

        } catch (error) {
            console.error("Error parsing CSV:", error);
            res.status(400).send({ success: false, msg: "Error parsing CSV" });
        }
    } catch (error) {
        console.error("Error during importMusic process:", error);
        res.status(400).send({ success: false, msg: error.message });
    }
}

const autoUpdateMusics = async () => {
    try {
        console.log("Starting autoUpdateMusics process...");
        const rawMusics = await rawmusics.find();

        for (const rawMusic of rawMusics) {
            const existingMusic = await musics.findOne({
                musicId: rawMusic.musicId,
            });

            if (existingMusic) {
                const dateExists = existingMusic.assets.some(asset => asset.date === rawMusic.date);

                if (!dateExists) {
                    existingMusic.assets.push({
                        date: rawMusic.date,
                        partnerRevenue: rawMusic.partnerRevenue,
                    });
                    await existingMusic.save();
                    console.log(`Music with ID ${rawMusic.musicId} updated successfully.`);
                } else {
                    console.log(`Date ${rawMusic.date} already exists for music ID ${rawMusic.musicId}, skipping update.`);
                }

                // Remove the rawMusic entry as it has been processed successfully
                await rawmusics.deleteOne({ _id: rawMusic._id });
                console.log(`Raw music with ID ${rawMusic._id} deleted successfully.`);
            } else {
                console.log(`No existing music found for music ID ${rawMusic.musicId}, skipping.`);
            }
        }

        console.log("Musics auto-updated successfully.");
    } catch (error) {
        console.error("Error updating musics:", error);
    }
};

module.exports = {
    importMusic
};
