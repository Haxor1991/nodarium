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

##01 -- Read Temperature Prob
*Perameters:*
Prob number as defined in probes array in the arduino sketch

Sample Command:
```
C01|00
```

*Returns:*
Command Number, probe number, temperature in celcius.
```
R01|00|25.6
```

##02 - Read Temperature from humidity sensor
*Perameters:*
Humidity sensor number as defined in humidity sensors array in the arduino sketch.

Sample Command:
```
C02|00
```

*Returns:*
Command Number, probe number, temperature in celcius.
```
R02|00|25.6
```

###03 - Read Humidity from humidity sensor
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
Command Number, probe number, relative humidity.
```
R04|00|00|0000
```
