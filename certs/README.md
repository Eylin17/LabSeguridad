# ENABLING HTTPS IN LOCALHOST
 We need to enable https in UNA Chat to prevent certificate not trusted issues.

This document will help us achieve https in react project.

## Creating Self-Signed Certificate


**Requires openssl**
https://slproweb.com/products/Win32OpenSSL.html
setx PATH "%PATH%;C:\Program Files\OpenSSL-Win64\bin" /M

Step 1: Navigate to the folder where you will create the certificates.
Step 2: Inside the folder, create a file called `localhost.ext` with the following content.
```
authorityKeyIdentifier = keyid,issuer
basicConstraints = CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
IP.1 = 127.0.0.1
```

You can now run the following openssl scripts to generate self signed certificate.

Step 3: Open Powershell as admin and copy/paste the following code one by one. If asked about details of certificate, you can just hit enter to set the value to default.

Set password to anything you want
```
openssl genrsa -out CA.key
openssl req -x509 -sha256 -new -nodes -days 3650 -key CA.key -out CA.pem
openssl genrsa -out localhost.key
openssl req -new -key localhost.key -out localhost.csr
openssl x509 -req -in localhost.csr -CA CA.pem -CAkey CA.key -CAcreateserial -days 3650 -sha256 -extfile localhost.ext -out localhost.crt
openssl rsa -in localhost.key -out localhost.decrypted.key
```

At this point, if everything is successful the folder should have the following files:
  - CA.key
  - CA.pem
  - CA.srl
  - localhost.crt
  - localhost.csr
  - localhost.decrypted.key
  - localhost.ext
  - localhost.key
 
## Importing CA.pem to Trusted Certificates

 Now we need to import CA.pem to **Trusted Root Certificate Authorities**
 
 Two ways to import:
- Manually: 
    - Open Windows Certificate Manager > Certificates > Trusted Root Certification Authorities > Certificates.
    - Right click and import. Then locate the file mentioned above (CA.pem)
- Powershell:
    - Run PowerShell as admin
    - CD to directory `{PATH TO YOUR LOCAL REPOSITORY}\certs
    - PS {PATH TO YOUR LOCAL REPOSITORY}\certs`
    - Run the following command 
```
 Import-Certificate -CertStoreLocation "Cert:\LocalMachine\Root" -FilePath "CA.pem"
```

