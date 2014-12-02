#include <Servo.h>

Servo arm;
Servo claw;

// arm starting position at 90 degrees
int aPos = 90;
// claw starting position at 90 degrees
int cPos = 90;

void setup() {
  Serial.begin(9600);
  delay(1000);
 
  claw.attach(9);
  arm.attach(10);
}

void loop() {
 
  if(Serial.available()) {
    byte b = Serial.read();
    Serial.println(b);
    if(b == 'o'){
      for(aPos; aPos < 180; aPos++) { 
        arm.write(aPos);               
        delay(15);                       
       }; 
     };
       
    if(b == 'p'){
      Serial.println(aPos);
      for(aPos; aPos > 0; aPos--) { 
        arm.write(aPos);               
        delay(15);                       
       }; 
    };
    
    if(b == '0'){
      Serial.println(cPos);
      for(cPos; cPos < 160; cPos++) { 
        claw.write(cPos);               
        delay(5);                       
       };
    };
    
    if(b == '9'){
      Serial.println(cPos);
      for(cPos; cPos > 0; cPos--) { 
        claw.write(cPos);               
        delay(5);                       
       };
    };
  };
};