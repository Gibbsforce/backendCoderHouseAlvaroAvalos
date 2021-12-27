const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

process.on("message", (qty) => {
    const nums = [];
    for (let i = 0; i < qty; i++) {
        const random = getRandom(1, 1000);
        nums.push(random);
    }
    const obj = {}
    nums.map(num => obj[num] = ++obj[num] || 1);
    process.send(obj);
    process.exit();
});

process.send("ready");