void loop()
{
  //turn on the LED if the TCP socket is open
  if (client.connected()) {
    digitalWrite(ledPin, HIGH);
  }
  else {
    digitalWrite(ledPin, LOW);
  }
  
  //check for incoming data over TCP
  if (client.available()) {
    char c = client.read();
  }
}