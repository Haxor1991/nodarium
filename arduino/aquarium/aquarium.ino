
#include <Wire.h>
#include <OneWire.h>
#include <DHT.h>
#include <Adafruit_MCP23017.h>
#include <Adafruit_ADS1015.h>
#include <Adafruit_PWMServoDriver.h>


// There are seveal things we need to define...
// PWM Chips:
Adafruit_PWMServoDriver pwm1 = Adafruit_PWMServoDriver(0x41);
Adafruit_PWMServoDriver pwm2 = Adafruit_PWMServoDriver(0x40);

Adafruit_PWMServoDriver pwmChannels[2] = { pwm1, pwm2 };


// IO Extender
Adafruit_MCP23017 outlets;


// Serial Communication strings
String serialInputString = "";         // a string to hold incoming data (Serial)
boolean serialStringComplete = false;  // whether the string is complete

String serial3InputString = "";         // a string to hold incoming data (Serail 3/Bluetooth)
boolean serial3StringComplete = false;  // whether the string is complete







// called this way, it uses the default address 0x40
String status = "dayn";


void setup(){
  setupDebugCommunication();
  setupCommunication();
  setupPWMChips();
  setupRelayOutlets();
  
  // save I2C bitrate
  //uint8_t twbrbackup = TWBR;
  //TWBR = 12; // upgrade to 400KHz!

  
  pinMode(22, OUTPUT);
  pinMode(23, OUTPUT);

  digitalWrite(22, LOW);
  digitalWrite(23, LOW);


outletOn(1);
outletOn(7);


  
  pwm1.setPWM(10, 0, 4095 );  // Viloet // Indigo
//nels[0].setPWM(4, 0, 4095 );

}

void loop(){
  processSerialComm();
  processPcComm();
}
