const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      if (fullPath.endsWith('.astro') || fullPath.endsWith('.tsx')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace icon classes
  const icons = ['Zap', 'MapPin', 'Clock', 'Phone', 'Globe', 'Briefcase', 'Calendar', 'Sparkles', 'Calendar', 'svg', 'lucide'];
  icons.forEach(icon => {
    // regex to match <Icon class="... text-primary ..." />
    let re = new RegExp(`<${icon}[^>]*text-primary[^>]*>`, 'g');
    content = content.replace(re, (match) => match.replace(/text-primary/g, 'text-accent'));
  });

  // Replace text-primary in emoji spans
  content = content.replace(/<span class="text-primary">([^<]+)<\/span>/g, '<span class="text-accent">$1</span>');
  content = content.replace(/<span class="text-lg shrink-0 mt-0.5 text-primary">/g, '<span class="text-lg shrink-0 mt-0.5 text-accent">');

  // Replace decorative background badges
  content = content.replace(/bg-primary\/(\d+)\s+text-primary/g, 'bg-accent/20 text-foreground');
  content = content.replace(/border-primary\/(\d+)/g, 'border-accent/30');

  // Replace text-gradient-primary that aren't buttons
  content = content.replace(/<span class="text-gradient-primary/g, '<span class="text-gradient-accent');
  content = content.replace(/<h2[^>]*text-gradient-primary/g, (m) => m.replace(/text-gradient-primary/g, 'text-gradient-accent'));

  // Smart sidebar stat numbers
  content = content.replace(/text-4xl font-display text-primary/g, 'text-4xl font-display text-foreground');

  // Group hovers that aren't on buttons/links
  content = content.replace(/group-hover:text-primary/g, 'group-hover:text-accent');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
