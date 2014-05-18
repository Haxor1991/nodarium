void setupPWMChips() {
 pwm1.begin();
 pwm2.begin(); 
 
 pwm1.setPWMFreq(1600);  // This is the maximum PWM frequency
 pwm2.setPWMFreq(1600);  // This is the maximum PWM frequency
 
 
 // go through all the channels and reset them all to the off state
 for(int i = 0; i<16;i++) {
    outlets.pinMode(i, OUTPUT); 
  }
  
 
     
}


