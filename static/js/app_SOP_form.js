
// CORE ////////////////////////////////////////////////////////////////////////////////

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  console.log()
    //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
      document.getElementById("regForm").submit();
      print_values();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

// CALLED FUNCTIONS /////////////////////////////////////////////////////////////////////////////////////
function print_values(){
  // Function exports dictionary of all input values from the form
  // Called within nextPrev(n) function
  
  // Define Inputs
  var inputsInput,inputsText,index;
  inputsInput = document.getElementsByTagName("input");
  inputsText = document.getElementsByTagName("textarea");

  // Define id's
  var key_listing = [
    "Title", "Doc#", "First Name", "Last Name", "Country","State","City","Zip",
    "inputBusiness1","inputScope1","inputMaterial1","inputTooling1","inputEquipment1",
    "inputPurpose1",
    "inputStep1","inputSubStep1_1","inputSubSafety1_1","inputSubStep1_2","inputSubSafety1_2","inputSubStep1_3","inputSubSafety1_3","inputSubStep1_4","inputSubSafety1_4","inputSubStep1_5","inputSubSafety1_5","inputSubStep1_6","inputSubSafety1_6","inputSubStep1_7","inputSubSafety1_7","inputSubStep1_8","inputSubSafety1_8","inputSubStep1_9","inputSubSafety1_9","inputSubStep1_10","inputSubSafety1_10",
    "inputStep2","inputSubStep2_1","inputSubSafety2_1","inputSubStep2_2","inputSubSafety2_2","inputSubStep2_3","inputSubSafety2_3","inputSubStep2_4","inputSubSafety2_4","inputSubStep2_5","inputSubSafety2_5","inputSubStep2_6","inputSubSafety2_6","inputSubStep2_7","inputSubSafety2_7","inputSubStep2_8","inputSubSafety2_8","inputSubStep2_9","inputSubSafety2_9","inputSubStep2_10","inputSubSafety2_10",
    "inputStep3","inputSubStep3_1","inputSubSafety3_1","inputSubStep3_2","inputSubSafety3_2","inputSubStep3_3","inputSubSafety3_3","inputSubStep3_4","inputSubSafety3_4","inputSubStep3_5","inputSubSafety3_5","inputSubStep3_6","inputSubSafety3_6","inputSubStep3_7","inputSubSafety3_7","inputSubStep3_8","inputSubSafety3_8","inputSubStep3_9","inputSubSafety3_9","inputSubStep3_10","inputSubSafety3_10",
    "inputStep4","inputSubStep4_1","inputSubSafety4_1","inputSubStep4_2","inputSubSafety4_2","inputSubStep4_3","inputSubSafety4_3","inputSubStep4_4","inputSubSafety4_4","inputSubStep4_5","inputSubSafety4_5","inputSubStep4_6","inputSubSafety4_6","inputSubStep4_7","inputSubSafety4_7","inputSubStep4_8","inputSubSafety4_8","inputSubStep4_9","inputSubSafety4_9","inputSubStep4_10","inputSubSafety4_10",
    "inputStep5","inputSubStep5_1","inputSubSafety5_1","inputSubStep5_2","inputSubSafety5_2","inputSubStep5_3","inputSubSafety5_3","inputSubStep5_4","inputSubSafety5_4","inputSubStep5_5","inputSubSafety5_5","inputSubStep5_6","inputSubSafety5_6","inputSubStep5_7","inputSubSafety5_7","inputSubStep5_8","inputSubSafety5_8","inputSubStep5_9","inputSubSafety5_9","inputSubStep5_10","inputSubSafety5_10",
    "inputStep6","inputSubStep6_1","inputSubSafety6_1","inputSubStep6_2","inputSubSafety6_2","inputSubStep6_3","inputSubSafety6_3","inputSubStep6_4","inputSubSafety6_4","inputSubStep6_5","inputSubSafety6_5","inputSubStep6_6","inputSubSafety6_6","inputSubStep6_7","inputSubSafety6_7","inputSubStep6_8","inputSubSafety6_8","inputSubStep6_9","inputSubSafety6_9","inputSubStep6_10","inputSubSafety6_10",
    "inputStep7","inputSubStep7_1","inputSubSafety7_1","inputSubStep7_2","inputSubSafety7_2","inputSubStep7_3","inputSubSafety7_3","inputSubStep7_4","inputSubSafety7_4","inputSubStep7_5","inputSubSafety7_5","inputSubStep7_6","inputSubSafety7_6","inputSubStep7_7","inputSubSafety7_7","inputSubStep7_8","inputSubSafety7_8","inputSubStep7_9","inputSubSafety7_9","inputSubStep7_10","inputSubSafety7_10",
    "inputStep8","inputSubStep8_1","inputSubSafety8_1","inputSubStep8_2","inputSubSafety8_2","inputSubStep8_3","inputSubSafety8_3","inputSubStep8_4","inputSubSafety8_4","inputSubStep8_5","inputSubSafety8_5","inputSubStep8_6","inputSubSafety8_6","inputSubStep8_7","inputSubSafety8_7","inputSubStep8_8","inputSubSafety8_8","inputSubStep8_9","inputSubSafety8_9","inputSubStep8_10","inputSubSafety8_10",
    "inputStep9","inputSubStep9_1","inputSubSafety9_1","inputSubStep9_2","inputSubSafety9_2","inputSubStep9_3","inputSubSafety9_3","inputSubStep9_4","inputSubSafety9_4","inputSubStep9_5","inputSubSafety9_5","inputSubStep9_6","inputSubSafety9_6","inputSubStep9_7","inputSubSafety9_7","inputSubStep9_8","inputSubSafety9_8","inputSubStep9_9","inputSubSafety9_9","inputSubStep9_10","inputSubSafety9_10",
    "inputStep10","inputSubStep10_1","inputSubSafety10_1","inputSubStep10_2","inputSubSafety10_2","inputSubStep10_3","inputSubSafety10_3","inputSubStep10_4","inputSubSafety10_4","inputSubStep10_5","inputSubSafety10_5","inputSubStep10_6","inputSubSafety10_6","inputSubStep10_7","inputSubSafety10_7","inputSubStep10_8","inputSubSafety10_8","inputSubStep10_9","inputSubSafety10_9","inputSubStep10_10","inputSubSafety10_10",
  ];

  //loop over all inputs
  arrayofVal=[];
  for (index=0; index<inputsInput.length;++index){
    var val_input = inputsInput[index].value;
    arrayofVal.push(val_input)
  }
  for (index=0; index<inputsText.length;++index){
    var val_text = inputsText[index].value;
    arrayofVal.push(val_text)
  }
  //console.log(JSON.stringify(arrayofVal))
  //console.log(key_listing)


  // Consolidate into Dictionary
  // Takes all id's and defines attaches the values within a dictionary
  var dict_objs = {}
  for(var i=0; i<arrayofVal.length; ++i){
      dict_objs[key_listing[i]] = arrayofVal[i]; 
  }
  var dictstring = JSON.stringify(dict_objs);


  //Function to export json data to file
  function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
  exportToJsonFile(dictstring)
}