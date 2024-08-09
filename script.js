// Predefined credentials for demonstration
const validUserId = 'admin';
const validPassword = 'admin';

// Function to handle login
function handleLogin() {
    const userId = prompt('Enter your user ID:');
    const password = prompt('Enter your password:');

    if (userId === validUserId && password === validPassword) {
        // Store user information and current time in local storage
        localStorage.setItem('userId', userId);
        localStorage.setItem('loginTime', new Date().getTime());

        // Show the logged-in section
        document.getElementById('logged-in-section').style.display = 'block';

        // Start the timer
        startTimer();
    } else {
        alert('Invalid credentials. Redirecting to Bing...');
        window.location.href = 'https://thedj0.github.io';
    }
}

// Function to start the timer
function startTimer() {
    const loginTime = parseInt(localStorage.getItem('loginTime'), 10);
    const tenSeconds = 1000000; // 10 seconds in milliseconds

    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = Math.max(0, tenSeconds - (now - loginTime));

        if (timeLeft === 0) {
            // Timer expired, force login again
            alert('Session expired. Please log in again.');
            localStorage.removeItem('userId');
            localStorage.removeItem('loginTime');
            window.location.reload();
        } else {
            const secondsLeft = Math.ceil(timeLeft / 1000);
            document.getElementById('timer').textContent = `You will be logged out in : ${secondsLeft} seconds`;

            // Update the timer every second
            setTimeout(updateTimer, 1000);
        }
    }

    updateTimer();
}

// Check if the user is already logged in
window.onload = function() {
    const userId = localStorage.getItem('userId');

    if (userId) {
        // If user is already logged in, show the logged-in section
        document.getElementById('logged-in-section').style.display = 'block';
        document.getElementById('user-info').textContent = `Logged in as: ${userId}`;
        startTimer();
    } else {
        // Prompt for login if not already logged in
        handleLogin();
    }
};






function toggleFields() {
    var templateSelect = document.getElementById("selectedTemplate");
    var reasonForTransferLabel = document.getElementById("reasonForTransferLabel");
    var reasonForTransferInput = document.getElementById("reasonForTransfer");
    var summaryInput = document.getElementById("summaryInput");
    var notesInput = document.getElementById("notesInput");

    // Reset all fields to hidden
    reasonForTransferLabel.style.display = "none";
    reasonForTransferInput.style.display = "none";
    summaryInput.style.display = "none";
    notesInput.style.display = "none";

    // Check the selected template and show relevant fields
    var selectedTemplate = templateSelect.options[templateSelect.selectedIndex].value;
    if (selectedTemplate === "1" || selectedTemplate === "4") {
        // Case Notes - Show only Summary Text and Additional Notes
        summaryInput.style.display = "block";
        notesInput.style.display = "block";
    } else if (selectedTemplate === "2" || selectedTemplate === "3") {
        // Transfer Notes, Handover Notes, LQR Email - Show all fields
        reasonForTransferLabel.style.display = "block";
        reasonForTransferInput.style.display = "block";
        summaryInput.style.display = "block";
        notesInput.style.display = "block";
    } else if (selectedTemplate === "5") {
        // Case Close Notes - Show only Summary Text
        summaryInput.style.display = "block";
        notesInput.style.display = "block";
    }
    // For other templates, no fields need to be shown
}



// Function to handle button click event

