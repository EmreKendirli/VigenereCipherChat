



function encryptText(text, key) {
    function between(x, min, max) {
        return x >= min && x <= max;
    }

    let msg = [];
    let output = '';
    for (let char of text) {
        let code = char.charCodeAt(0);
        if (between(code, 65, 90)) {
            msg.push([code - 65, 0]);
        } else if (between(code, 97, 122)) {
            msg.push([code - 97, 1]);
        } else {
            msg.push(char);
        }
    }

    key = key.toLowerCase().split('').map(function(c) {
        return c.charCodeAt(0) - 65;
    });

    for (var i = 0; i < msg.length; i++) {
        if (typeof msg[i] === 'string') {
            output += msg[i];
        } else {
            let value = (msg[i][0] + key[i % key.length]) % 26;
            output += String.fromCharCode(value + 65 + msg[i][1] * 32);
        }
    }

    return output;
}

function decryptText(text, key) {
    function between(x, min, max) {
        return x >= min && x <= max;
    }

    let msg = [];
    let output = '';
    for (let char of this) {
		let code = char.charCodeAt(0)
		if (between(code, 65, 90)) {msg.push([code - 65, 0])}
		else if (between(code, 97, 122)) {msg.push([code - 97, 1])}
		else {msg.push(char)}
	}

    key = key.toLowerCase().split('').map(function(c) {
        return c.charCodeAt(0) - 65;
    });

    for (var i = 0; i < msg.length; i++) {
        if (typeof msg[i] === 'string') {
            output += msg[i];
        } else {
            let value = (key[i % key.length] - msg[i][0] + 26) % 26;
            output += String.fromCharCode(value + 65 + msg[i][1] * 32);
        }
    }

    return output;
}

export { encryptText, decryptText };