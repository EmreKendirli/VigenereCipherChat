

String.prototype.encrypt = function(key) {
    let result = '';
    for (let i = 0, j = 0; i < this.length; i++) {
        let char = this[i];
        if (/[a-zA-Z]/.test(char)) {
            let base = char.charCodeAt(0) < 97 ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            let keyChar = key[j % key.length];
            let keyOffset = keyChar.charCodeAt(0) < 97 ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            let encryptedChar = String.fromCharCode((char.charCodeAt(0) - base + keyChar.charCodeAt(0) - keyOffset) % 26 + base);
            result += encryptedChar;
            j++;
        } else {
            result += char;
        }
    }
    return result;
};

String.prototype.encryptMessage = function(key) {
    // Burada decrypt fonksiyonunu çağırabilirsiniz
    return this.encrypt(key);
};