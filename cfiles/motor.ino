#include "Arduino.h"
#include <Servo.h>
#include <WiFlyHQ.h>



WiFly wifly;
byte server[] = { 127, 0, 0, 1};

//const char mySSID[] = "Makers$Academy";
//const char myPassword[] = "makersWelcome";

const char site[] = "192.168.50.34";

//Servos

Servo arm;
Servo claw;
Servo pan;

int aPos = 90;
int cPos = 90;
int pPos = 90;

//Motors

int pwm_a = 3; //ch1
int pwm_b = 5; //ch2
int pwn_c = 6; //ch3
int pwn_d = 9; //ch4

int dir_a = 2; //ch1
int dir_b = 4; //ch2
int dir_c = 7; //ch3
int dir_d = 8; //ch4

#define HIGH 0x1
#define LOW 0x0

char buf[32];

// 2 is right motors 1 is left motors

void setup()
{
  Serial.begin(57600);
  
  delay(1000);

  claw.attach(10);
  arm.attach(11);
  pan.attach(12);
  
  pinMode(pwm_a,OUTPUT); 
  pinMode(pwm_b,OUTPUT); 
  pinMode(pwn_c,OUTPUT); 
  pinMode(pwn_d,OUTPUT);
  
  pinMode(dir_a,OUTPUT); 
  pinMode(dir_b,OUTPUT); 
  pinMode(dir_c,OUTPUT); 
  pinMode(dir_d,OUTPUT);
  
  if (!wifly.begin(&Serial, NULL)) {
     Serial.println("Failed to start wifly");
  }
  
//  if (!wifly.isAssociated()) {
//  /* Setup the WiFly to connect to a wifi network */
//  Serial.println("Joining network");
//  wifly.setSSID(mySSID);
//  wifly.setPassphrase(myPassword);
//  wifly.enableDHCP();
//
//  if (wifly.join()) {
//      Serial.println("Joined wifi network");
//  } else {
//      Serial.println("Failed to join wifi network");
//  }
//    } else {
//        Serial.println("Already joined network");
//    }
   
   Serial.println("WiFly ready");
   Serial.println(wifly.getIP(buf, sizeof(buf)));
   
   if (wifly.isConnected()) {
        Serial.println("Old connection active. Closing");
  wifly.close();
    }
}

uint32_t connectTime = 0;

void loop()
{ 
  int available;
    
  if (wifly.isConnected() == false) {
  Serial.println("Connecting");
  if (wifly.open(site, 1337)) {
      Serial.println("Connected");
      connectTime = millis();
  } else {
      Serial.println("Failed to open");
  }
    } else {
  available = wifly.available();
  if (available < 0) {
      Serial.println("Disconnected");
  }
  
  if (Serial.available()) {
    byte b = Serial.read();    
    Serial.println(b);
      if (b == 'w') {

      digitalWrite(dir_a,HIGH); // turn all motors forward
      digitalWrite(dir_b,HIGH); 
      digitalWrite(dir_c,LOW);
      digitalWrite(dir_d,LOW);

      analogWrite(pwm_a,200); // provide power to all motors
      analogWrite(pwm_b,220);
      analogWrite(pwn_c,200);
      analogWrite(pwn_d,220);
    }

    if (b == 's') { 

      digitalWrite(pwm_a,LOW); // stop motors
      digitalWrite(pwm_b,LOW);
      digitalWrite(pwn_c,LOW);
      digitalWrite(pwn_d,LOW);

    }
    
    if (b == 'd') { 

      digitalWrite(dir_a,LOW); // turn to right
      digitalWrite(dir_b,HIGH); 
      digitalWrite(dir_c,HIGH);
      digitalWrite(dir_d,LOW);
      
      analogWrite(pwm_a,200); // GO!
      analogWrite(pwm_b,200);
      analogWrite(pwn_c,200);
      analogWrite(pwn_d,200);

    }
    
     if (b == 'a') { 

      digitalWrite(dir_a,HIGH); // turn to left
      digitalWrite(dir_b,LOW); 
      digitalWrite(dir_c,LOW);
      digitalWrite(dir_d,HIGH);
      
      analogWrite(pwm_a,200); // Go!
      analogWrite(pwm_b,200);
      analogWrite(pwn_c,200);
      analogWrite(pwn_d,200);

    }
    
     if (b == 'r') {

      digitalWrite(dir_a,LOW); // turn all motors backwards
      digitalWrite(dir_b,LOW); 
      digitalWrite(dir_c,HIGH);
      digitalWrite(dir_d,HIGH);

      analogWrite(pwm_a,200); // provide power to all motors
      analogWrite(pwm_b,200);
      analogWrite(pwn_c,200);
      analogWrite(pwn_d,200);
    }

    if(b == 'o'){
      for(aPos; aPos < 100; aPos++) {
        b = Serial.read();
        if (b == 's' || b == 'l') {
          arm.write(aPos);
          break;
        } 
        arm.write(aPos);               
        delay(15);                       
       }; 
     };
       
    if(b == 'p'){
      Serial.println(aPos);
      for(aPos; aPos > 0; aPos--) {
        b = Serial.read();
        if (b == 's' || b == 'l') {
          arm.write(aPos);
          break;
        }  
        arm.write(aPos);               
        delay(15);                       
       }; 
    };
    
    if(b == '0'){
      Serial.println(cPos);
      for(cPos; cPos < 160; cPos++) {
        b = Serial.read();
        if (b == 's') {
          claw.write(cPos);
          break;
        }  
        claw.write(cPos);               
        delay(5);                       
       };
    };
    
    if(b == '9'){
      Serial.println(cPos); 
      for(cPos; cPos > 0; cPos--) {
        b = Serial.read();
        if (b == 's') {
          claw.write(cPos);
          break;
        } 
        claw.write(cPos);               
        delay(5);                       
       };
    };
    
    if(b == 'n'){
      Serial.println(pPos); 
      for(pPos; pPos < 180; pPos++) {
        b = Serial.read();
        if (b == 's') {
          pan.write(pPos);
          break;
        } 
        pan.write(pPos);               
        delay(5);                       
       };
    };;
    
    if(b == 'm'){
      Serial.println(pPos); 
      for(cPos; cPos > 0; pPos--) {
        b = Serial.read();
        if (b == 's') {
          pan.write(pPos);
          break;
        } 
        pan.write(pPos);               
        delay(5);                       
       };
    };
      
   } 
 }
}
 