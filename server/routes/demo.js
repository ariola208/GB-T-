export function handleDemo(req, res) {
  res.json({ 
    message: 'Route de démo',
    timestamp: new Date().toISOString()
  });
}
