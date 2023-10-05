function simpleHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    }
    h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return (h ^ (h >>> 16)) >>> 0;
}
