/*
 Doug Whitton Sept 2021
  This code takes Input from the potentiometer 
  The raw sensor values are mapped to a range from 0 - 100
  The numbers are displayed in th Serial Monitor
  The numbers are also Output in the OLED screen on the SensorKit

*/
#include "Arduino_SensorKit.h"

int potentiometer = A0; //Assign to pin A0
const int button = 4;
int buttonState = 0; 

 
void setup()
{
  
    Serial.begin(9600); //Begin serial communication
    pinMode(potentiometer, INPUT); //Sets the pinmode to input
pinMode(button, INPUT);
    Oled.begin();
    Oled.setFlipMode(true);
}
 
void loop()
{   
 
  buttonState = digitalRead(button);
    int sensor_value = analogRead(potentiometer); //Read the value from the potentiometer connected to the A0 pin
     /*//Map the value from 0, 1023 to 0, 100*/
    
    /* code that was changed by me*/
   
  if (buttonState == HIGH)
  {

    int value = map(sensor_value, 0, 1024, 0, 100);
    Serial.print("Potentiometer value: ");
    Serial.println(value); //Print the value in the serial monitor
    Oled.setFont(u8x8_font_chroma48medium8_r); 
    
//     clear the text from when button is not pressed
     Oled.setCursor(0, 2);
       Oled.print("                      ");
              Oled.setCursor(0, 4);
       Oled.print("                      ");

//       set cursor to line 3 to show weight
    Oled.setCursor(0, 3);
    Oled.print("Weight:");
    Oled.print(value);
    Oled.print("g ");


        
  }
   else
  {
   
    Oled.setFont(u8x8_font_chroma48medium8_r); 
       Oled.setCursor(0, 3);
       Oled.print("           ");
    Oled.setCursor(0, 2);
//    Oled.print("    ");
    Oled.print("Press button to");
    
   Oled.setCursor(0, 4);
   Oled.print("see Weight");
        
  }
}
  

    /* end of code that was changed by me*/
    
    


 
/*


/*
End of Doug's code

*/
