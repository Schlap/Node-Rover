#include "Arduino.h"

int pwm_a = 3; //ch1
int pwm_b = 5; //ch2
int pwn_c = 6; //ch3
int pwn_d = 9; //ch4

int dir_a = 2; //ch1
int dir_b = 4; //ch2
int dir_c = 7; //ch3
int dir_d = 8; //ch4

void setup()
{
  Serial.begin(57600);
  
  delay(1000);
  
  pinMode(pwm_a,OUTPUT); 
  pinMode(pwm_b,OUTPUT); 
  pinMode(pwn_c,OUTPUT); 
  pinMode(pwn_d,OUTPUT);
  
  pinMode(dir_a,OUTPUT); 
  pinMode(dir_b,OUTPUT); 
  pinMode(dir_c,OUTPUT); 
  pinMode(dir_d,OUTPUT);
  
};

void right(){
    Serial.println(HIGH);
    digitalWrite(dir_a,LOW);
    digitalWrite(dir_b,HIGH); 
    digitalWrite(dir_c,HIGH);
    digitalWrite(dir_d,LOW);
    analogWrite(pwm_a,200);
    analogWrite(pwm_b,220);
    analogWrite(pwn_c,200);
    analogWrite(pwn_d,220);
}

void left(){
      Serial.println(HIGH);
      digitalWrite(dir_a,HIGH);
      digitalWrite(dir_b,LOW); 
      digitalWrite(dir_c,LOW);
      digitalWrite(dir_d,HIGH);
      analogWrite(pwm_a,200);
      analogWrite(pwm_b,200);
      analogWrite(pwn_c,200);
      analogWrite(pwn_d,200);
}

void brake(){
  digitalWrite(pwm_a, LOW);
  digitalWrite(pwm_b, LOW);
  digitalWrite(pwn_c, LOW);
  digitalWrite(pwn_d, LOW);
}

 void loop (){
 if(Serial.available()) {
 byte b = Serial.read();
 Serial.println(b);
   if(b == '3') {
     right();
     delay(3600);
     brake();
   }
  }
  
 if(Serial.available()){
 byte b = Serial.read();
 Serial.println(b);
 if(b == 'b'){
   right();
   delay(500);
   left();
   delay(500);
   right();
   delay(500);
   left();
   delay(500);
   right();
   delay(3600);
   brake();
   }
  }
 };