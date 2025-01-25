# SnapStyle - Project Overview

## Project Goals

SnapStyle is a Raycast extension designed to streamline the process of beautifying screenshots. The extension aims to provide a quick, efficient way to enhance screenshots with professional-looking backgrounds and customization options.

### Phase 1 - Core Features
- Automatic triggering when screenshots are taken (Command+Shift+4)
- Integration with macOS screenshot functionality
- Basic UI for background color selection
- 5 preset solid background colors
- Basic positioning controls
- Simple padding/margin adjustments

### Phase 2 - Enhanced Features (Future)
- Background image support
- Advanced customization options:
  - Screenshot size adjustment
  - Custom border controls
  - Horizontal/vertical padding controls
  - Background image positioning
  - Background opacity controls
- Preset styles and templates
- Custom color picker
- Save user preferences

## Technical Requirements

### Core Technologies
- Raycast Extensions API
- React
- TypeScript
- Image processing library (Sharp/Jimp)

### Key Integration Points
1. macOS Screenshot Detection
   - Monitor system screenshot directory
   - Capture screenshot events

2. Image Processing
   - Background addition
   - Size adjustments
   - Padding/margin calculations

3. User Interface
   - Color selection interface
   - Size adjustment controls
   - Position adjustment controls
   - Preview functionality

## User Experience Flow

1. User takes screenshot (Command+Shift+4)
2. Extension automatically opens
3. User is presented with:
   - Preview of screenshot
   - Background color options
   - Position adjustment controls
   - Padding/margin controls
4. User adjusts settings as needed
5. User saves enhanced screenshot
6. Enhanced image is saved to designated location

## Performance Considerations

- Quick loading time (under 500ms)
- Efficient image processing
- Minimal memory usage
- Smooth preview updates

## Security Considerations

- Secure handling of user screenshots
- Proper permissions management
- Safe file system operations

This document will be updated as the project evolves and new features are implemented. 