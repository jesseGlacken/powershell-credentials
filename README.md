# powershell-credentials

Read stored credentials from a CliXML file, and transform them to a JavaScript object. Requires `node-powershell`.

## Install
```
npm install --save powershell-credentials
```

## Usage

1. Create a set of stored credentials as a CliXML file in PowerShell using the `Get-Credential` and `Export-Clixml` commands.
2. Import the credentials into your Node.js project as a JavaScript object with keys `user` and `pass`.
3. Use those credentials wherever your project requires them.

**PowerShell**
```powershell
$Credentials = Get-Credential
$Credentials | Export-Clixml ./path/to/credentials.xml
```

**index.js**
```javascript
import { readCredentials } from 'powershell-credentials'

(async () => {
    let credentials = await readCredentials('./path/to/credentials.xml')
    console.log(credentials)
})()
```