// Function to handle button click event
function generateNotes() {
    var selected = document.getElementById('selectedTemplate').value;
    var summary = document.getElementById('summaryInput').value;
    var addNotes = document.getElementById('notesInput').value;
    var reasonForTransfer = document.getElementById('reasonForTransfer').value;
    var contactMethod = document.getElementById('contactMethod').value;

    var final_string = "";

    // Regular expression to match emails or IDs and all
//var regex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/g;

//var regex = /\b([\w.%+-]+@[\w.-]+\.\w{2,4}|[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}|[0-9A-Fa-f]{32}|\b(?:\d{1,3}\.){3}\d{1,3})\b/g;

var regex = /\b([\w.%+-]+@[\w.-]+\.\w{2,4}|[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}|[0-9A-Fa-f]{32}|\b(?:\d{1,3}\.){3}\d{1,3}|[A-Za-z0-9]{32,64})\b/g;


    // Check if any input matches the regex
    if (regex.test(summary) || regex.test(addNotes) || regex.test(reasonForTransfer)) {
        alert("Warning[Cannot Bypass]: The input contains sensitive information. Please remove it before generating notes using Detect Sensitive Information and Remove Button.");
        return; // Stop further execution if sensitive information is found
    }

    var global1 = "need a very good detailed support case notes using below template and using below case summary,";
    var global2 = "need a very good detailed  support case transfer notes using below template and using below case summary, ";
    var global3 = ", need a very good detailed  handover notes using below template and using below case summary, ALSO FILL THE ACTION PLAN BAED ON THE SUMMARY AND ADD NOTES DONT LEAVE IT BLANK";
    var global4 = "need a very good detailed email, Below i provided the template fill the details like Issue: and Resolution: based on the case summary provided";

    var case_notes_temp = "SUMMARY\n\n+++++++++++++++++++++++++++\n\nSCOPE\n\n[Issue Description]\n[Business Impact]\n[Expected Outcome]\n\n+++++++++++++++++++++++++++\n\nCASE SUMMARY\n\n[Environment]\n[Troubleshooting]\n\nAction Plan template:\n\nACTION PLAN\n\nCase Status: <who>\nNext Action: <what/why>\nNext Contact: <when>";

    var transfer_notes_temp = "+++++++++++++++++++++++++++\n\nCase originated from:AAD DEV\nTransfer reason:\nSender's availability:10:30 AM IST TO 7:30 PM IST\nBest contact method:PHONE\n\n+++++++++++++++++++++++++++\n\nCustomer language constraints:NONE\n\n+++++++++++++++++++++++++++\n\nSummary\n\n+++++++++++++++++++++++++++\n\nScope:\n\n[Issue Description]\n[Business Impact]\n[Expected Outcome]\n\n+++++++++++++++++++++++++++\n\nCase Summary:\n\n[Environment]\n[Troubleshooting]\n\n+++++++++++++++++++++++++++\n\nAction Plan:\n\nCase Status: [who]\nNext Action: [what/why]\nNext Contact: [when]";

    var handover_notes_temp = "FILL THE BELOW INFORMATION BASED ON THE SUMMARY , FILL ENGINEERS AVAILABILITY, TIER LEVEL, BEST CONTACT METHOD, AS THE [FILL THIS] . FILL THE ACTION PLAN BASED ON THE SUMMARY OR ADD NOTES- Transfer reason: \nTransferred by Tier Level: \nSource Engineer availability: \nBest contact method: \n\n++++++++++++++++++++++++++\n\nCustomer language constraints: none\n\n+++++++++++++++++++++++++++\n\nScope:\n\n- Business Impact:\n- Incident Statement: \n\n- Environment: ADFS Server\n- Logs/correlation ids:\n\n+++++++++++++++++++++++++++\n\nAction Plan:\n\n- Action on Microsoft:\n- Action on Customer/Partner: none\n- Next Contact: As soon as possible";
    var lqr_email_temp = "Hello customer,\n\nThank you for the confirmation.\n\nIt was my pleasure working with you on this SR and hope the support experience was good. Please spare some time to fill in the survey you will receive upon closure with your feedback.\n\nYour feedback is very important to us, and we use it to continually improve our service.\n\nI am proceeding with the archival of this case now. It simply means we are closing the case, if you want to reopen the case, please reply to this thread.\n\nHere is a summary of the case for your records:\nIssue: \nResolution: \n\nThank you for your time and patience in this matter. If you have any further questions or concerns, please feel free to drop me an email.\n\nIf you have any immediate feedback about my work, please let my manager Bindhiya know at bahamed@microsoft.com.\n\nThank you for choosing Microsoft!";

    var case_close_notes_temp = "Case Close Checklist:\n\n1. SLA Met – Y\n2. FQR - Y\n3. LQR - Y\n4. Customer Commitments / Follow-up’s were kept – Y\n5. Customer did not ask for case updates – N\n6. There was not a need for an ICM on this case - Y\n7. All customer Issues were resolved - Y\na.Did the case owner resolve the issue – Y\nb.Resolution was confirmed by Customer – Y\n8.Was the issue resolved within 14days – Y\n9.Did Customer confirm closure of the case – Y\n10.Did CSS validate the correctness of the Support Topic Path - Y\n\nIssue: \n\nCause: \n\nResolution: \n";

    if (selected === "1") {
        var temp = case_notes_temp;
        final_string = global1 + addNotes + temp + "\nadditional notes like the action plan, next action etc." + addNotes + "\nSummary of the support case:" + summary;
    } else if (selected === "2") {
        var temp = transfer_notes_temp;
        final_string = global2 + temp.replace("Transfer reason:", "Transfer reason: " + reasonForTransfer) + "\nadditional notes like the action plan, next action etc." + addNotes + "\nSummary of the support case:" + summary;
    } else if (selected === "3") {
        var temp = handover_notes_temp;
        final_string = global3 + temp.replace("Transfer reason:", "Transfer reason: " + reasonForTransfer) + "\nadditional notes like the action plan, next action etc." + addNotes + "\nSummary of the support case:" + summary;
    } else if (selected === "4") {
        if (contactMethod === "1") {
            final_string = global4 + lqr_email_temp.replace("do not use the customer in the email use you", summary + "\nadditional notes like the action plan, next action etc." + addNotes) + "case summry:" + summary + "additional notes: " + addNotes;
        } else {
            final_string = "Invalid contact method";
        }
    } else if (selected === "5") {
        var temp = case_close_notes_temp;
        final_string = "create a notes based on the summary provided and fill the checklist- Case Close Checklist:\n\n" + temp + "\n\n" + "\nSummary of the support case:" + summary + "\n" + addNotes;
    } else {
        final_string = "Invalid selection";
    }

    // Output the generated notes
    document.getElementById("output").innerText = final_string;

    // Show the copy and redirect buttons
    document.getElementById("copyButton").style.display = "inline-block";
    document.getElementById("redirectButton").style.display = "inline-block";
}


