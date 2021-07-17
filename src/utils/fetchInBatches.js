const fetch = require("node-fetch");

const fetchInBatches = async ({ targetUrls, body, batchSize }) => {
    let targetUrlsBatch = [];

    targetUrls.map((url, index) => {
        if (index % batchSize == 0) {
            targetUrlsBatch.push([url]);
        } else {
            targetUrlsBatch[targetUrlsBatch.length - 1].push(url);
        }
    });

    for (let i = 0; i < targetUrlsBatch.length; i++) {
        await Promise.all(targetUrlsBatch[i].map(async (url) =>
            await fetch(url, {
                method: "POST",
                body
            })
        ));
    }

}

module.exports = fetchInBatches