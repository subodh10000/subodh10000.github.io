# 📱 iOS Engineer Portfolio

A stunning, interactive personal portfolio website that **looks and feels like a real iOS app**. Built for iOS engineers who want to showcase their work with authentic Apple design.

## ✨ Features

### Pure iOS Experience
- **iPhone Frame**: Authentic iPhone 14 Pro device frame with notch
- **iOS Status Bar**: Live time display with system icons
- **iOS Navigation**: Native-feeling navigation bars and transitions
- **Tab Bar**: iOS-style bottom tab bar navigation
- **Home Indicator**: Authentic swipe indicator
- **iOS Lists**: Settings-style grouped lists and cards
- **App Store Design**: Featured project cards with app-like previews

### Advanced Interactions
- **Swipe Gestures**: Swipe right to go back (just like iOS!)
- **Dark Mode**: Full light and dark theme support with smooth transitions
- **Haptic Feedback**: Visual feedback on all interactions
- **Smooth Animations**: 60fps iOS-style transitions and animations
- **Touch Interactions**: Native-feeling tap and press effects
- **Progress Bars**: Animated skill progress indicators

### Developer Experience
- **Keyboard Shortcuts**: Navigate with keys 1-4, toggle dark mode with 'D'
- **Performance Optimized**: Throttled and debounced event handlers
- **Accessibility**: Screen reader support and semantic HTML
- **Responsive**: Works on all screen sizes
- **Clean Code**: Well-organized, commented, and maintainable

## 🎨 Design Highlights

- **SF Pro Font**: Apple's official system font
- **iOS Color Palette**: Authentic iOS colors (#007AFF blue, system grays)
- **Glassmorphism**: Backdrop blur effects throughout
- **Gradient Icons**: Beautiful app-style gradient backgrounds
- **Card Design**: Elevated cards with subtle shadows
- **Micro-interactions**: Delightful details everywhere

## 🚀 Sections

1. **Home** - Profile card with stats and quick actions
2. **About** - Introduction and expertise in iOS-list format
3. **Skills** - Progress bars and categorized skills
4. **Projects** - App Store-style project showcases with screenshots
5. **Contact** - Interactive contact cards with social links

## ⚡ Quick Start

Simply open `index.html` in a modern browser. No build process required!

```bash
# Clone the repository
git clone [your-repo-url]

# Open in browser
open index.html
```

## 🎯 Customization

### Update Your Information

**Edit `index.html`:**

1. **Profile Section** (lines 54-70):
   - Change name and title
   - Update stats (projects, years, etc.)

2. **About Section** (lines 134-140):
   - Write your personal introduction

3. **Skills Section** (lines 187-265):
   - Add/remove skills
   - Adjust progress bar percentages

4. **Projects Section** (lines 287-355):
   - Replace with your actual iOS projects
   - Update project names, descriptions, and tags

5. **Contact Section** (lines 380-415):
   - Update email to your NJIT email
   - Add your GitHub username
   - Add your LinkedIn profile
   - Update social media handles

### Customize Colors

**Edit `styles.css` (lines 2-32):**

```css
:root {
    --ios-blue: #007AFF;  /* Change primary color */
    --ios-purple: #AF52DE; /* Change accent color */
    /* ... more colors */
}
```

### Add Your Projects

Replace the sample projects with your actual iOS apps:

```html
<div class="app-card">
    <div class="app-icon gradient-1">
        <span>📱</span> <!-- Your app icon/emoji -->
    </div>
    <div class="app-info">
        <h3 class="app-name">Your App Name</h3>
        <p class="app-subtitle">Your tagline</p>
        <div class="app-tags">
            <span class="tag">SwiftUI</span>
            <!-- Add your tech tags -->
        </div>
    </div>
</div>
```

## 🎮 Interactions & Features

### Keyboard Shortcuts
- **1-4**: Navigate between screens
- **D**: Toggle dark mode
- **ESC**: Return to home screen

### Touch Gestures
- **Swipe Right**: Go back to previous screen
- **Triple Tap Avatar**: Easter egg animation
- **Tap Cards**: Interactive press effects

### Dark Mode
Click the sun/moon toggle button in the top-right corner. Theme preference is saved in localStorage.

## 📱 Responsive Design

- **Desktop**: Full iPhone frame with device bezel
- **Mobile**: Fills entire viewport for native app feel
- **Tablet**: Optimized layout

## 🛠️ Technical Stack

- **HTML5**: Semantic, accessible markup
- **CSS3**: Modern features (Grid, Flexbox, CSS Variables, Backdrop Filter)
- **Vanilla JavaScript**: No frameworks - pure performance
- **Progressive Web App Ready**: Service Worker support included

## 🎯 iOS Design Principles

This portfolio follows Apple's Human Interface Guidelines:

- **Clarity**: Clean visual hierarchy
- **Deference**: Content is king
- **Depth**: Layered interface with realistic motion
- **Consistency**: Familiar iOS patterns
- **Direct Manipulation**: Touch-friendly interactions

## 📦 Deployment

### GitHub Pages
```bash
# Simply enable GitHub Pages in repository settings
# Point to main branch
```

### Netlify
```bash
# Drag and drop the folder to Netlify
# Or connect your Git repository
```

### Vercel
```bash
# Import project from GitHub
# Zero configuration needed
```

## 🔧 Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

**Note**: Best experienced in Safari for authentic iOS feel.

## 💡 Tips

1. **Replace placeholder content** with your actual information
2. **Add real project screenshots** in the Projects section
3. **Update the favicon** with your personal brand
4. **Add your profile photo** or use a gradient avatar
5. **Customize gradients** for each project card

## 📝 License

Free to use for your personal portfolio! Attribution appreciated but not required.

## 🙏 Credits

Designed and built with ❤️ following Apple's Human Interface Guidelines.

---

**Made by an iOS Engineer, for iOS Engineers** 📱✨
