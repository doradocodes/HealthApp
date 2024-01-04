# HealthApp

## Steps to submit new build to TestFlight
1. Update the version number in the .plist file
2. Run the following command in the terminal to create a new build:
```
 eas build --platform ios
```
3. Download the new build from the link provided in the terminal
4. Drag the new build into the Transporter app
5. Click on the build and click "Deliver"
6. Go to App Store Connect and go to TestFlight tab
7. Make sure new build is added and status is "Ready to Submit"
8. Under "Internal Testers", the new build should appead under "Builds"
9. All testers will receive an email that a new update is available