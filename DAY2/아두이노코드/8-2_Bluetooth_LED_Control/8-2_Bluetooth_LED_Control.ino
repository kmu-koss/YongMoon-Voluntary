#include <SoftwareSerial.h>
#define BT_RXD 5
#define BT_TXD 4
SoftwareSerial bluetooth(BT_RXD, BT_TXD);
char rec_data;
bool rec_chk = false;

#include <Adafruit_NeoPixel.h>
Adafruit_NeoPixel RGB_LED = Adafruit_NeoPixel(3, 6, NEO_GRB);

void setup() {
  bluetooth.begin(9600);                          // 스마트폰 블루투스 통신속도

  RGB_LED.begin();
  RGB_LED.setBrightness(100);                    //RGB_LED 밝기조절
  RGB_LED.clear();
}
void loop() {
  if (bluetooth.available()) {                   // 블루투스 명령 수신
    rec_data = bluetooth.read();
    rec_chk = true;
  }
  if (rec_data == 'A') { 
    RGB_Color(RGB_LED.Color(255, 0, 0), 10);
  }
  if (rec_data == 'B') { 
    RGB_Color(RGB_LED.Color(0, 0, 0), 10);
  }
}

void RGB_Color(float c, int wait) {                
  for (int i = 0; i < RGB_LED.numPixels(); i++) 
  {  
     RGB_LED.setPixelColor(i, c);
     RGB_LED.show();
     delay(wait);
  }
}
