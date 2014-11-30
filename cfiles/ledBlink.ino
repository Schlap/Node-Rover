static byte pin5 = LOW;

void setup () {
    Serial.begin(9600);
    pinMode(2, OUTPUT);
    pinMode(3, OUTPUT);
    pinMode(4, OUTPUT);
    pinMode(5, INPUT);
}

void loop () {
  if (Serial.available()) {
    byte b = Serial.read();
    if (b >= '0' && b <= '7') {
      if (b & 0x01)
        digitalWrite(2, HIGH);
      else
        digitalWrite(2, LOW);
      if (b & 0x02)
        digitalWrite(3, HIGH);
      else
        digitalWrite(3, LOW);
      if (b & 0x04)
        digitalWrite(4, HIGH);
      else
        digitalWrite(4, LOW);
    }
  }
  
  if (digitalRead(5) != pin5) {
    pin5 = digitalRead(5);
    if (pin5 == HIGH)
      Serial.write("*");
  }
}