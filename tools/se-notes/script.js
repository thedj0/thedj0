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
function generateNotes() {
    var selected = document.getElementById('selectedTemplate').value;
    var summary = document.getElementById('summaryInput').value;
    var addNotes = document.getElementById('notesInput').value;
    var reasonForTransfer = document.getElementById('reasonForTransfer').value;
    var contactMethod = document.getElementById('contactMethod').value;

    var final_string = "";

    var global1 = "need a very good detailed support case notes using below template and using below case summary,";
    var global2 = "need a very good detailed  support case transfer notes using below template and using below case summary, ";
    var global3 = ", need a very good detailed  handover notes using below template and using below case summary, ALSO FILL THE ACTION PLAN BAED ON THE SUMMARY AND ADD NOTES DONT LEAVE IT BLANK";
    var global4 = ", Below i provided the template fill the details like Issue: and Resolution: based on the case summary provided";

    var case_notes_temp = "SUMMARY\n\n+++++++++++++++++++++++++++\n\nSCOPE\n\n[Issue Description]\n[Business Impact]\n[Expected Outcome]\n\n+++++++++++++++++++++++++++\n\nCASE SUMMARY\n\n[Environment]\n[Troubleshooting]\n\nAction Plan template:\n\nACTION PLAN\n\nCase Status: <who>\nNext Action: <what/why>\nNext Contact: <when>";

    var transfer_notes_temp = "+++++++++++++++++++++++++++\n\nCase originated from:AAD DEV\nTransfer reason:\nSender's availability:10:30 AM IST TO 7:30 PM IST\nBest contact method:PHONE\n\n+++++++++++++++++++++++++++\n\nCustomer language constraints:NONE\n\n+++++++++++++++++++++++++++\n\nSummary\n\n+++++++++++++++++++++++++++\n\nScope:\n\n[Issue Description]\n[Business Impact]\n[Expected Outcome]\n\n+++++++++++++++++++++++++++\n\nCase Summary:\n\n[Environment]\n[Troubleshooting]\n\n+++++++++++++++++++++++++++\n\nAction Plan:\n\nCase Status: [who]\nNext Action: [what/why]\nNext Contact: [when]";

    var handover_notes_temp = "FILL THE BELOW INFORMATION BASED ON THE SUMMARY , FILL ENGINEERS AVAILABILITY, TIER LEVEL, BEST CONTACT METHOD, AS THE [FILL THIS] . FILL THE ACTION PLAN BASED ON THE SUMMARY OR ADD NOTES- Transfer reason: \nTransferred by Tier Level: \nSource Engineer availability: \nBest contact method: \n\n++++++++++++++++++++++++++\n\nCustomer language constraints: none\n\n+++++++++++++++++++++++++++\n\nScope:\n\n- Business Impact:\n- Incident Statement: \n\n- Environment: ADFS Server\n- Logs/correlation ids:\n\n+++++++++++++++++++++++++++\n\nAction Plan:\n\n- Action on Microsoft:\n- Action on Customer/Partner: none\n- Next Contact: As soon as possible";
    var lqr_email_temp = "Hello customer,\n\nThank you for the confirmation.\n\nIt was my pleasure working with you on this SR and hope the support experience was good. Please spare some time to fill in the survey you will receive upon closure with your feedback.\n\nYour feedback is very important to us, and we use it to continually improve our service.\n\nI am proceeding with the archival of this case now. It simply means we are closing the case, if you want to reopen the case, please reply to this thread.\n\nHere is a summary of the case for your records:\nIssue: \nResolution: \n\nThank you for your time and patience in this matter. If you have any further questions or concerns, please feel free to drop me an email.\n\nIf you have any immediate feedback about my work, please let my manager Bindhiya know at bahamed@microsoft.com.\n\nThank you for choosing Microsoft!";

    var case_close_notes_temp = "Case Close Checklist:\n\n1. SLA Met – Y\n2. FQR - Y\n3. LQR - Y\n4. Customer Commitments / Follow-up’s were kept – Y\n5. Customer did not ask for case updates – N\n6. There was not a need for an ICM on this case - Y\n7. All customer Issues were resolved - Y\na.Did the case owner resolve the issue – Y\nb.Resolution was confirmed by Customer – Y\n8.Was the issue resolved within 14days – Y\n9.Did Customer confirm closure of the case – Y\n10.Did CSS validate the correctness of the Support Topic Path - Y\n\nIssue: \n\nCause: \n\nResolution: \n";

    if (selected === "1") {
        var temp = case_notes_temp;
        final_string = global1 + addNotes + temp + "\nadditional notes like the action plan, next action etc."+ addNotes + "\nSummary of the support case:" + summary;
    } else if (selected === "2") {
        var temp = transfer_notes_temp;
        final_string = global2 + temp.replace("Transfer reason:", "Transfer reason: " + reasonForTransfer) +"\nadditional notes like the action plan, next action etc."+ addNotes + "\nSummary of the support case:"+summary;
    } else if (selected === "3") {
        var temp = handover_notes_temp;
        final_string = global3 + temp.replace("Transfer reason:", "Transfer reason: " + reasonForTransfer) + "\nadditional notes like the action plan, next action etc."+addNotes +"\nSummary of the support case:"+ summary;
    } else if (selected === "4") {
        if (contactMethod === "1") {
            final_string = global4 + lqr_email_temp.replace("do not use the customer in the email use you", summary + "\nadditional notes like the action plan, next action etc."+addNotes) + summary;
        } else {
            final_string = "Invalid contact method";
        }
    } else if (selected === "5") {
        var temp = case_close_notes_temp;
        final_string = "create a notes based on the summary provided and fill the checklist- Case Close Checklist:\n\n" + temp + "\n\n" + "\nSummary of the support case:"+ summary + "\n" + addNotes;
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
