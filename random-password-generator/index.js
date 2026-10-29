const generatePasswordButton = document.getElementById("generate-password");
const passwordLengthRangeInput = document.getElementById("password-length-range-input",);
const passwordLengthOutput = document.getElementById("password-length-output");
const message = document.getElementById("message");
const copyGeneratePasswordButton = document.getElementById(
  "copy-generated-password",
);
const showGeneratedPassword = document.getElementById(
  "show-generated-password",
);
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";

const generatePassword = () => {
    let password = "";
    const random = new Uint32Array(1);
    const limit = Math.floor(2 ** 32 / characters.length) * characters.length;

    for (let i = 0; i < Number(passwordLengthRangeInput.value); i++) {
        do {
            crypto.getRandomValues(random);
        } while (random[0] >= limit);
        password += characters[random[0] % characters.length];

        showGeneratedPassword.textContent = password;
    };  
}
const generatePasswordfromRange = () => {
  passwordLengthOutput.textContent = passwordLengthRangeInput.value;
  generatePassword();
};

const copyGeneratedPassword = () => {
    navigator.clipboard.writeText(showGeneratedPassword.textContent)
    copyGeneratePasswordButton.textContent = "Copied";
    message.textContent = "Password copied to clipboard."
    
    setTimeout(() => {
        copyGeneratePasswordButton.textContent = "Copy";
        message.textContent = "Uses letters, numbers, and symbols.";
    }, 1500)
};

passwordLengthRangeInput.addEventListener(
  "input",
  generatePasswordfromRange
);

generatePasswordButton.addEventListener(
  "click",
  generatePassword
);

copyGeneratePasswordButton.addEventListener(
  "click",
  copyGeneratedPassword
);

generatePassword();
