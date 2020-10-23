## Steps to create an APK

1. You can generate a private signing key using keytool. On Windows keytool must be run from `C:\Program Files\Java\jdkx.x.x_x\bin.`

    `$ keytool -genkeypair -v -keystore release.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`

2. Place the my-upload-key.keystore file under the `android/app` directory in your project folder.
    Edit the file `android/gradle.properties`, and add the following (replace ***** with the correct keystore password, alias and key password)

    ``` 
    MYAPP_UPLOAD_STORE_FILE=release.keystore
    MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
    MYAPP_UPLOAD_STORE_PASSWORD=*****
    MYAPP_UPLOAD_KEY_PASSWORD=*****
    ```
3. Edit the file android/app/build.gradle in your project folder, and add the signing config

    ```
    ...
    android {
        ...
        defaultConfig { ... }
        signingConfigs {
            release {
                if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                    storeFile file(MYAPP_UPLOAD_STORE_FILE)
                    storePassword MYAPP_UPLOAD_STORE_PASSWORD
                    keyAlias MYAPP_UPLOAD_KEY_ALIAS
                    keyPassword MYAPP_UPLOAD_KEY_PASSWORD
                }
            }
        }
        buildTypes {
            release {
                ...
                signingConfig signingConfigs.release
            }
        }
    }
    ...
    ```
4. Generate the AAB file

    ``` 
    cd android
    ./gradlew bundleRelease
    ```
    The generated AAB can be found under `android/app/build/outputs/bundle/release/app.aab`, and is ready to be uploaded to Google Play.

5. Generating the apk file
   
   You cannot install app bundle [NAME].aab directly to android device because it is publishing format, but there is way to extract the required apk from bundle.
   1. Download bundletool from https://github.com/google/bundletool/releases
   2. Copy files app.aab, release.keystore, bundle-tool.jar in one folder and run this in your terminal
   
        `java -jar bundletool-all-1.2.0.jar build-apks --bundle=app.aab --output=out_bundle_archive_set.apks --ks=release.keystore --ks-pass=pass:123456 --ks-key-alias=my-key-alias --key-pass=pass:123456 --mode=universal`

        The output file will be in apks format. Change the extension to .zip and extract the content of the zip. You will find a apk file inside the folder.
## build android bundle, mainly to clear cache
`react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`


## Resources

- https://xspdf.com/help/53040047.html
- https://stackoverflow.com/questions/54844007/how-to-generate-full-apk-file-including-dynamic-feature-module/54907000#54907000