// Copy to clipboard functionality
document.getElementById("copyButton").addEventListener("click", function () {
    var textToCopy = document.getElementById("output").innerText;
    navigator.clipboard.writeText(textToCopy)
        .then(function () {
            console.log('Text copied to clipboard');
            alert('Text copied to clipboard');
        })
        .catch(function (err) {
            console.error('Unable to copy text to clipboard', err);
            alert('Unable to copy text to clipboard');
        });
});

// Redirect to OpenAI Chat
document.getElementById("redirectButton").addEventListener("click", function () {
    var encodedText = encodeURIComponent(document.getElementById("output").innerText);
    window.open("https://chat.openai.com/?q=" + encodedText, "_blank");
});

// Get the popup and close button
var popup = document.getElementById("popup");
var closeButton = document.getElementById("closePopup");

// Get the button that opens the popup
var openButton = document.getElementById("openPopup");

// Function to open the popup
function openPopup() {
    popup.style.display = "block";
}

// Function to close the popup
function closePopup() {
    popup.style.display = "none";
}

// Open the popup after 3 seconds
setTimeout(openPopup, 3000);

// When the user clicks on the close button, close the popup
closeButton.onclick = function() {
    closePopup();
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
    if (event.target == popup) {
        closePopup();
    }
}

 // JavaScript function to toggle between light and dark mode
 function toggleMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
}

// Check for saved mode preference
if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("modeToggle").checked = true;
}

// script.js

function startTutorial() {
    // Step 1: Show arrow on select template and prompt user
    const selectTemplate = document.getElementById("selectedTemplate");
    showArrow(selectTemplate, "Select Template: *", "Need to select the template for the notes");

    // Step 2: Show arrow on summary input and prompt user
    const summaryInput = document.getElementById("summaryInput");
    showArrow(summaryInput, "Summary Text: *", "Please fill in this field from DFm");

    // Step 3: Show arrow on generate button and prompt user
    const generateButton = document.getElementById("generateButton");
    showArrow(generateButton, "Merge the template", "Press this button to merge the template");

    // Step 4: Show arrow on redirect button and prompt user
    const redirectButton = document.getElementById("redirectButton");
    showArrow(redirectButton, "Redirect to ChatGPT", "Click here for getting notes on ChatGPT page");
}



// script.js
// script.js

function startTutorial() {
    // Step 1: Show arrow on select template and prompt user
    const selectTemplate = document.getElementById("selectedTemplate");
    showArrow(selectTemplate, "Select Template: *", "Need to select the template for the notes");

    // Step 2: Show arrow on summary input and prompt user
    const summaryInput = document.getElementById("summaryInput");
    showArrow(summaryInput, "Summary Text: *", "Please fill in this field from DFM");

    // Step 3: Show arrow on generate button and prompt user
    const generateButton = document.getElementById("generateButton");
    showArrow(generateButton, "Merge the template", "Press the 1st  button to merge the template and then click on the Redirect button to get the notes from CHATGPT");

    // Step 4: Show arrow on redirect button and prompt user
    
}

function showArrow(element, labelText, promptText) {
    // Create arrow element
    const arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.innerHTML = "&#x2192;";

    // Create prompt element
    const prompt = document.createElement("div");
    prompt.className = "prompt";
    prompt.innerHTML = promptText;

    // Position arrow and prompt relative to element
    document.body.appendChild(arrow);
    document.body.appendChild(prompt);

    const elementRect = element.getBoundingClientRect();
    const arrowTop = elementRect.top + element.offsetHeight / 2;
    const arrowLeft = elementRect.left - 30;

    arrow.style.top = `${arrowTop}px`;
    arrow.style.left = `${arrowLeft}px`;

    prompt.style.top = `${arrowTop}px`;
    prompt.style.left = `${arrowLeft + 40}px`;

    // Hide arrow and prompt after 5 seconds
    setTimeout(() => {
        arrow.style.display = "none";
        prompt.style.display = "none";
    }, 2000);
}


