import Shell from 'node-powershell'
async function readCredentials(path) {

    // Invoke a new PowerShell shell
    const ps = new Shell({
        executionPolicy: "bypass",
        noProfile: true
    });

    // Read the XML file containing the credentials specified by the `path` argument
    ps.addCommand(`$Credentials = Import-Clixml -Path ${path}`)

    // Expand the UserName and Password properties
    ps.addCommand('$UserName = $Credentials | Select -ExpandProperty UserName')
    ps.addCommand('$Password = $Credentials | Select -ExpandProperty Password')

    // Deconstruct the SecureString password to plain text
    ps.addCommand('$PlainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($Password))')
    
    // Convert the UserName/Password pair to a JSON object with keys `user` and `pass`
    ps.addCommand('@{user=$($UserName);pass=$($PlainPassword)} | ConvertTo-Json')
    
    try {
        // Run the queued PowerShell commands and store the output
        let credentials = await ps.invoke()

        // Do something with the resulting object
        return JSON.parse(credentials) // { user: $UserName, pass: $PlainPassword }
    } catch (err) {

        // Something went wrong
        return err
    }

}

export { readCredentials }