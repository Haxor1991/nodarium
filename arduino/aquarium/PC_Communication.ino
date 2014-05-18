String commandString = "";

void setupCommunication() {
  // Begin serial communication on Serial3 to bluetooth.
  Serial3.begin(57600);
  serial3InputString.reserve(200);
}

void processPcComm(){
  if(serial3StringComplete) {
  
  // check what type of command arrived from bluetooth
  if(serial3InputString.startsWith("C")) {
    commandString = serial3InputString.substring(1,3);  
    Serial3.print("{\"command\": \"");
    Serial3.print(serial3InputString);
    Serial3.print("\"");
    Serial3.print(",\"commandlength\": \"");
    Serial3.print(serial3InputString.length());
    Serial3.print("\"");
    if(commandString=="00") {  
      
    } else if(commandString=="04") {
     updateLightInstructions(); 
    }
      
      
      
    Serial3.println("}");
  }
  
  // reset variables
   serial3InputString = "";
   serial3StringComplete = false;
  }
}


void updateLightInstructions() {
  
  // C04|00|00|0000
  
  // first string after command is the pwm channel.
  int pwmChip = serial3InputString.substring(4,6).toInt();
  int pwmChannel = serial3InputString.substring(7,9).toInt();
  int intensity = serial3InputString.substring(10,14).toInt();
  
  Serial3.print(",\"pwmchip\": \"");
        Serial3.print(serial3InputString.substring(4,6));
        Serial3.print("\"");
        Serial3.print(",\"pwmchannel\": \"");
        Serial3.print(serial3InputString.substring(7,9));
        Serial3.print("\"");
        Serial3.print(",\"intensity\": \"");
        Serial3.print(serial3InputString.substring(10,14));
        Serial3.print("\"");
        
        if(serial3InputString.length()==14) {
        pwmChannels[pwmChip].setPWM(pwmChannel, 0, intensity );
        Serial.println("turning lights.....");
    delay(10);
        }
}


/*
  SerialEvent occurs whenever a new data comes in the
 hardware serial RX.  This routine is run between each
 time loop() runs, so using delay inside loop can delay
 response.  Multiple bytes of data may be available.
 */
void serialEvent3() {            
  while (Serial3.available()) {
    // get the new byte:
    char inChar = (char)Serial3.read(); 
    // add it to the inputString:
    
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == '\n') {
      serial3StringComplete = true;
      return;
    } 
    
    serial3InputString += inChar;
  }
}
