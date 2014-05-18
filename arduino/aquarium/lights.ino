

void setLight(int channel, String pwmChip, int intensity) {
  if(channel < 0 || channel > 15) {
    // if channel selection is out of range return and do nothing.
    return;
  }
  
  if(intensity < 0 || intensity > 4095) {
    // if itensity if out of rang return and do nothing..
    return;
  }
  
  // send data to the right chip based on the selected text.
  if(pwmChip == "pwm1") {
  
    pwmChannels[0].setPWM(channel, 0, intensity );
    
  } else if(pwmChip == "pwm2") {
    
    pwm1.setPWM(channel, 0, intensity );
    
  }
  
}


void lightFanOff(int pin) {
  digitalWrite(pin, HIGH);
}

void lightFanOn(int pin) {
    digitalWrite(pin, LOW);  
}
