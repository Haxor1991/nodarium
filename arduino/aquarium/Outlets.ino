void setupRelayOutlets(){
  outlets.begin();      // use default address 0

  // set all pins for output. there are 16 pins on each device.
  
  for(int i = 0; i<16;i++) {
    outlets.pinMode(i, OUTPUT);
    outletOff(i);
    delay(100);
  }
  
}

void outletOn(int channel){
  outlets.digitalWrite(channel, LOW);
}


void outletOff(int channel){
    outlets.digitalWrite(channel, HIGH);
}



