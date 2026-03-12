import webpush from 'web-push';
const keys = webpush.generateVAPIDKeys();
import fs from 'fs';
fs.writeFileSync('tmp/keys.json', JSON.stringify(keys, null, 2));
console.log('Keys saved to tmp/keys.json');
