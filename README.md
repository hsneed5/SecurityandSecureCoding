
// ====================
// README
// ====================
/*
 Crypto App (JavaScript)

 Overview
This Node.js application demonstrates three core cryptographic concepts:

1. SHA-256 hashing for strings and files
2. A simple Caesar cipher for encryption/decryption
3. Digital signatures using OpenSSL

 Features
- Generate SHA-256 hashes for user input or files
- Encrypt and decrypt text using a substitution cipher
- Generate RSA key pairs, sign files, and verify signatures

 Requirements
- Node.js installed
- OpenSSL installed and available in PATH

Usage
Run commands via terminal:

Hash a string:
node crypto-app.js hash-string "hello"

Hash a file:
node crypto-app.js hash-file example.txt

Encrypt text:
node crypto-app.js encrypt "hello" 3

Decrypt text:
node crypto-app.js decrypt "khoor" 3

Generate keys:
node crypto-app.js gen-keys

Sign a file:
node crypto-app.js sign example.txt

Verify signature:
node crypto-app.js verify example.txt

- SHA-256 is a secure hashing algorithm used for integrity
- Caesar cipher is for demonstration only (not secure)
- OpenSSL handles secure signing using RSA and SHA-256
*/
