#include <LiquidCrystal_I2C_Hangul.h>

#include <LiquidCrystal.h>

//****************** bluetooth 선언 ******************//
#include <SoftwareSerial.h>                // 가상 시리얼 통신을 위한 라이브러리 선언
#define BT_RXD 5                           // 아두이노의 5번 핀을 RX핀 지정! 블루투스와 TX핀 연결
#define BT_TXD 4                           // 아두이노의 4번 핀을 TX핀 지정! 블루투스의 RX핀 연결
SoftwareSerial bluetooth(BT_RXD, BT_TXD);  // 블루투스 통신을 위한 설정

//****************** LCD I2C 선언 ******************//
#include <Wire.h>                    // I2C 통신을 위한 라이브러리
      // LCD 1602 I2C용 라이브러리
LiquidCrystal_I2C lcd(0x27, 16, 2);  // 접근 주소 : 0x3F or 0x27

//****************** 스마트 전등 선언 ******************//
#include <Adafruit_NeoPixel.h>                                 // RGB_LED 사용을 위한 라이브러리 선언
Adafruit_NeoPixel RGB_LED = Adafruit_NeoPixel(3, 6, NEO_GRB);  // 3개의 LED와 제어핀을 6번 핀으로 설정.
int R_Val, G_Val, B_Val = 0;                                   // RGB_LED의 led 색상값을 저장하기 위한 변수

//****************** 스마트 에어콘 선언 ******************//
#include "DHT.h"
#define DHTPIN 8           // DHT11 디지털 입력 핀을 8번 핀으로 설정
#define DHTTYPE DHT11      // DHT11 모듈 사용 선언
DHT dht(DHTPIN, DHTTYPE);  // DHT 클래스 함수 선언
int fan = 11;              // Fan을 11번 핀으로 선언

//****************** 스마트 도어 선언 ******************//
#include <Servo.h>   // 서보 라이브러리를 사용하기 위한 Servo.h 선언
Servo servo;         // 서보 클래스 타입인 servo 객체 선언
int servo_pin = 13;  // 서보의 제어핀 13번 핀으로 선언

//****************** 침입자 감지 선언 ******************//
int piezo = 7;               // 피에조 부저를 7번 핀으로 선언
int tones[] = { 261, 523 };  // tones[] 배열에 원하는 음역대의 주파수를 저장.
int IRPin = 10;              // 적외선 센서를 10번 핀으로 선언
int Caps = 0;                // 침입자 감지 함수로 들어가기 위한 제어변수

void setup() {
  Serial.begin(9600);     // PC와 아두이노간 시리얼 통신 속도를 9600bps로 설정
  bluetooth.begin(9600);  // 블루투스와 아두이노간 시리얼 통신 속도를 9600bps로 설정
  lcd.init();            // LCD 모듈 초기화
  lcd.backlight();        // LCD 모듈 백라이트 켜기

  //********* 스마트 전등 Setup() *********//
  RGB_LED.begin();             // LED 모듈 초기화
  RGB_LED.setBrightness(255);  // pixel의 밝기 조절 (0~255)
  RGB_LED.show();              // 모든 픽셀 초기화 'off'

  //********* 스마트 에어콘 Setup() *********//
  dht.begin();           // DHT 모듈 초기화
  pinMode(fan, OUTPUT);  // fan 핀 모드를 출력으로 설정

  //********* 스마트 도어 Setup() *********//
  servo.attach(servo_pin);  // servo 객체를 초기화, 제어핀 선언
  servo.write(180);
  //********* 침입자 감지 Setup() *********//
  pinMode(piezo, OUTPUT);  // 피에조 핀 출력으로 설정
  pinMode(IRPin, INPUT);   // IRPin을 입력으로 설정합니다.
}

