// crypto-app.js
// Node.js application demonstrating:
// 1. SHA-256 hashing (string + file)
// 2. Caesar cipher (encrypt/decrypt)
// 3. Digital signature using OpenSSL (sign/verify via child_process)

const crypto = require('crypto');
const fs = require('fs');
const { execSync } = require('child_process');

// 1. SHA-256 HASHING

function hashString(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function hashFile(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

// 2. CAESAR CIPHER

function caesarEncrypt(text, shift) {
  return text.split('').map(char => {
    if (/[a-z]/i.test(char)) {
      const base = char === char.toUpperCase() ? 65 : 97;
      return String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
    }
    return char;
  }).join('');
}

function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, 26 - shift);
}

// 3. DIGITAL SIGNATURE (OpenSSL)

function generateKeys() {
  execSync('openssl genrsa -out private.pem 2048');
  execSync('openssl rsa -in private.pem -pubout -out public.pem');
  console.log('Keys generated: private.pem, public.pem');
}

function signFile(filePath) {
  execSync(`openssl dgst -sha256 -sign private.pem -out signature.bin ${filePath}`);
  console.log('File signed: signature.bin');
}

function verifyFile(filePath) {
  try {
    execSync(`openssl dgst -sha256 -verify public.pem -signature signature.bin ${filePath}`);
    console.log('Signature VALID');
  } catch {
    console.log('Signature INVALID');
  }
}

// SIMPLE CLI USAGE
const [,, command, ...args] = process.argv;

switch (command) {
  case 'hash-string':
    console.log(hashString(args.join(' ')));
    break;

  case 'hash-file':
    console.log(hashFile(args[0]));
    break;

  case 'encrypt':
    console.log(caesarEncrypt(args[0], parseInt(args[1])));
    break;

  case 'decrypt':
    console.log(caesarDecrypt(args[0], parseInt(args[1])));
    break;

  case 'gen-keys':
    generateKeys();
    break;

  case 'sign':
    signFile(args[0]);
    break;

  case 'verify':
    verifyFile(args[0]);
    break;

  default:
    console.log(`Usage:
 node crypto-app.js hash-string "text"
 node crypto-app.js hash-file file.txt
 node crypto-app.js encrypt "text" 3
 node crypto-app.js decrypt "text" 3
 node crypto-app.js gen-keys
 node crypto-app.js sign file.txt
 node crypto-app.js verify file.txt`);
}
