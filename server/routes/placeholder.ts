import { RequestHandler } from "express";

export const handlePlaceholder: RequestHandler = (req, res) => {
  const { width = '400', height = '400' } = req.params;
  
  // Generate SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <rect x="10%" y="20%" width="80%" height="60%" rx="8" fill="#e2e8f0"/>
      <circle cx="50%" cy="35%" r="8%" fill="#cbd5e1"/>
      <rect x="20%" y="50%" width="60%" height="8%" rx="4" fill="#cbd5e1"/>
      <rect x="25%" y="62%" width="50%" height="6%" rx="3" fill="#e2e8f0"/>
      <rect x="30%" y="72%" width="40%" height="6%" rx="3" fill="#e2e8f0"/>
      <text x="50%" y="90%" text-anchor="middle" fill="#64748b" font-family="Arial, sans-serif" font-size="14px">
        ${width}x${height}
      </text>
    </svg>
  `;
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.send(svg);
};
