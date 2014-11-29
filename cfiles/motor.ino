#include "Arduino.h"
#include <WiFlyHQ.h>

WiFly wifly;

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
  Serial.begin(9600);
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
  Serial.println(wifly.getIP(buf, sizeof(buf)));  
  
}

void loop()
{ 
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
  }

}