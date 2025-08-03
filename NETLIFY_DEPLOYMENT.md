# 🚀 Netlify Deployment Guide for SkillBridge

## Quick Deploy Steps

### Method 1: GitHub Integration (Recommended - Easiest)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login with your GitHub account
   - Click "New site from Git"
   - Choose "GitHub" and authorize Netlify
   - Select your repository: `SkillBridge--HackForge-Hackthon`
   - Configure build settings:
     - **Base directory**: `project`
     - **Build command**: `npm run build`
     - **Publish directory**: `project/dist`
   - Click "Deploy site"

3. **Custom Domain** (Optional):
   - In Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Enter: `skillbridge-hackforge.netlify.app` or your preferred name

### Method 2: Netlify CLI (Manual)

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your project**:
   ```bash
   cd project
   npm run build
   ```

3. **Deploy to Netlify**:
   ```bash
   # Login to Netlify
   netlify login
   
   # Deploy (first time)
   netlify deploy --dir=dist
   
   # Deploy to production
   netlify deploy --prod --dir=dist
   ```

## Configuration Files Created

✅ **netlify.toml** - Main configuration file
✅ **public/_redirects** - SPA routing support
✅ **package.json** - Updated with deploy script

## Expected Deployment URL

Your site will be available at something like:
`https://skillbridge-hackforge-[random-id].netlify.app`

You can customize this in Netlify dashboard settings.

## Environment Variables (If needed in future)

In Netlify dashboard:
1. Go to "Site settings" > "Environment variables"
2. Add any API keys or configuration variables

## Performance Optimizations Included

- ✅ Automatic minification
- ✅ CSS and JS bundling
- ✅ Cache headers for static assets
- ✅ SPA routing support
- ✅ Security headers

## Troubleshooting

### Build Fails?
- Check that your `package.json` has all required dependencies
- Ensure `npm run build` works locally first
- Check Netlify build logs for specific errors

### 404 Errors on Routes?
- The `_redirects` file should handle this
- Make sure it's in the `public` folder

### Slow Loading?
- Images and assets are automatically optimized by Netlify
- Consider adding a loading spinner for better UX

## Post-Deployment Checklist

- [ ] Test all pages and features
- [ ] Check responsive design on mobile
- [ ] Verify all links work correctly
- [ ] Test the messaging system
- [ ] Ensure AI chat functionality works
- [ ] Update README with live demo URL

## Update Your README

Once deployed, update your README.md with the actual Netlify URL:

```markdown
### Live Demo
🚀 **[SkillBridge Live Demo](https://your-actual-netlify-url.netlify.app)**
```

## Continuous Deployment

With GitHub integration, every push to your main branch will automatically trigger a new deployment! 🎉

## Need Help?

- Netlify Docs: https://docs.netlify.com/
- Vite Deployment Guide: https://vitejs.dev/guide/static-deploy.html#netlify