void loop() {

  float hum = dht.readHumidity();      // 습도 값을 hum 변수에 저장
  float temp = dht.readTemperature();  // 온도 값을 temp 변수에 저장

  float discomfort_index = ((9 * temp) / 5) - ((0.55 * (1 - (hum / 100))) * (((9 * temp) / 5) - 26)) + 32;  //불쾌지수 계산식

  lcd.setCursor(0, 0);  // 커서 1번 칸, 1번 줄로 이동
  lcd.print("T : ");
  lcd.print((int)temp);
  lcd.print("C, ");  // int 형으로 LCD에 온도 출력
  lcd.print("H : ");
  lcd.print((int)hum);
  lcd.print("%");       // int 형으로 LCD에 습도 출력
  lcd.setCursor(0, 1);  // 커서 1번 칸, 2번 줄로 이동
  lcd.print("Discomfort : ");
  lcd.print((int)discomfort_index);  // int 형으로 LCD에 불쾌지수 출력

  bluetooth.print("\n");
  bluetooth.print("Temperature\n");
  bluetooth.print(String(temp));
  bluetooth.print("\n");
  bluetooth.print("Humidity\n");
  bluetooth.print(String(hum));
  bluetooth.print("\n");
  delay(500);

  if (bluetooth.available()) {     // 만약 블루투스로부터 받은 통신이 있다면,
    char data = bluetooth.read();  // 수신 받은 데이터 저장
    Serial.write(data);            // 수신된 데이터 시리얼 모니터로 출력

    if (data == '1') {  // 침입자 경보시스템 사용 조건
      Smart_Alarm();    // 이후 침입자 경보시스템 함수 호출
    }
    /* 에어컨 제어 */
    if (data == 'p') {  // 문자 "p" 을 검색
      lcd.clear();
      analogWrite(fan, 255);
      lcd.setCursor(0, 0);
      lcd.print("Aircon ON");
      delay(1000);
    }
    if (data == 'q') {  // 문자 "q" 을 검색
      lcd.clear();
      analogWrite(fan, 0);
      lcd.setCursor(0, 0);
      lcd.print("Aircon OFF");
      delay(1000);
    }
    /* 출입문 제어 */
    if (data == 'm') {  // 문자 "m" 을 검색
      lcd.clear();
      servo.write(90);
      lcd.setCursor(0, 0);
      lcd.print("Door OPEN");
      delay(1000);
    }
    if (data == 'n') {  // 문자 "n" 을 검색
      lcd.clear();
      servo.write(180);
      lcd.setCursor(0, 0);
      lcd.print("Door CLOSE");
      delay(1000);
    }
    /* 전등 제어 */
    if (data == 'r') {  // 문자 "r" 을 검색
      for (int i = 0; i < 3; i++) {
        RGB_LED.setPixelColor(i, 255, 0, 0);  // 빨강 출력
        RGB_LED.show();
        delay(10);
      }
    }
    if (data == 'o') {  // 문자 "o" 을 검색
      for (int i = 0; i < 3; i++) {
        RGB_LED.setPixelColor(i, 255, 50, 0);  // 주황 출력
        RGB_LED.show();
        delay(10);
      }
    }
    if (data == 'y') {  // 문자 "y" 을 검색
      for (int i = 0; i < 3; i++) {
        RGB_LED.setPixelColor(i, 255, 255, 0);  // 노랑 출력
        RGB_LED.show();
        delay(10);
      }
    }
    if (data == 'g') {  // 문자 "g" 을 검색
      for (int i = 0; i < 3; i++) {
        RGB_LED.setPixelColor(i, 0, 255, 0);  // 초록 출력
        RGB_LED.show();
        delay(10);
      }
    }
    if (data == 'b') {  // 문자 "b" 을 검색
      for (int i = 0; i < 3; i++) {
        RGB_LED.setPixelColor(i, 0, 0, 255);  // 파랑 출력
        RGB_LED.show();
        delay(10);
      }
    }
    if (data == 'v') {  // 문자 "p" 을 검색
      for (int i = 0; i < 3; i++) {
        RGB_LED.setPixelColor(i, 100, 0, 255);  // 빨강 출력
        RGB_LED.show();
        delay(10);
      }
    }
    if (data == 'w') {  // 문자 "W" 을 검색
      for (int i = 0; i < 3; i++) {
        RGB_LED.setPixelColor(i, 255, 255, 255);  // 빨강 출력
        RGB_LED.show();
        delay(10);
      }
    }
    if (data == 'x') {  // 문자 "W" 을 검색
      for (int i = 0; i < 3; i++) {
        RGB_LED.setPixelColor(i, 0, 0, 0);  // 빨강 출력
        RGB_LED.show();
        delay(10);
      }
    }
  }
}


//****************** 침입자 경보시스템 함수 ******************//
//침입자 경보시스템은 강제로 무한루프에 빠뜨려 다른 기능을 먹통으로 만듬.//
void Smart_Alarm() {
  while (1) {
    if (digitalRead(IRPin) == LOW) {  // 스위치 동작 확인
      Serial.println("경비시스템 침입자 발생!!!");
      lcd.setCursor(0, 0);
      lcd.print("!!!emergency!!! ");
      lcd.setCursor(0, 1);
      lcd.print(" IRsenser on    ");

      for (int i = 0; i < 3; i++) {
        RGB_LED.setPixelColor(i, 0, 0, 0);
        RGB_LED.show();
        delay(10);
      }

      for (int i = 0; i < 2; i++) {  // for 반복문을 활용하여 i값을 0~2까지 반복
        tone(piezo, tones[i]);       // piezo핀에 tones에 저장된 주파수를 출력
        for (int i = 0; i < 3; i++) {
          RGB_LED.setPixelColor(i, 0, 0, 255);
          RGB_LED.show();
          delay(10);
        }
        delay(600);  // 출력마다 0.3초의 딜레이
        for (int i = 0; i < 3; i++) {
          RGB_LED.setPixelColor(i, 255, 0, 0);
          RGB_LED.show();
          delay(10);
        }
        delay(600);  // 출력마다 0.3초의 딜레이
      }
      noTone(piezo);  // piezo핀 초기화.
    }
    if (bluetooth.available()) {      // 만약 블루투스로부터 받은 통신이 있다면,
      if (bluetooth.read() == '0') {  // 문자 "CapsOFF"를 검색
        for (int i = 0; i < 3; i++) {
          RGB_LED.setPixelColor(i, 0, 0, 0);
          RGB_LED.show();
          delay(10);
        }
        Caps = 0;
        break;  // 경보시스템의 무한루프 종료.
      }
    }
    delay(10);
  }
}
