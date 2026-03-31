from cryptography.fernet import Fernet
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization, hashes

# ---------------------------
# INPUT MESSAGE
# ---------------------------
message = b"Hello, this is a secret message!"


# SYMMETRIC ENCRYPTION
print("=== SYMMETRIC ENCRYPTION ===")

# Generate key
sym_key = Fernet.generate_key()
cipher = Fernet(sym_key)

# Encrypt
encrypted_message = cipher.encrypt(message)

# Decrypt
decrypted_message = cipher.decrypt(encrypted_message)

print("Key:", sym_key)
print("Original:", message)
print("Encrypted:", encrypted_message)
print("Decrypted:", decrypted_message)
# ASYMMETRIC ENCRYPTION (RSA)
print("\n=== ASYMMETRIC ENCRYPTION ===")

# Generate keys
private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
public_key = private_key.public_key()

# Encrypt with public key
encrypted_rsa = public_key.encrypt(
    message,
    padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()),
                 algorithm=hashes.SHA256(),
                 label=None)
)

# Decrypt with private key
decrypted_rsa = private_key.decrypt(
    encrypted_rsa,
    padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()),
                 algorithm=hashes.SHA256(),
                 label=None)
)

# Serialize keys for display
private_pem = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.NoEncryption()
)

public_pem = public_key.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
)

print("Public Key:\n", public_pem.decode())
print("Private Key:\n", private_pem.decode())
print("Original:", message)
print("Encrypted:", encrypted_rsa)
print("Decrypted:", decrypted_rsa)