// Function to detect sensitive information in input boxes
// Function to detect sensitive information in input boxes


// Function to detect sensitive information in input boxes
function detectSensitiveInfo() {
    var summaryInput = document.getElementById('summaryInput');
    var notesInput = document.getElementById('notesInput');
    var reasonForTransferInput = document.getElementById('reasonForTransfer');

    // Regular expression to match emails, IDs, passwords, JWT tokens, and Microsoft tokens
    //var regex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/g;
   // var regex = /\b([\w.%+-]+@[\w.-]+\.\w{2,4}|[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}|[0-9A-Fa-f]{32}|\b(?:\d{1,3}\.){3}\d{1,3})\b/g;
   var regex = /\b([\w.%+-]+@[\w.-]+\.\w{2,4}|[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}|[0-9A-Fa-f]{32}|\b(?:\d{1,3}\.){3}\d{1,3}|[A-Za-z0-9]{32,64})\b/g;

    // Function to find sensitive information in an input box
    function findSensitiveInfo(inputValue) {
        var matches = inputValue.match(regex);
        return matches ? matches : [];
    }

    // Check for sensitive information in each input box
    var summaryMatches = findSensitiveInfo(summaryInput.value);
    var notesMatches = findSensitiveInfo(notesInput.value);
    var reasonForTransferMatches = findSensitiveInfo(reasonForTransferInput.value);

    var sensitiveInfo = [];

    // Collect sensitive information found
    if (summaryMatches.length > 0) {
        sensitiveInfo.push({ input: "Summary Text", matches: summaryMatches });
    }
    if (notesMatches.length > 0) {
        sensitiveInfo.push({ input: "Additional Notes", matches: notesMatches });
    }
    if (reasonForTransferMatches.length > 0) {
        sensitiveInfo.push({ input: "Reason for Transfer", matches: reasonForTransferMatches });
    }

    // Display sensitive information if found
    if (sensitiveInfo.length > 0) {
        var infoString = "Sensitive Information Found:\n";
        sensitiveInfo.forEach(info => {
            infoString += info.input + ":\n";
            info.matches.forEach(match => {
                infoString += "- " + match + "\n";
            });
        });

        // Ask the user if they want to remove sensitive information
        var confirmRemove = confirm(infoString + "\nDo you want to remove the sensitive information?");
        if (confirmRemove) {
            // Remove sensitive information from input fields
            sensitiveInfo.forEach(info => {
                var inputElement;
                if (info.input === "Summary Text") {
                    inputElement = summaryInput;
                } else if (info.input === "Additional Notes") {
                    inputElement = notesInput;
                } else if (info.input === "Reason for Transfer") {
                    inputElement = reasonForTransferInput;
                }
                info.matches.forEach(match => {
                    inputElement.value = inputElement.value.replace(match, "");
                });
            });
            alert("Sensitive information removed successfully.");
        }
    } else {
        alert("No sensitive information found. CURRENT CHECKS: EMAIL, GUIDS, PASSWORDS, TOKENS, CC INFORMATION, SSO");
    }
}

// Function to handle generate button click
function handleGenerateButtonClick() {
    var clickCount = parseInt(localStorage.getItem('generateButtonClickCount')) || 0;
    var lastClickTimestamp = localStorage.getItem('lastGenerateButtonClickTimestamp') || 0;
    var currentTimestamp = new Date().getTime();

    // Check if more than 2 clicks occurred within 5 minutes
    if (clickCount >= 2 && (currentTimestamp - lastClickTimestamp) <= 5 * 60 * 1000) {
        // Generate random 4-digit number as CAPTCHA
        var captcha = Math.floor(1000 + Math.random() * 9000);

        // Prompt for CAPTCHA
        var confirmCaptcha = prompt("Please enter the CAPTCHA: " + captcha);
        if (confirmCaptcha === captcha.toString()) {
            // Reset click count
            localStorage.setItem('generateButtonClickCount', 0);
            // Proceed with generating the template
            generateNotes();
        } else {
            // Display message for incorrect CAPTCHA
            alert("Incorrect CAPTCHA. Please try again.");
        }
    } else {
        // Increment click count and update last click timestamp
        localStorage.setItem('generateButtonClickCount', clickCount + 1);
        localStorage.setItem('lastGenerateButtonClickTimestamp', currentTimestamp);

        // Proceed with generating the template
        generateNotes();
    }
}
