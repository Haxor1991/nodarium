# Connecting to bluetooth.

I am using the HC-06 Bluetooth transceiver, this unit enables me to communicate with the Arduino mega wirelessly over Bluetooth.

To connect to the bluetooth device using Ubuntu, you will need to do the following:

- use the ```hcitool scan``` to find the Mac address of the bluetooth device.
- edit the ```/etc/bluetooth/rfcoom.conf``` file, update the device address with the one found using the ```hcitool scan```, uncomment the rfcomm0 settings, so you have something that looks like:
  ```bash
  rfcomm0 {
          bind yes;
          device 00:07:80:44:4F:37;
          channel 1;
          comment "Serial Port";
          }
  ```
- I had to restart my machine, so those settings above would have taken place. 
- Next you would want to pair it up using the bluetooth wizard, if anyone know of a better way place let me know. also I've ran into few issues while trying to pair the device using Ubuntu Server 14.04. It wouldn't let me select a custom pin number. So i did some research and found out you can manually enforce it by running ```
