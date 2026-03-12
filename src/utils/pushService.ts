import webpush from 'web-push';
import dotenv from 'dotenv';

dotenv.config();

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY || '',
  privateKey: process.env.VAPID_PRIVATE_KEY || '',
};

if (vapidKeys.publicKey && vapidKeys.privateKey) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:techforce.vsbec@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
}

export const sendPushNotification = async (subscription: any, title: string, body: string, url: string = '/') => {
  const payload = JSON.stringify({
    title,
    body,
    icon: '/vite.svg', // Update with actual app icon path if available
    data: { url }
  });

  try {
    await webpush.sendNotification(subscription, payload);
    return { success: true };
  } catch (error: any) {
    if (error.statusCode === 404 || error.statusCode === 410) {
      // Subscription has expired or is no longer valid
      return { success: false, expired: true };
    }
    console.error('Push Notification Error:', error);
    return { success: false, error };
  }
};

/**
 * Sends a push notification to all valid subscriptions for a user
 */
export const notifyUserByPush = async (user: any, title: string, body: string, url: string = '/') => {
  if (!user.push_subscriptions || user.push_subscriptions.length === 0) return;

  const results = await Promise.all(
    user.push_subscriptions.map((sub: any) => sendPushNotification(sub, title, body, url))
  );

  // Filter out expired subscriptions (optional: handled in batch or separately)
  return results;
};
