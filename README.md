# Create desktop applications using PhotonCSS & Electron

All you really need to do is
```bash
# Install node modules
$ npm install

# Update PhotonCSS to the latest version
$ npm update photoncss
```

Add custom themes to `src/index.less` after Photon is imported,

All your pages (views) are in `src/views` Look at the examples to break them down.

### Resolving Static assets:
This is a bit diffrent, you have retrieve them from the static folder,
Example: if you have `src/static/image1.png`, you would resolve that as
```javascript
<img src={app.static("image1.png")} />
```

### Run app in development mode
```bash
$ npm run dev
```

### Compile application & installers
```bash
$ npm run compile
```
Binary builds are in `bin/`. Build current supports Windows 32, 64 bit & Linux 32, 64 bit
