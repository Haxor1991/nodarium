void setupDebugCommunication(){
  
  // Serial console messages will be outputted 
  // to the arduino main USB Serial
  Serial.begin(9600);
  serialInputString.reserve(200);
  
}

void processSerialComm(){
  if(serialStringComplete) {
  
  // check what type of command arrived from bluetooth
  
  
  // reset variables
   serialInputString = "";
   serialStringComplete = false;
  }
}
