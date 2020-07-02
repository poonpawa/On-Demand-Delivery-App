 run `npm audit fix` to fix them, or `npm audit` for details

## Run instructions for Android

​    • Have an Android emulator running (quickest way to get started), or a device connected.
​    • cd "D:\On-Demand-Delivery-App\OnDemandDelivery" && `npx react-native run-android`

## Running two apps on different emulators

Before starting any app, make sure to clean the gradle cache with `./gradlew clean` command

### Buyer App

- Start Pixels Emulator (port  8088) 
- run command `react-native run-android --port 8088 --deviceId emulator-5554`

### Rider App

- Start Nexus Emulator (port  8081) 
- run command `react-native run-android --port 8081 --deviceId emulator-5556`