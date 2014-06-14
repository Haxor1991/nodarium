#PC > Arduino Commnads


When talking to the arduino, we transmit one line at a time, starting with the letter "C" and the command number. each command have different parematers, and return data in different format. This document is set to define and document the communication protocol used for the nodarium project.

Commands (C##)

##00 -- Heartbit
*Perameters:*
None.

*Returns:*
Command Number, yupyup text.
```
R00|yupyup
```

##01 -- Get Temperature
*Perameters:*
Sensor type:
- 00: DHT
- 01: 1Wire - Tanks
- 02: 1Wire - Mixing Stations

Sensor Number: 00-99

Sample Command:
```
C01|01|00 // get the temperature from sensor 0 in the 1Wire Tanks array.
```

*Returns:*
Command Number, probe number, temperature in celcius.
```
R01|00|25.6
```

##02 - Get Humidity
*Perameters:*
Sensor type:
- 00: DHT

Sensor Number: 00-99

Sample Command:
```
C02|00|00 // get the first defined DHT sensor from the DHT sensor array.
```

*Returns:*
Command Number, probe number, temperature in celcius.
```
R02|00|25.6
```

###03 - Get Water Level
*Perameters:*
Humidity sensor number as defined in humidity sensors array in the arduino sketch.

Sample Command:
```
C03|00
```

*Returns:*
Command Number, probe number, relative humidity.
```
R03|00|t|57.43
```


###04 - Turn on light (singular)
*Perameters:*
PWM Switch number as defined in PWM chip array
PWM PIN (00-16)
Value (0000-4095)


Sample Command:
```
C04|00|00|0000
```

*Returns:*
kjkkjk
```
R04|00|00|0000
```



#Arduino Communication Protocol

- a new request is being queued up in the arduino command array
- each array is an object with the command
- when firing the sendArduinoCommand function, the command will be added to the que.
- when the data is coming back from the arduino, we check for the validity of the response, if it's acceptable, remove it from que, and process next item, other wise re-process the same item.
- need to ensure we only send a command when the old one was completed.
